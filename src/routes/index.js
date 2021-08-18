import React, { useMemo, useState } from 'react'
import { Router } from '@reach/router'
import Login from '../modules/login'
import MainLayout from '../modules/mainLayout'
import Home from "../modules/home";
import AccountSettings from "../modules/accountSettings";
import PersonalInformation from "../modules/personalInformation";
import ProfessionalInformation from "../modules/professionalInformation";
import Contests from "../modules/contests";
import ContestDetails from "../modules/contestDetails";
import FAQ from "../modules/faq";
import { NotAuthorized, NotFound, ServerError } from '../modules/errors';
import { UserContext } from '../contexts/userContext';

// import Forgot from '../modules/forgot'
// import Register from '../modules/register'
// import Home from '../modules/home'

const fullHeight = { height: '100%' }

function Routes() {

  const [userData, setUserData] = useState({});

  const userProvider = useMemo(() => ({ userData, setUserData }), [userData, setUserData]);

  return (
    <UserContext.Provider value={userProvider}>
      <Router style={fullHeight} path={`${process.env.PUBLIC_URL}/`}>
        {/* <Home path="/" /> */}
        <Login path="/login" />
        {/* <Register path="/register" /> */}
        {/* <Forgot path="/forgot" /> */}
        <MainLayout path="/" >
          <AccountSettings path="acccount-settings" />
          <PersonalInformation path="personal-information" />
          <ProfessionalInformation path="my-resume" />
          <Contests path="contests/:type" />
          <ContestDetails path="contest/:id" />
          <FAQ path="faq" />
          <Home default/>
        </MainLayout>

        {/*ERRORES*/}
        <NotAuthorized path="/403" />
        <NotFound default path="/404" />
        <ServerError path="/500" />
      </Router>
    </UserContext.Provider>
  )
}

export default Routes
