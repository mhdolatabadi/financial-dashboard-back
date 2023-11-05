import { useState } from 'react'
import { PersianTexts } from '../../utils/persianTexts'
import {
  ContainedButton,
  ErrorToast,
  Section,
  SuccessToast,
  TextField,
} from '../../components/common'
import {
  getUserProfits,
  getUserTransactions,
  getUserWithUsername,
  loginUser,
} from '../../utils/dataManipulation'
import { useDispatch } from 'react-redux'
import { setAccessToken, setCurrentPage } from '../user/main.slice'
import { Page } from '../../models/Page'
import {
  setCurrentIsAdmin,
  setCurrentUser,
  setCurrentUsername,
} from '../user/current-user.slice'
import {
  setSelectedProfits,
  setSelectedTransactions,
  setSelectedUser,
  setSelectedUsername,
} from '../user/selected-user.slice'

export function LoginPage() {
  const [username, setUsernameState] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const dispatch = useDispatch()
  const loginHandler = () => {
    loginUser(username, password)
      .then(({ data }) => {
        getUserWithUsername(username).then((res) => {
          dispatch(setCurrentUser(res.data))
          dispatch(setSelectedUser(res.data))
          getUserTransactions(res.data.id).then((res2) => {
            dispatch(setSelectedTransactions(res2.data))
          })
          getUserProfits(res.data.id).then((res2) => {
            dispatch(setSelectedProfits(res2.data))
          })
        })
        dispatch(setCurrentPage(Page.admin))
        dispatch(setAccessToken(data.access_token))
        dispatch(setCurrentIsAdmin(data.isAdmin))
        dispatch(setSelectedUsername(username))
        dispatch(setCurrentUsername(username))
        SuccessToast(PersianTexts.successfullLogin).showToast()
      })
      .catch(() => {
        ErrorToast.showToast()
      })
  }

  return (
    <Section sx={{ width: '500px', margin: '200px auto' }}>
      <div style={{ marginBottom: '20px', width: '100%' }}>
        <TextField
          label={PersianTexts.username}
          onChange={(e) => setUsernameState(e.target.value)}
        />
        <TextField
          label={PersianTexts.password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
        />
      </div>
      <ContainedButton variant="contained" onClick={loginHandler}>
        {PersianTexts.enter}
      </ContainedButton>
    </Section>
  )
}
