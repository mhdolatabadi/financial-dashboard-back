import { useState } from 'react'
import {
  ContainedButton,
  Section,
  TextField,
} from '../../components/common'
import { loginUser } from '../../settings/api/dataManipulation'
import { useDispatch } from 'react-redux'
import { setAccessToken, setCurrentPage } from '../user/main.slice'
import { Page } from '../../models/page.enum'
import {
  setCurrentIsAdmin,
  setCurrentUsername,
} from '../user/current-user.slice'
import { setSelectedUsername } from '../user/selected-user.slice'
import { useTranslation } from 'react-i18next'
import { errorToast, successToast } from '../../utils/toast'

export function LoginPage() {
  const { t } = useTranslation()

  const [username, setUsernameState] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const dispatch = useDispatch()

  const loginHandler = () => {
    loginUser(username, password)
      .then(({ data }) => {
        localStorage.setItem('username', username)
        localStorage.setItem('accessToken', data.access_token)
        dispatch(setCurrentPage(Page.Main))
        dispatch(setAccessToken(data.access_token))
        dispatch(setCurrentIsAdmin(data.isAdmin))
        dispatch(setSelectedUsername(username))
        dispatch(setCurrentUsername(username))
        successToast(t('messages.successfulLogin'))
      })
      .catch(() => {
        errorToast(t('messages.error'))
      })
  }

  return (
    <Section sx={{ width: '500px', margin: '200px auto' }}>
      <div
        style={{
          width: '100%',
          background: '#fff5',
          padding: '20px',
          boxSizing: 'border-box',
          borderRadius: '20px',
        }}
      >
        <div
          style={{
            marginBottom: '20px',
            width: '100%',
            background: '#fff5',
            padding: '20px',
            boxSizing: 'border-box',
            borderRadius: '20px',
          }}
        >
          <TextField
            label={t('user.username')}
            onChange={(e) => setUsernameState(e.target.value)}
          />
          <TextField
            label={t('user.password')}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
          />
        </div>
        <ContainedButton onClick={loginHandler}>
          {t('common.enter')}
        </ContainedButton>
      </div>
    </Section>
  )
}
