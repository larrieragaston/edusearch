import React, { useMemo, useState } from "react";
import { Router } from "@reach/router";
import Login from "../modules/login";
import Register from "../modules/register";
import Forgot from "../modules/forgot";
import MainLayout from "../modules/mainLayout";
import Home from "../modules/home";
import AccountSettings from "../modules/accountSettings";
import PersonalInformation from "../modules/personalInformation";
import ProfessionalInformation from "../modules/professionalInformation";
import Contests from "../modules/contests";
import UniversityContests from "../modules/universityContests";
import Contest from "../modules/contest";
import ContestDetails from "../modules/contestDetails";
import UniversityContestDetails from "../modules/universityContestDetails";
import MyUniversity from "./../modules/myUniversity";
import ScoreTable from "./../modules/scoreTable";
import Careers from "./../modules/careers";
import Users from "./../modules/users";
import FAQ from "../modules/faq";
import { NotAuthorized, NotFound, ServerError } from "../modules/errors";
import { UserContext } from "../contexts/userContext";
import { roles } from "../constants";
import HomeUniversity from './../modules/homeUniversity/index';

const fullHeight = { height: "100%" };

function Routes() {
	const [userData, setUserData] = useState({});

	const userProvider = useMemo(
		() => ({ userData, setUserData }),
		[userData, setUserData]
	);

	const profileRoutes = () => {
		if (userData?.role == roles.Teacher)
			return (
				<>
					<Home default />
					<PersonalInformation path="personal-information" />
					<ProfessionalInformation path="my-resume" />
					<Contests path="contests/:type" />
					<ContestDetails path="contest/:id" />
				</>
			);
		if (
			userData?.role == roles.UAdmin ||
			userData?.role == roles.UCouncilMember ||
			userData?.role == roles.UHumanResources
		)
			return (
				<>
					<HomeUniversity default />
					<MyUniversity path="my-university" />
					<ScoreTable path="score-table" />
					<Careers path="careers" />
					<Users path="users" />
					<Contest path="contest/create" />
					<Contest path="contest/edit/:id" />
					<UniversityContests path="contests/:type" />
					<UniversityContestDetails path="contest/:id" />
				</>
			);
		return <ServerError path="/500" />;
	};

	return (
		<UserContext.Provider value={userProvider}>
			<Router style={fullHeight} path={`${process.env.PUBLIC_URL}/`}>
				<Login path="/login" />
				<Register path="/register" />
				<Forgot path="/forgot" />
				<MainLayout path="/">
					<AccountSettings path="acccount-settings" />
					{profileRoutes()}
					<FAQ path="faq" />
				</MainLayout>

				{/*ERRORES*/}
				<NotAuthorized path="/403" />
				<NotFound default path="/404" />
				<ServerError path="/500" />
			</Router>
		</UserContext.Provider>
	);
}

export default Routes;
