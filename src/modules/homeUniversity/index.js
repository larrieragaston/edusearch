import React, { useState, useEffect, useContext } from "react";
import { Row, Typography, Card, Avatar, Divider, Image, Spin } from "antd";
import DashboardNumber from "../../components/DashboardNumber";
import WelcomeTitle from "../../components/WelcomeTitle";
import { noInformation, bucketBaseUrl } from "../../constants";
import { UserContext } from "../../contexts/userContext";
import { Col } from "antd";
import { UserOutlined, LoadingOutlined } from "@ant-design/icons";
import postulationService from "./../../services/postulation";
import contestsEvolution from "../../assets/contestsEvolution.png";
import postulantsPercent from "../../assets/postulantsPercent.png";
import universityService from "../../services/university";
import { navigate } from "@reach/router";
import moment from "moment";

const { Text, Title, Link } = Typography;

export default function HomeUniversity() {
	const [lastPostulations, setLastPostulations] = useState([]);
	const [dashboardInfo, setDashboardInfo] = useState({});
	const [contestsToClose, setContestsToClose] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [data, setData] = useState({});

	const { userData, setUserData } = useContext(UserContext);

	useEffect(() => {
		setData(userData);
	}, [userData]);

	useEffect(() => {
		async function fetchData() {
			setIsLoading(true);
			const postulations = await postulationService.getLastPostulations();
			setLastPostulations(postulations);
			const info = await universityService.getDashboardInfo();
			setDashboardInfo(info);
			const contests = await universityService.getContestsToClose();
			setContestsToClose(contests);
			setIsLoading(false);
		}
		fetchData();
	}, []);

	return (
		<>
			{isLoading ? (
				<Row justify="center" style={{ paddingTop: "150px" }}>
					<Spin
						tip="Cargando..."
						indicator={<LoadingOutlined style={{ fontSize: 150 }} spin />}
					/>
				</Row>
			) : (
				<React.Fragment>
					<Row>
						<WelcomeTitle data={data} />
					</Row>
					<Row style={{ paddingBottom: "2em" }}>
						<DashboardNumber
							data={{
								quantity: dashboardInfo?.activeContest ?? 0,
								type: "ACTIVE_CONTESTS",
							}}
						/>
						<DashboardNumber
							data={{
								quantity: dashboardInfo?.draftContest ?? 0,
								type: "DRAFT_CONTESTS",
							}}
						/>
						<DashboardNumber
							data={{
								quantity: dashboardInfo?.careersUploaded ?? 0,
								type: "CAREERS_UPLOADED",
							}}
						/>
						<DashboardNumber
							data={{ quantity: dashboardInfo?.usersCount ?? 0, type: "USERS" }}
						/>
						{/* <DashboardNumber data={{ quantity: 20, type: "ACTIVE_CONTESTS" }} />
				<DashboardNumber data={{ quantity: 6, type: "DRAFT_CONTESTS" }} />
				<DashboardNumber data={{ quantity: 6, type: "CAREERS_UPLOADED" }} />
				<DashboardNumber data={{ quantity: 4, type: "USERS" }} /> */}
					</Row>
					<Row style={{ width: "90%" }}>
						<Col span={17}>
							<Row>
								<Col span={15} style={{ padding: 10 }}>
									<Card style={{ boxShadow: "0px 7px 6px rgb(0 0 0 / 7%)" }}>
										<Row>
											<Title
												level={5}
												style={{ color: "#0262cf", marginBottom: "0.2em" }}
											>
												Concursos
											</Title>
										</Row>
										<Row>
											<Col span={20}>
												<Image src={contestsEvolution} preview={false}></Image>
											</Col>
											<Col span={4}>
												<Row justify="center">
													<Text>Activos</Text>
												</Row>
												<Row justify="center">
													<Text strong>20</Text>
												</Row>
												<Row justify="center">
													<Text>Finalizados</Text>
												</Row>
												<Row justify="center">
													<Text strong>6</Text>
												</Row>
											</Col>
										</Row>
									</Card>
								</Col>
								<Col span={9} style={{ padding: 10 }}>
									<Card style={{ boxShadow: "0px 7px 6px rgb(0 0 0 / 7%)" }}>
										<Row>
											<Title
												level={5}
												style={{ color: "#0262cf", marginBottom: "0.2em" }}
											>
												Postulantes
											</Title>
										</Row>
										<Row>
											<Col span={20}>
												<Image
													width={135}
													src={postulantsPercent}
													preview={false}
												></Image>
											</Col>
											<Col span={4}>
												<Row justify="center">
													<Text>Mujeres</Text>
												</Row>
												<Row justify="center">
													<Text strong>39%</Text>
												</Row>
												<Row justify="center">
													<Text>Hombres</Text>
												</Row>
												<Row justify="center">
													<Text strong>61%</Text>
												</Row>
											</Col>
										</Row>
									</Card>
								</Col>
							</Row>
							<Row style={{ padding: 10 }}>
								<Col span={24}>
								<Card style={{ boxShadow: "0px 7px 6px rgb(0 0 0 / 7%)" }}>
									<Row>
										<Title
											level={5}
											style={{ color: "#0262cf", marginBottom: 20 }}
										>
											Concursos próximos al cierre de postulaciones
										</Title>
									</Row>
									{contestsToClose?.length !== 0 ? (
										contestsToClose.map((c) => (
											<>
												<Col span={24}>
													<Row justify="end">
														<Text disabled>
															{c.subject?.name ?? noInformation} -{" "}
															{c.career?.name ?? noInformation}
														</Text>
													</Row>
													<Row>
														<Text style={{ marginTop: 10 }}>
															Las postulaciones para el concurso cierran el día{" "}
															<strong>
																{" "}
																{c.dueDate
																	? moment(
																			c.dueDate,
																			"YYYY-MM-DDT00:00:00.000+00:00"
																	  ).format("DD-MM-YYYY")
																	: noInformation}
															</strong>
															.
														</Text>
													</Row>
													<Row>
														<Text italic style={{ marginTop: 10 }}>
															Hasta este momento, se han postulado{" "}
															<Link
																onClick={() => navigate("/contest/" + c._id)}
															>
																{c.postulationsCount ?? 0}
															</Link>{" "}
															personas.
														</Text>
													</Row>
												</Col>
												<Divider />
											</>
										))
									) : (
										<Text style={{ marginTop: 10 }}>
											No se han encontrado concursos con cierre de postulaciones
											proximos a vencer.
										</Text>
									)}
									<Row>
										<Col offset={21}>
											<Link onClick={() => navigate("/contests/actives")}>
												Ver Todos
											</Link>
										</Col>
									</Row>
								</Card>
								</Col>
							</Row>
						</Col>
						<Col span={7} style={{ padding: 10 }}>
							<Card style={{ boxShadow: "0px 7px 6px rgb(0 0 0 / 7%)" }}>
								<Title
									level={5}
									style={{ color: "#0262cf", marginBottom: "0.2em" }}
								>
									Ultimos docentes que se postularon
								</Title>
								{lastPostulations ? (
									lastPostulations.map((lp) => (
										<Row style={{ paddingTop: 20 }}>
											<Col span={6}>
												{lp?.user?.mediaUrl ? (
													<Avatar
														size={40}
														src={bucketBaseUrl + lp.user.mediaUrl}
													/>
												) : (
													<Avatar size={40} icon={<UserOutlined />} />
												)}
											</Col>
											<Col span={18}>
												<Row>
													<Text strong>
														{lp?.user?.lastName + " " + lp?.user?.firstName}
													</Text>
												</Row>
												<Row>
													<Text disabled>
														{lp?.subject?.name ?? noInformation}
													</Text>
												</Row>
											</Col>
										</Row>
									))
								) : (
									<Text strong>No existen postulaciones registradas</Text>
								)}
							</Card>
						</Col>
					</Row>
				</React.Fragment>
			)}
		</>
	);
}
