import React, { useState } from 'react'
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
import { UserInformation } from './components/user-information/UserInformation'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SuccessToast } from './components/common'

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

  const handleLogout = () => {
    dispatch(setCurrentPage(Page.login))
    localStorage.clear()
    setAnchorEl(null)
    SuccessToast('با موفقیت خارج شدید')
  }
  const open = Boolean(anchorEl)
  const id = open ? 'simple-popover' : undefined
  return (
    <div className="App">
      <ToastContainer rtl position={toast.POSITION.BOTTOM_RIGHT} limit={3}/>
      <AppBar
        sx={{
          padding: '20px',
          backgroundColor: '#fffa',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          boxSizing: 'border-box',
        }}
      >
        <Toolbar
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%',
            backgroundColor: '#fffa',
            borderRadius: '20px',
            paddingLeft: 0,
            paddingRight: 0,
            padding: '15px',
            boxSizing: 'border-box',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <img
              alt="dornico"
              width="50px"
              height="50px"
              src="/dornico.svg"
              style={{ marginLeft: '15px' }}
            />
            <Typography fontSize="20px" color="primary" fontWeight="700">
              صندوق سرمایه‌گذاری خصوصی درنیکو
            </Typography>
          </div>
          {currentPage != Page.login && (
            <Button
              onClick={isAdmin ? handleLogout : handleClick}
              variant="outlined"
              sx={{
                padding: '20px',
                borderRadius: '20px',
                width: '150px',
                background: '#fffa',
              }}
              color={isAdmin ? 'error' : 'primary'}
            >
              <Typography fontWeight="500" fontSize="20">
                {isAdmin
                  ? 'خروج'
                  : currentUser.firstname || currentUser.lastname
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
            background: '#fffc',
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
          {!isAdmin && <UserInformation user={currentUser} />}
          <Button
            variant="contained"
            color="error"
            sx={{
              borderRadius: '20px',
              width: '100px',
              height: '40px',
              margin: '10px 0 0 10px',
            }}
            onClick={handleLogout}
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
