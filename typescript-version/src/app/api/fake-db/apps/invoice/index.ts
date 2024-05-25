// Type Imports
import type { InvoiceType } from '@/types/apps/invoiceTypes'

const now = new Date()
const currentMonth = now.toLocaleString('default', { month: 'short' })

export const db: InvoiceType[] = [
  {
    id: '4987',
    issuedDate: `13 ${currentMonth} ${now.getFullYear()}`,
    address: '7777 Mendez Plains',
    company: 'Hall-Robbins PLC',
    companyEmail: 'don85@johnson.com',
    country: 'USA',
    contact: '(616) 865-4180',
    name: 'Benedict Tiong',
    service: 'Software Development',
    total: 3428,
    avatar: '',
    avatarColor: 'primary',
    invoiceStatus: 'Paid',
    balance: '$724',
    dueDate: `23 ${currentMonth} ${now.getFullYear()}`
  },
  {
    id: '4988',
    issuedDate: `17 ${currentMonth} ${now.getFullYear()}`,
    address: '04033 Wesley Wall Apt. 961',
    company: 'Mccann LLC and Sons',
    companyEmail: 'brenda49@taylor.info',
    country: 'Haiti',
    contact: '(226) 204-8287',
    name: 'Benson Ho',
    service: 'UI/UX Design & Development',
    total: 5219,
    avatar: '/images/avatars/1.png',
    invoiceStatus: 'Downloaded',
    balance: 0,
    dueDate: `15 ${currentMonth} ${now.getFullYear()}`
  },
  {
    id: '4989',
    issuedDate: `19 ${currentMonth} ${now.getFullYear()}`,
    address: '5345 Robert Squares',
    company: 'Leonard-Garcia and Sons',
    companyEmail: 'smithtiffany@powers.com',
    country: 'Denmark',
    contact: '(955) 676-1076',
    name: 'Tony Herrera',
    service: 'Unlimited Extended License',
    total: 3719,
    avatar: '/images/avatars/2.png',
    invoiceStatus: 'Paid',
    balance: 0,
    dueDate: `03 ${currentMonth} ${now.getFullYear()}`
  },
  {
    id: '4990',
    issuedDate: `06 ${currentMonth} ${now.getFullYear()}`,
    address: '19022 Clark Parks Suite 149',
    company: 'Smith, Miller and Henry LLC',
    companyEmail: 'mejiageorge@lee-perez.com',
    country: 'Cambodia',
    contact: '(832) 323-6914',
    name: 'Kevin Patton',
    service: 'Software Development',
    total: 4749,
    avatar: '/images/avatars/3.png',
    invoiceStatus: 'Sent',
    balance: 0,
    dueDate: `11 ${currentMonth} ${now.getFullYear()}`
  },
  {
    id: '4991',
    issuedDate: `08 ${currentMonth} ${now.getFullYear()}`,
    address: '8534 Saunders Hill Apt. 583',
    company: 'Garcia-Cameron and Sons',
    companyEmail: 'brandon07@pierce.com',
    country: 'Martinique',
    contact: '(970) 982-3353',
    name: 'Mrs. Julie Donovan MD',
    service: 'UI/UX Design & Development',
    total: 4056,
    avatar: '/images/avatars/4.png',
    invoiceStatus: 'Draft',
    balance: '$815',
    dueDate: `30 ${currentMonth} ${now.getFullYear()}`
  },
  {
    id: '4992',
    issuedDate: `26 ${currentMonth} ${now.getFullYear()}`,
    address: '661 Perez Run Apt. 778',
    company: 'Burnett-Young PLC',
    companyEmail: 'guerrerobrandy@beasley-harper.com',
    country: 'Botswana',
    contact: '(511) 938-9617',
    name: 'Amanda Phillips',
    service: 'UI/UX Design & Development',
    total: 2771,
    avatar: '',
    avatarColor: 'secondary',
    invoiceStatus: 'Paid',
    balance: 0,
    dueDate: `24 ${currentMonth} ${now.getFullYear()}`
  },
  {
    id: '4993',
    issuedDate: `17 ${currentMonth} ${now.getFullYear()}`,
    address: '074 Long Union',
    company: 'Wilson-Lee LLC',
    companyEmail: 'williamshenry@moon-smith.com',
    country: 'Montserrat',
    contact: '(504) 859-2893',
    name: 'Christina Collier',
    service: 'UI/UX Design & Development',
    total: 2713,
    avatar: '',
    avatarColor: 'success',
    invoiceStatus: 'Draft',
    balance: '$407',
    dueDate: `22 ${currentMonth} ${now.getFullYear()}`
  },
  {
    id: '4994',
    issuedDate: `11 ${currentMonth} ${now.getFullYear()}`,
    address: '5225 Ford Cape Apt. 840',
    company: 'Schwartz, Henry and Rhodes Group',
    companyEmail: 'margaretharvey@russell-murray.com',
    country: 'Oman',
    contact: '(758) 403-7718',
    name: 'David Flores',
    service: 'Template Customization',
    total: 4309,
    avatar: '/images/avatars/5.png',
    invoiceStatus: 'Paid',
    balance: '-$205',
    dueDate: `10 ${currentMonth} ${now.getFullYear()}`
  }
]