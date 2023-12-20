import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { Typography } from '@mui/material'
import {
  getAllUsers,
  getUserProfits,
  getUserTransactions,
  getUserWithUsername,
} from '../../settings/api/dataManipulation'
import { AdminToolbox } from '../../components/admin'
import {
  currentIsAdminView,
  currentUsernameView,
  currentUserView,
  setCurrentUser,
} from './current-user.slice'
import {
  selectedUsernameView,
  selectedUserView,
  setSelectedProfits,
  setSelectedTransactions,
  setSelectedUser,
} from './selected-user.slice'
import { setUsers } from './main.slice'
import { toPersianNumber } from '../../utils/toPersianNumber'
import { UserInformationContainer } from '../../components/user-information'
import { ProfitsTable, TransactionsTable } from '../../components/table'

export function MainPage() {
  const { t } = useTranslation()

  const [editMode, setEditMode] = useState(false)

  const dispatch = useDispatch()
  const selectedUsername = useSelector(selectedUsernameView)
  const currentUsername = useSelector(currentUsernameView)
  const currentUser = useSelector(currentUserView)
  const selectedUser = useSelector(selectedUserView)
  const isAdmin = useSelector(currentIsAdminView)

  const fetchData = () => {
    getAllUsers().then((res) => {
      dispatch(setUsers(res.data))
    })
    getUserWithUsername(currentUsername).then((res) => {
      dispatch(setCurrentUser(res.data))
      dispatch(setSelectedUser(res.data))
      getUserTransactions(res.data.id).then((res2) => {
        dispatch(setSelectedTransactions(res2.data))
      })
      getUserProfits(res.data.id).then((res2) => {
        dispatch(setSelectedProfits(res2.data))
      })
    })
  }

  useEffect(() => {
    fetchData()
  }, [currentUsername])

  return (
    <div style={{ padding: '130px 0 0', height: '100%', width: '100%' }}>
      <div style={{ padding: '50px' }}>
        <Typography color="white" fontWeight="700" fontSize="25px">{`${t(
          'yourFinance',
        )} ${toPersianNumber(currentUser.financial)} ${t(
          `units.${currentUser.unit}`,
        )}`}</Typography>
      </div>
      {isAdmin && (
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}
        >
          {isAdmin && <AdminToolbox editMode={editMode} />}
          {selectedUsername !== currentUsername && isAdmin && (
            <UserInformationContainer
              user={selectedUser}
              editMode={editMode}
              handleEditMode={(b) => setEditMode(b)}
            />
          )}
        </div>
      )}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          height: '100%',
          justifyContent: 'center',
        }}
      >
        {selectedUsername && <TransactionsTable />}
        {selectedUsername && <ProfitsTable />}
      </div>
    </div>
  )
}
