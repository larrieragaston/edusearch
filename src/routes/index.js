import React, { useMemo, useState } from 'react'
import { Router } from '@reach/router'
// import Home from '../modules/home'
import Login from '../modules/login'
import Register from '../modules/register'
import Forgot from '../modules/forgot'
import MainLayout from '../modules/mainLayout'
import Home from "../modules/home";
import AccountSettings from "../modules/accountSettings";
import PersonalInformation from "../modules/personalInformation";
import ProfessionalInformation from "../modules/professionalInformation";
import Contests from "../modules/contests";
import Contest from "../modules/contest";
import ContestDetails from "../modules/contestDetails";
import MyUniversity from './../modules/myUniversity/index';
import ScoreTable from './../modules/scoreTable/index';
import Careers from './../modules/careers/index';
import Users from './../modules/users/index';
import FAQ from "../modules/faq";
import { NotAuthorized, NotFound, ServerError } from '../modules/errors';
import { UserContext } from '../contexts/userContext';

const fullHeight = { height: '100%' }

function Routes() {

  const [userData, setUserData] = useState({});

  const userProvider = useMemo(() => ({ userData, setUserData }), [userData, setUserData]);

  return (
    <UserContext.Provider value={userProvider}>
      <Router style={fullHeight} path={`${process.env.PUBLIC_URL}/`}>
        {/* <Home path="/" /> */}
        <Login path="/login" />
        <Register path="/register" />
        <Forgot path="/forgot" />
        <MainLayout path="/" >
          <Home default/>

          <AccountSettings path="acccount-settings" />
          <PersonalInformation path="personal-information" />
          <ProfessionalInformation path="my-resume" />
          <Contests path="contests/:type" />
          <ContestDetails path="contest/:id" />

          <MyUniversity path="my-university" />
          <ScoreTable path="score-table" />
          <Careers path="careers" />
          <Users path="users" />
          <Contest path="contest/create" />
          <Contests path="contests/drafts" />
          <Contests path="contests/actives" />
          <Contests path="contests/ended" />

          <FAQ path="faq" />
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
