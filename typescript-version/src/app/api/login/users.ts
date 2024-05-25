// ** Fake user data and data type

// ** Please remove below user data and data type in production and verify user with Real Database
export type UserTable = {
  id: number
  name: string
  email: string
  image: string
  password: string
}

// =============== Fake Data ============================

export const users: UserTable[] = [
  {
    id: 1,
    name: 'John Doe',
    password: 'hello',
    email: 'admin@gmail.com',
    image: '/images/avatars/1.png'
  },
  {
    id: 2,
    name: 'Benson Ho',
    password: 'hello',
    email: 'user@gmail.com',
    image: '/images/avatars/3.png'
  },
  {
    id: 3,
    name: 'Benedict Tiong',
    password: 'hello',
    email: 'tester@gmail.com',
    image: '/images/avatars/5.png'
  }
]
