import React, { useState, useEffect } from "react";
import Contest from "../../components/Contest";
import contestService from "../../services/contest";
import { Row, Typography, Result, Button, Card, Spin } from "antd";
import { contestTypes, noInformation } from "../../constants";
import { navigate } from "@reach/router";
import { LoadingOutlined } from "@ant-design/icons";
const { Text } = Typography;

export default function UniversityContests(props) {
	const [contests, setContests] = useState([]);
	const [contestsCount, setContestsCount] = useState(0);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		async function fetchData() {
			setIsLoading(true);
			let contestForUser;
			switch (props.type) {
				case contestTypes.drafts:
					contestForUser = await contestService.getDraftContestsForUniversity();
					break;
				case contestTypes.actives:
					contestForUser =
						await contestService.getActiveContestsForUniversity();
					break;
				case contestTypes.ended:
					contestForUser = await contestService.getEndedContestsForUniversity();
					break;
				default:
					contestForUser = null;
					break;
			}
			setContests(contestForUser);
			setContestsCount(contestForUser?.length);
			setIsLoading(false);
		}
		fetchData();
	}, [props.type]);

	const getPageTitle = (type) => {
		switch (type) {
			case contestTypes.drafts:
				return "Borradores";
			case contestTypes.actives:
				return "Concursos Activos";
			case contestTypes.ended:
				return "Concursos Finalizados";
			default:
				return "Error";
		}
	};

	return (
		<>
			{isLoading ? (
				<Row justify="center" style={{ paddingTop: "150px" }}>
					<Spin
						tip="Cargando..."
						indicator={<LoadingOutlined style={{ fontSize: 150 }} spin />}
					/>
				</Row>
			) : contests?.length !== 0 ? (
				<React.Fragment>
					<Row>
						<Text
							style={{
								fontSize: "20px",
								color: "#0262CF",
								paddingBottom: "0.9em",
								paddingTop: "0.9em",
							}}
						>
							{getPageTitle(props.type)} ({contestsCount})
						</Text>
					</Row>
					<Row>
						{contests
							? contests.map((x) => (
									<Contest key={x._id} data={x} isUniversity={true} />
							  ))
							: noInformation}
					</Row>
				</React.Fragment>
			) : (
				<Row justify="center" style={{ paddingTop: "150px" }}>
					<Card
						style={{ width: "80%", marginTop: "50px" }}
						bodyStyle={{
							padding: "15px 35px",
							borderRadius: "5px",
							boxShadow: "0px 7px 6px rgb(0 0 0 / 7%)",
						}}
					>
						<Result
							status="warning"
							title="No hay concursos para la sección seleccionada"
							extra={
								<Button
									type="primary"
									key="backToHome"
									onClick={() => navigate("/dashboard")}
								>
									Volver al inicio
								</Button>
							}
						/>
					</Card>
				</Row>
			)}
		</>
	);
}
