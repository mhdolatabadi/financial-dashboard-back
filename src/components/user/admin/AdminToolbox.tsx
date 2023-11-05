import { TabContext, TabList, TabPanel } from '@mui/lab'
import { styled, Tab } from '@mui/material'
import { CreateUser } from './CreateUser'
import { PersianTexts } from '../../../utils/persianTexts'
import { AllUsersTable } from './AllUsersTable'
import { SubmitTransaction } from './SubmitTransaction'
import { SubmitProfit } from './SubmitProfit'
import { useEffect, useState } from 'react'
import { createUser, getAllUsers, getUserWithUsername } from '../../../utils/dataManipulation'
import { User } from '../../../models/user'
import { Section, SuccessToast } from '../../common'
import { Credential } from '../../../models/Credential'
import { useDispatch } from 'react-redux'
import { setAddUser } from '../../../pages/user/main.slice'

const StyledTabPanel = styled(TabPanel)(() => ({
  padding: 0,
  boxSizing: 'border-box',

  width: '100%',
  height: '100%',

  minWidth: '500px',
  maxWidth: '500px',
  minHeight: '500px',
  maxHeight: '500px'
}))

export function AdminToolbox() {
  const dispatch = useDispatch()
  const [selectedTab, setSelectedTab] = useState<string>('1')

  const handleCreateUser = ({ username, password }: Credential) => {
    createUser(username, password).then(() => {
      SuccessToast(PersianTexts.successful).showToast()
      getUserWithUsername(username)
        .then((res) => {
          dispatch(setAddUser(res.data))
        })
        .catch(console.warn)
    })
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <Section>
        <TabContext value={selectedTab}>
          <TabList
            TabIndicatorProps={{ sx: { display: 'none' } }}
            sx={{ width: '100%', marginBottom: '20px' }}
            onChange={(e, value) => setSelectedTab(value)}
          >
            <Tab disableRipple label={PersianTexts.usersList} value='1' />
            <Tab label={PersianTexts.createNewUser} value='2' />
            <Tab label={PersianTexts.submitTransaction} value='3' />

            <Tab label={PersianTexts.submitProfit} value='4' />
          </TabList>
          <StyledTabPanel value='1'>
            <AllUsersTable />
          </StyledTabPanel>
          <StyledTabPanel value='2'>
            <CreateUser handleCreateUser={handleCreateUser} />
          </StyledTabPanel>
          <StyledTabPanel value='3'>
            <SubmitTransaction />
          </StyledTabPanel>
          <StyledTabPanel value='4'>
            <SubmitProfit />
          </StyledTabPanel>
        </TabContext>
      </Section>
    </div>
  )
}
