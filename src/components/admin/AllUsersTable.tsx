import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from '@mui/material'
import { DeleteOutline, VisibilityOutlined } from '@mui/icons-material'
import {
  deleteUser,
  getUserProfits,
  getUserTransactions,
  getUserWithId,
} from '../../settings/api/dataManipulation'
import { useDispatch, useSelector } from 'react-redux'
import {
  setSelectedProfits,
  setSelectedTransactions,
  setSelectedUser,
} from '../../pages/user/selected-user.slice'
import { setDeleteUser, usersView } from '../../pages/user/main.slice'
import { currentUsernameView } from '../../pages/user/current-user.slice'
import { useTranslation } from 'react-i18next'
import { errorToast, successToast } from '../../utils/toast'

interface Props {
  editMode: boolean
}

export function AllUsersTable({ editMode }: Props) {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const currentUsername = useSelector(currentUsernameView)
  const users = useSelector(usersView)
  const handleSelectUser = (id: string) => {
    getUserWithId(id).then((res) => {
      dispatch(setSelectedUser(res.data))
    })
    getUserTransactions(id).then((res) => {
      dispatch(setSelectedTransactions(res.data))
    })
    getUserProfits(id).then((res) => {
      dispatch(setSelectedProfits(res.data))
    })
  }
  const handleDeleteUser = (id: string) => {
    deleteUser(id)
      .then(() => {
        dispatch(setDeleteUser(id))
        successToast(t('messages.successful'))
      })
      .catch(() => {
        errorToast(t('messages.error'))
      })
  }
  return (
    <TableContainer
      sx={{
        overflowY: 'auto',
        boxSizing: 'border-box',
        borderRadius: '20px',

        borderColor: 'primary.main',
        borderWidth: '1px',
        borderStyle: 'solid',
      }}
    >
      <Table stickyHeader>
        <TableBody
          sx={{ overflowY: 'scroll', height: '100%', bgcolor: '#fffa' }}
        >
          {users.length > 0 ? (
            users
              .filter((u) => u.username !== currentUsername)
              .map((u) => (
                <TableRow key={u.username}>
                  <TableCell sx={{ width: '20px', padding: 0 }}>
                    <Button
                      disabled={editMode}
                      onClick={() => handleSelectUser(u.id)}
                      sx={{ minWidth: 0 }}
                    >
                      <VisibilityOutlined />
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Typography fontWeight="700">{u.username}</Typography>
                  </TableCell>

                  <TableCell>
                    <Typography>
                      {u.firstname || u.lastname
                        ? `${u.firstname ?? ''} ${u.lastname ?? ''}`
                        : `${t('user.firstname')} ${t('inform.empty')}`}
                    </Typography>
                  </TableCell>
                  <TableCell sx={{ width: '20px', padding: 0 }}>
                    <Button
                      onClick={() => (u.id ? handleDeleteUser(u.id) : null)}
                      sx={{ minWidth: 0 }}
                    >
                      <DeleteOutline color="error" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
          ) : (
            <Typography>{t('inform.thereIsNoUserYet')}</Typography>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
