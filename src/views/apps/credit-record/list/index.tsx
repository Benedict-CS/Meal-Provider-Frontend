'use client'
// MUI Imports
import Grid from '@mui/material/Grid'
import { useState, useEffect } from 'react'

// Type Imports
import type { InvoiceType } from '@/types/apps/invoiceTypes'

// Component Imports
import InvoiceListTable from './InvoiceListTable'
import InvoiceCard from './InvoiceCard'

const InvoiceList = ({ invoiceData }: { invoiceData: InvoiceType[] }) => {
  const [data, setData] = useState([...invoiceData])
  const [selectedMonth, setSelectedMonth] = useState('')
  useEffect(() => {
    const filteredData = invoiceData?.filter(invoice => {
      if (selectedMonth) {
        const month = new Date(invoice.issuedDate).getMonth() + 1
        return month === parseInt(selectedMonth)
      }
      return true
    })
    setData(filteredData)
  }, [selectedMonth, invoiceData])

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <InvoiceCard invoiceData={data} />
      </Grid>
      <Grid item xs={12}>
        <InvoiceListTable invoiceData={data} selectedMonth={selectedMonth} updateSelectMonth={setSelectedMonth} />
      </Grid>
    </Grid>
  )
}

export default InvoiceList
