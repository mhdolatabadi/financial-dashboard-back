import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { TabContext, TabList, TabPanel } from '@mui/lab'
import { styled, Tab } from '@mui/material'
import {
  AdminPanelSettings,
  Group,
  Paid,
  PersonAdd,
  Receipt,
} from '@mui/icons-material'
import { CreateUser } from './CreateUser'
import { AllUsersTable } from './AllUsersTable'
import { SubmitTransaction } from './SubmitTransaction'
import { SubmitProfit } from './SubmitProfit'
import {
  createUser,
  getUserWithUsername,
} from '../../settings/api/dataManipulation'
import { SectionWithHeader } from '../common'
import { Credential } from '../../models/credential'
import { setAddUser } from '../../pages/user/main.slice'
import { errorToast, successToast } from '../../utils/toast'

const StyledTabPanel = styled(TabPanel)(() => ({
  width: '100%',
  height: '100%',

  minWidth: '400px',
  maxWidth: '500px',
  minHeight: '550px',
  maxHeight: '550px',

  background: '#fffa',
  padding: '15px',
  boxSizing: 'border-box',
  borderRadius: '20px',
}))

const StyledTab = styled(Tab)(() => ({
  flexGrow: 1,
  color: '#fffd',
  '&.Mui-selected': {
    color: 'white',
    border: '1px solid white',
    borderColor: '#fff5',
  },
}))

interface Props {
  editMode: boolean
}

export function AdminToolbox({ editMode }: Props) {
  const { t } = useTranslation()

  const dispatch = useDispatch()

  const [selectedTab, setSelectedTab] = useState<string>('1')

  const handleCreateUser = ({
    username,
    password,
    unit,
  }: Credential & { unit: string }) => {
    createUser(username, password, unit).then(() => {
      successToast(t('messages.successful'))
      getUserWithUsername(username)
        .then((res) => {
          dispatch(setAddUser(res.data))
        })
        .catch(() => {
          errorToast(t('messages.error'))
        })
    })
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <SectionWithHeader
        sx={{ maxWidth: '500px' }}
        header={t('userManagement')}
        Icon={<AdminPanelSettings color="primary" />}
      >
        <TabContext value={selectedTab}>
          <TabList
            TabIndicatorProps={{ sx: { display: 'none' } }}
            sx={{
              width: '100%',
              marginBottom: '20px',
              bgcolor: 'primary.main',
              borderRadius: '20px',
            }}
            onChange={(_, value) => setSelectedTab(value)}
          >
            <StyledTab icon={<Group />} label={t('usersList')} value="1" />
            <StyledTab
              icon={<PersonAdd />}
              label={t('createNewUser')}
              value="2"
            />
            <StyledTab
              icon={<Receipt />}
              label={t('submitTransaction')}
              value="3"
            />

            <StyledTab icon={<Paid />} label={t('submitProfit')} value="4" />
          </TabList>
          <StyledTabPanel value="1">
            <AllUsersTable editMode={editMode} />
          </StyledTabPanel>
          <StyledTabPanel value="2">
            <CreateUser handleCreateUser={handleCreateUser} />
          </StyledTabPanel>
          <StyledTabPanel value="3">
            <SubmitTransaction />
          </StyledTabPanel>
          <StyledTabPanel value="4">
            <SubmitProfit />
          </StyledTabPanel>
        </TabContext>
      </SectionWithHeader>
    </div>
  )
}
