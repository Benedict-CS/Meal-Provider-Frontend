'use client'

// React Imports
import type { ReactNode } from 'react'

// MUI Imports
import { styled } from '@mui/material/styles'

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

  return (
    <ToCartStyled className={className} role='presentation'>
      {children}
    </ToCartStyled>
  )
}

export default ToCart
