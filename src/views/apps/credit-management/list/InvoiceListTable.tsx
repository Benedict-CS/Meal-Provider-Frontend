'use client'
import { useState, useEffect, useMemo } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Checkbox from '@mui/material/Checkbox'
import Chip from '@mui/material/Chip'
import IconButton from '@mui/material/IconButton'
import MenuItem from '@mui/material/MenuItem'
import TablePagination from '@mui/material/TablePagination'
import type { TextFieldProps } from '@mui/material/TextField'
import classnames from 'classnames'
import { rankItem } from '@tanstack/match-sorter-utils'
import { createColumnHelper, flexRender, getCoreRowModel, useReactTable, getFilteredRowModel, getFacetedRowModel, getFacetedUniqueValues, getFacetedMinMaxValues, getPaginationRowModel, getSortedRowModel } from '@tanstack/react-table'
import type { ColumnDef, FilterFn } from '@tanstack/react-table'
import type { RankingInfo } from '@tanstack/match-sorter-utils'
import type { InvoiceType } from '@/types/apps/invoiceTypes'
import type { Locale } from '@configs/i18n'
import CustomAvatar from '@core/components/mui/Avatar'
import TablePaginationComponent from '@components/TablePaginationComponent'
import CustomTextField from '@core/components/mui/TextField'
import { getInitials } from '@/utils/getInitials'
import { getLocalizedUrl } from '@/utils/i18n'
import tableStyles from '@core/styles/table.module.css'

import os from 'os';

function getDockerContainerIP(): string | null {
  const networkInterfaces = os.networkInterfaces();

  // Docker 通常使用 'eth0' 作为默认网络接口，但这可能根据你的 Docker 配置而变化
  const eth0 = networkInterfaces['eth0'];

  if (!eth0) {
    console.log('No eth0 interface found.');
    return null;
  }

  for (const iface of eth0) {
    if (iface.family === 'IPv4' && !iface.internal) {
      return iface.address;
    }
  }

  return null;
}

const containerIP = getDockerContainerIP();
console.log('Docker Container IP:', containerIP);


declare module '@tanstack/table-core' {
  interface FilterFns {
    fuzzy: FilterFn<unknown>
  }
  interface FilterMeta {
    itemRank: RankingInfo
  }
}

type InvoiceTypeWithAction = InvoiceType & {
  action?: string
}



declare module '@tanstack/table-core' {
  interface FilterFns {
    fuzzy: FilterFn<unknown>
  }
  interface FilterMeta {
    itemRank: RankingInfo
  }
}



const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
  const itemRank = rankItem(row.getValue(columnId), value)
  addMeta({ itemRank })
  return itemRank.passed
}

const DebouncedInput = ({
  value: initialValue,
  onChange,
  debounce = 500,
  ...props
}: {
  value: string | number
  onChange: (value: string | number) => void
  debounce?: number
} & Omit<TextFieldProps, 'onChange'>) => {
  const [value, setValue] = useState(initialValue)
  useEffect(() => {
    setValue(initialValue)
  }, [initialValue])
  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value)
    }, debounce)
    return () => clearTimeout(timeout)
  }, [value])
  return <CustomTextField {...props} value={value} onChange={e => setValue(e.target.value)} />
}

// fetch('https://api.ipify.org?format=json')
//   .then(response => response.json())
//   .then(data => console.log('Your public IP address is:', data.ip))
//   .catch(error => console.error('Error fetching IP:', error));



const getAvatar = (params: Pick<InvoiceType, 'avatar' | 'name'>) => {
  const { avatar, name } = params

  if (avatar) {
    return <CustomAvatar src={avatar} skin='light' size={34} />
  } else {
    return (
      <CustomAvatar skin='light' size={34}>
        {getInitials(name as string)}
      </CustomAvatar>
    )
  }
}

const columnHelper = createColumnHelper<InvoiceTypeWithAction>()

type InvoiceListTableProps = {
  invoiceData: InvoiceType[]
  selectedMonth: string
  updateSelectMonth: (value: string) => void
}

