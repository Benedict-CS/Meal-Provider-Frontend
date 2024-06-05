import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import Negotiator from 'negotiator'
import { withAuth } from 'next-auth/middleware'
import { match as matchLocale } from '@formatjs/intl-localematcher'
import type { NextRequestWithAuth } from 'next-auth/middleware'
import { i18n } from '@configs/i18n'
import { getLocalizedUrl, isUrlMissingLocale } from '@/utils/i18n'
import { ensurePrefix, withoutSuffix } from '@/utils/string'



var HOME_PAGE_URL = '/en'

const getLocale = (request: NextRequest): string | undefined => {

  const urlLocale = i18n.locales.find(locale => request.nextUrl.pathname.startsWith(`/${locale}`))
  if (urlLocale) return urlLocale
  const negotiatorHeaders: Record<string, string> = {}
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value))
  // @ts-ignore locales are readonly
  const locales: string[] = i18n.locales
  const languages = new Negotiator({ headers: negotiatorHeaders }).languages(locales)
  const locale = matchLocale(languages, locales, i18n.defaultLocale)
  return locale
}

const localizedRedirect = (url: string, locale: string | undefined, request: NextRequestWithAuth) => {
  let _url = url
  const isLocaleMissing = isUrlMissingLocale(_url)
  if (isLocaleMissing) {
    _url = getLocalizedUrl(_url, locale ?? i18n.defaultLocale)
  }

  let _basePath = process.env.BASEPATH ?? ''
  _basePath = _basePath.replace('demo-1', request.headers.get('X-server-header') ?? 'demo-1')
  _url = ensurePrefix(_url, `${_basePath ?? ''}`)
  const redirectUrl = new URL(_url, request.url).toString()

  return NextResponse.redirect(redirectUrl)
}

export default withAuth(
  async function middleware(request: NextRequestWithAuth) {
    const locale = getLocale(request)
    const pathname = request.nextUrl.pathname
    const token = request.nextauth.token?.email
    const isUserLoggedIn = !!token
    const guestRoutes = ['login', 'register', 'forgot-password']
    const sharedRoutes = ['shared-route']
    const privateRoute = ![...guestRoutes, ...sharedRoutes].some(route => pathname.endsWith(route))

    if (token == "admin@gmail.com") {
      HOME_PAGE_URL = "/en/apps/menu-management"
    } else {
      HOME_PAGE_URL = "/en/apps/order-cart"
    }

    if (!isUserLoggedIn && privateRoute) {
      let redirectUrl = '/login'

      if (!(pathname === '/' || pathname === `/${locale}`)) {
        const searchParamsStr = new URLSearchParams({ redirectTo: withoutSuffix(pathname, '/') }).toString()

        redirectUrl += `?${searchParamsStr}`
      }

      return localizedRedirect(redirectUrl, locale, request)
    }

    const isRequestedRouteIsGuestRoute = guestRoutes.some(route => pathname.endsWith(route))

    if (isUserLoggedIn && isRequestedRouteIsGuestRoute)
      return localizedRedirect(HOME_PAGE_URL, locale, request)

    if (pathname === '/' || pathname === `/${locale}`)
      return localizedRedirect(HOME_PAGE_URL, locale, request)

    return isUrlMissingLocale(pathname) ? localizedRedirect(pathname, locale, request) : NextResponse.next()
  },
  {
    callbacks: {
      authorized: () => {
        return true
      }
    }
  }
)

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|.+?/hook-examples|.+?/menu-examples|images|next.svg|vercel.svg).*)'
  ]
}
