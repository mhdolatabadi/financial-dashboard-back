import { MainPage } from './pages/user/MainPage'
import { AppBar, Button, Popover, Toolbar, Typography } from '@mui/material'
import { LoginPage } from './pages/login/LoginPage'
import { useDispatch, useSelector } from 'react-redux'
import { currentPageView, setCurrentPage } from './pages/user/main.slice'
import { Page } from './models/Page'
import {
  currentIsAdminView,
  currentUserView,
} from './pages/user/current-user.slice'
import { UserInformation } from './components/user/UserInformation'
import React, { useEffect, useState } from 'react'

export function App() {
  const dispatch = useDispatch()
  const currentPage = useSelector(currentPageView)
  const currentUser = useSelector(currentUserView)
  const isAdmin = useSelector(currentIsAdminView)
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }
  const open = Boolean(anchorEl)
  const id = open ? 'simple-popover' : undefined
  return (
    <div className="App">
      <AppBar
        sx={{
          padding: '20px',
          backgroundColor: 'white',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <img alt="dornico" width="50px" height="50px" src="/dornico.svg" />
        <Toolbar
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%',
          }}
        >
          <Typography fontSize="20px" color="primary" fontWeight="700">
            صندوق سرمایه‌گذاری خصوصی درنیکو
          </Typography>
          {currentPage != Page.login && (
            <Button
              onClick={handleClick}
              variant="outlined"
              sx={{ padding: '20px', borderRadius: '20px' }}
            >
              <Typography fontWeight="500" fontSize="20">
                {isAdmin ? 'admin' :currentUser.firstname || currentUser.lastname
                  ? `${currentUser.firstname} ${currentUser.lastname ?? ''}`
                  : currentUser.username}
              </Typography>
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        sx={{
          '& > .MuiPaper-root': {
            borderRadius: '20px',
          },
        }}
      >
        <div
          style={{
            maxWidth: '500px',
            minWidth: '500px',
            padding: '30px',
            borderRadius: '20px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end',
          }}
        >
          {!isAdmin && <UserInformation editMode={false} user={currentUser} />}
          <Button
            variant="contained"
            color="error"
            sx={{
              borderRadius: '20px',
              width: '100px',
              height: '40px',
              margin: '10px 0 0 10px',
            }}
            onClick={() => {
              dispatch(setCurrentPage(Page.login))
              localStorage.clear()
              setAnchorEl(null)
            }}
          >
            خروج
          </Button>
        </div>
      </Popover>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          width: '100%',
          height: '100%',
          justifyContent: 'center',
          flexDirection: 'column',
        }}
      >
        {currentPage === Page.login && <LoginPage />}
        {currentPage === Page.admin && <MainPage />}
      </div>
    </div>
  )
}