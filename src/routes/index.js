import React from 'react'
import { Router } from '@reach/router'
import Login from '../modules/login'
import TeacherLayout from '../modules/teacherLayout'
import { NotAuthorized, NotFound, ServerError } from '../modules/errors';

// import Forgot from '../modules/forgot'
// import Register from '../modules/register'
// import Home from '../modules/home'

const fullHeight = { height: '100%' }

function Routes() {
  return (
    <Router style={fullHeight} path={`${process.env.PUBLIC_URL}/`}>
      {/* <Home path="/" /> */}
      <Login path="/login" />
      <TeacherLayout path="/teacherLayout" />
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
    </Router>
  )
}

export default Routes
