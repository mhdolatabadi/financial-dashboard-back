import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../settings/store'
import { User } from '../../models/user'
import { Page } from '../../models/Page'

const mainSlice = createSlice({
  name: 'main',
  initialState: {
    currentPage: Page.login,
    accessToken: '',
    selectedUser: null as unknown as User,
    users: [] as User[]
  },
  reducers: {
    setAccessToken: (state, action) => {
      state.accessToken = action.payload
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload
    },
    setDeleteUser: (state, action) => {
      const newUsers = state.users.filter(u => u.id != action.payload)
      state.users = newUsers
    }
  }
})

const { actions, reducer } = mainSlice

export const mainReducer = reducer

export const { setAccessToken, setCurrentPage, setDeleteUser } = actions

export const accessTokenView = (state: RootState) => state.main.accessToken
export const currentPageView = (state: RootState) => state.main.currentPage
