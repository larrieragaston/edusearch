import React, { useMemo, useState } from 'react'
import { Router } from '@reach/router'
import Login from '../modules/login'
import TeacherLayout from '../modules/teacherLayout'
import { NotAuthorized, NotFound, ServerError } from '../modules/errors';
import { UserContext } from '../contexts/userContext';

// import Forgot from '../modules/forgot'
// import Register from '../modules/register'
// import Home from '../modules/home'

const fullHeight = { height: '100%' }

function Routes() {

  // const [userData, setUserData] = useState({isLogin: true});

  // const userProvider = useMemo(() => ({ userData, setUserData }), [userData, setUserData]);

  return (
    <Router style={fullHeight} path={`${process.env.PUBLIC_URL}/`}>
      {/* <UserContext.Provider value={userProvider}> */}
        {/* <Home path="/" /> */}
        <Login path="/login" />
        <TeacherLayout path="/" />
        {/* <Register path="/register" /> */}
        {/* <Forgot path="/forgot" /> */}
        {/* <Dashboard path="/dashboard">
        <EditUser path="/edit-user" />
      </Dashboard> */}

        {/*ERRORES*/}
        <NotFound default />
        <NotAuthorized path="/403" />
        <NotFound path="/404" />
        <ServerError path="/500" />
      {/* </UserContext.Provider> */}
    </Router>
  )
}

export default Routes