const InvoiceListTable = (props: InvoiceListTableProps) => {
  const { invoiceData, selectedMonth, updateSelectMonth } = props
  const [rowSelection, setRowSelection] = useState({})
  const [globalFilter, setGlobalFilter] = useState('')

  const { lang: locale } = useParams()


  const columns = useMemo<ColumnDef<InvoiceTypeWithAction, any>[]>(
    () => [
      {
        id: 'select',
        header: ({ table }) => (
          <Checkbox
            {...{
              checked: table.getIsAllRowsSelected(),
              indeterminate: table.getIsSomeRowsSelected(),
              onChange: table.getToggleAllRowsSelectedHandler()
            }}
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            {...{
              checked: row.getIsSelected(),
              disabled: !row.getCanSelect(),
              indeterminate: row.getIsSomeSelected(),
              onChange: row.getToggleSelectedHandler()
            }}
          />
        )
      },
      columnHelper.accessor('id', {
        header: '# No.',
        cell: ({ row }) => (
          <Typography
            component={Link}
            href={getLocalizedUrl(`apps/invoice/preview/${row.original.id}`, locale as Locale)}
            color='primary'
          >
            {`#${row.original.id}`}

          </Typography>
        )
      }),
      columnHelper.accessor('name', {
        header: 'Client',
        cell: ({ row }) => (
          <div className='flex items-center gap-3'>
            {getAvatar({ avatar: row.original.avatar, name: row.original.name })}
            <div className='flex flex-col'>
              <Typography className='font-medium' color='text.primary'>
                {row.original.name}
              </Typography>
              <Typography variant='body2'>{row.original.companyEmail}</Typography>
            </div>
          </div>
        )
      }),
      columnHelper.accessor('total', {
        header: 'Total',
        cell: ({ row }) => <Typography>
          {`$${row.original.total}`}
        </Typography>
      }),
      columnHelper.accessor('issuedDate', {
        header: 'Issued Date',
        cell: ({ row }) => <Typography>
          {row.original.issuedDate}
        </Typography>
      }),
      columnHelper.accessor('balance', {
        header: 'Balance',
        cell: ({ row }) => (
          <Typography color='text.primary'>{row.original.balance}</Typography>
        )
      }),
      columnHelper.accessor('action', {
        header: 'Action',
        cell: ({ row }) => (
          <div className='flex items-center'>
            <IconButton>
              <i className='tabler-trash text-[22px] text-textSecondary' />
            </IconButton>
            <IconButton>
              <Link
                href={getLocalizedUrl(`apps/invoice/preview/${row.original.id}`, locale as Locale)}
                className='flex'
              >
                <i className='tabler-mail text-[22px] text-textSecondary' />
              </Link>
            </IconButton>
          </div>
        ),
        enableSorting: false
      })
    ],

    []
  )
  const table = useReactTable({
    data: invoiceData as InvoiceType[],
    columns,
    filterFns: {
      fuzzy: fuzzyFilter
    },
    state: {
      rowSelection,
      globalFilter
    },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  })

  return (
    <Card>
      <CardContent>
        <CustomTextField
          select
          label="Month"
          value={selectedMonth}
          onChange={(e) => updateSelectMonth(e.target.value)}
        >
          {Array.from({ length: 12 }, (_, i) => (
            <MenuItem key={i + 1} value={String(i + 1)}>
              {`${i + 1}月`}
            </MenuItem>
          ))}
        </CustomTextField>
      </CardContent>
      <div className='overflow-x-auto'>
        <table className={tableStyles.table}>
          <thead>
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <th key={header.id}>
                    {header.isPlaceholder ? null : (
                      <>
                        <div
                          className={classnames({
                            'flex items-center': header.column.getIsSorted(),
                            'cursor-pointer select-none': header.column.getCanSort()
                          })}
                          onClick={header.column.getToggleSortingHandler()}
                        >
                          {flexRender(header.column.columnDef.header, header.getContext())}
                          {{
                            asc: <i className='tabler-chevron-up text-xl' />,
                            desc: <i className='tabler-chevron-down text-xl' />
                          }[header.column.getIsSorted() as 'asc' | 'desc'] ?? null}
                        </div>
                      </>
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          {table.getFilteredRowModel().rows.length === 0 ? (
            <tbody>
              <tr>
                <td colSpan={table.getVisibleFlatColumns().length} className='text-center'>
                  No data available
                </td>
              </tr>
            </tbody>
          ) : (
            <tbody>
              {table
                .getRowModel()
                .rows.slice(0, table.getState().pagination.pageSize)
                .map(row => {
                  return (
                    <tr key={row.id} className={classnames({ selected: row.getIsSelected() })}>
                      {row.getVisibleCells().map(cell => (
                        <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
                      ))}
                    </tr>
                  )
                })}
            </tbody>
          )}
        </table>
      </div>
      <TablePagination
        component={() => <TablePaginationComponent table={table} />}
        count={table.getFilteredRowModel().rows.length}
        rowsPerPage={table.getState().pagination.pageSize}
        page={table.getState().pagination.pageIndex}
        onPageChange={(_, page) => {
          table.setPageIndex(page)
        }}
        onRowsPerPageChange={e => table.setPageSize(Number(e.target.value))}
      />
    </Card>
  )
}

export default InvoiceListTable
