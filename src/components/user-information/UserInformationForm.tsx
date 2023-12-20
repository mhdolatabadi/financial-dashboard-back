import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { Button, MenuItem } from '@mui/material'
import { TextField } from '../common'
import { selectedUserView, setSelectedUser, } from '../../pages/user/selected-user.slice'
import { updateUserInformation } from '../../settings/api/dataManipulation'
import { Units } from '../../models/units'
import { usersView } from '../../pages/user/main.slice'
import { errorToast, successToast } from '../../utils/toast'

interface Props {
  handleClose: (state: boolean) => unknown
}

export function UserInformationForm({ handleClose }: Props) {
  const { t } = useTranslation()

  const dispatch = useDispatch()
  const users = useSelector(usersView)
  const selectedUser = useSelector(selectedUserView)

  const [username, setUsername] = useState(selectedUser.username)
  const [password, setPassword] = useState('')
  const [nationalNo, setNationalNo] = useState(selectedUser.nationalNo ?? '')
  const [firstname, setFirstname] = useState(selectedUser.firstname ?? '')
  const [lastname, setLastname] = useState(selectedUser.lastname ?? '')
  const [unit, setUnit] = useState(selectedUser.unit)

  const handleEditUser = () => {
    const user = {
      ...selectedUser,
      username,
      password,
      nationalNo,
      firstname,
      lastname,
      unit,
    }
    updateUserInformation(selectedUser.id, {
      ...user,
      lastTransactionDate: undefined,
    })
      .then((res) => {
        console.log(res)
        dispatch(setSelectedUser(user))
        successToast(t('messages.successful'))
      })
      .catch(() => {
        errorToast(t('messages.error'))
      })
      .finally(() => handleClose(false))
  }
  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        justifyContent: 'space-between',
      }}
    >
      <div>
        <TextField
          label={t('user.username')}
          value={username}
          error={
            users.map((u) => u.username).includes(username) &&
            username !== selectedUser.username
          }
          helperText={
            users.map((u) => u.username).includes(username) &&
            username !== selectedUser.username
              ? t('inform.usernameMustBeUnique')
              : ''
          }
          onChange={(username) => setUsername(username.target.value)}
        />
        <TextField
          label={t('user.password')}
          value={password}
          onChange={(password) => setPassword(password.target.value)}
          helperText="تنها در صورتی که می‌خواهید رمز عبور را تغییر دهید این فیلد را پر کنید"
        />
        <TextField
          label={t('user.nationalNo')}
          value={nationalNo}
          onChange={(nationalNo) => setNationalNo(nationalNo.target.value)}
        />
        <TextField
          label={t('user.firstname')}
          value={firstname}
          onChange={(e) => setFirstname(e.target.value)}
        />
        <TextField
          label={t('user.lastname')}
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
        />

        <TextField
          select
          label={t('userTransactionsUnit')}
          value={unit}
          onChange={(e) => setUnit(e.target.value)}
        >
          <MenuItem value={Units.rial}>{t('units.rial')}</MenuItem>
          <MenuItem value={Units.derham}>{t('units.derham')}</MenuItem>
          <MenuItem value={Units.dollar}>{t('units.dollar')}</MenuItem>
          <MenuItem value={Units.euro}>{t('units.euro')}</MenuItem>
        </TextField>
      </div>
      <div style={{ display: 'flex', margin: '10px 0' }}>
        <Button
          sx={{
            fontWeight: '700',
            fontSize: '17px',
            width: '100%',
            borderRadius: '20px',
            margin: '5px',
            background: '#fffa',
          }}
          color="error"
          variant="outlined"
          onClick={() => handleClose(false)}
        >
          {t('common.cancel')}
        </Button>
        <Button
          sx={{
            fontWeight: '700',
            fontSize: '17px',
            width: '100%',
            borderRadius: '20px',
            margin: '5px',
            height: '55px',
          }}
          variant="contained"
          onClick={handleEditUser}
        >
          {t('common.submit')}
        </Button>
      </div>
    </div>
  )
}
