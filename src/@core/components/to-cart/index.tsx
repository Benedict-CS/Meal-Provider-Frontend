'use client'

// React Imports
import type { ReactNode } from 'react'

// MUI Imports
import Zoom from '@mui/material/Zoom'
import { styled } from '@mui/material/styles'
import { useRouter } from 'next/navigation';

interface ToCartProps {
  className?: string
  children: ReactNode
}

const ToCartStyled = styled('div')(({ theme }) => ({
  zIndex: 'var(--mui-zIndex-fab)',
  position: 'fixed',
  insetInlineEnd: theme.spacing(10),
  insetBlockEnd: theme.spacing(14)
}))

const ToCart = (props: ToCartProps) => {
  // Props
  const { children, className } = props
  const { push } = useRouter()

  const handleClick = () => {
    push('/apps/order-cart')
  }

  return (
    <ToCartStyled className={className} onClick={handleClick} role='presentation'>
      {children}
    </ToCartStyled>
  )
}

export default ToCart
