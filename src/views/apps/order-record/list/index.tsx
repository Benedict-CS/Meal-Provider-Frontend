// MUI Imports
import Grid from '@mui/material/Grid'

// Type Imports
import type { UsersType } from '@/types/apps/userTypes'

// Component Imports
import OrderListTable from './UserListTable'
import UserListCards from './UserListCards'


const UserList = ({ userData }: { userData?: UsersType[] }) => {
  return (
    <Grid container spacing={6}>
      {/* <Grid item xs={12}>
        <UserListCards />
      </Grid> */}
      <Grid item xs={12}>
        <OrderListTable tableData={userData} />
      </Grid>
    </Grid>
  )
}

export default UserList
