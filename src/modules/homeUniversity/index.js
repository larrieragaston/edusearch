import React, { useState, useEffect, useContext } from "react";
import { Row, Typography, Card, Avatar, Divider, Image } from "antd";
import DashboardNumber from "../../components/DashboardNumber";
import WelcomeTitle from "../../components/WelcomeTitle";
import { noInformation, bucketBaseUrl } from "../../constants";
import { UserContext } from "../../contexts/userContext";
import { Col } from "antd";
import { UserOutlined } from "@ant-design/icons";
import postulationService from "./../../services/postulation";
import contestsEvolution from "../../assets/contestsEvolution.png";
import postulantsPercent from "../../assets/postulantsPercent.png";

const { Text, Title, Link } = Typography;

export default function HomeUniversity() {
	const [lastPostulations, setLastPostulations] = useState([]);
	const [data, setData] = useState({});

	const { userData, setUserData } = useContext(UserContext);

	useEffect(() => {
		setData(userData);
	}, [userData]);

	useEffect(() => {
		async function fetchData() {
			const postulations = await postulationService.getLastPostulations();
			setLastPostulations(postulations);
		}
		fetchData();
	}, []);

	return (
		<React.Fragment>
			<Row>
				<WelcomeTitle data={data} />
			</Row>
			<Row style={{ paddingBottom: "2em" }}>
				<DashboardNumber data={{ quantity: 20, type: "ACTIVE_CONTESTS" }} />
				<DashboardNumber data={{ quantity: 6, type: "DRAFT_CONTESTS" }} />
				<DashboardNumber data={{ quantity: 6, type: "CAREERS_UPLOADED" }} />
				<DashboardNumber data={{ quantity: 4, type: "USERS" }} />
			</Row>
			<Row style={{ width: "80%" }}>
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
						<Card style={{ boxShadow: "0px 7px 6px rgb(0 0 0 / 7%)" }}>
							<Row>
								<Title level={5} style={{ color: "#0262cf", marginBottom: 20 }}>
									Ultimos comentarios en que te han etiquetado
								</Title>
							</Row>
							<Row>
								<Col span={2}>
									<Avatar
										size={40}
										icon={<UserOutlined />}
										style={{ marginTop: 15 }}
									/>
								</Col>
								<Col span={22}>
									<Row justify="end">
										<Text disabled>
											Administración de Empresas II - Martín Migliore 24 de
											Abril del 2021 a las 12:15hs
										</Text>
									</Row>
									<Row>
										<Text style={{ marginTop: 10 }}>
											Martín Migliore ha <Text strong>COMENTADO</Text> al
											candidato Juan José Uriburu.
										</Text>
										<Text italic style={{ marginTop: 10 }}>
											"<Link>@Jeremías Pardella</Link> Me parece que habría que
											rechazarlo, por favor confirmar."
										</Text>
									</Row>
								</Col>
							</Row>
							<Divider />
							<Row>
								<Col span={2}>
									<Avatar
										size={40}
										icon={<UserOutlined />}
										style={{ marginTop: 20 }}
									/>
								</Col>
								<Col span={22}>
									<Row justify="end">
										<Text disabled>
											Historia Argentina - Bianca Jones 26 de Abril del 2021 a
											las 08:10hs
										</Text>
									</Row>
									<Row>
										<Text style={{ marginTop: 10 }}>
											Bianca Jones ha <Text strong>COMENTADO</Text> al candidato
											Dan Wagner.
										</Text>
										<Text italic style={{ marginTop: 10 }}>
											"Este cv me parece muy interesante, propongo hacerle un
											seguimiento especial en la clase particular.{" "}
											<Link>@Jeremías Pardella</Link>{" "}
											<Link>@Pedro Sanchez</Link> "
										</Text>
									</Row>
								</Col>
							</Row>
							<Divider />
							<Row>
								<Col offset={21}>
									<Link>Ver Todos</Link>
								</Col>
							</Row>
						</Card>
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
											<Text disabled>{lp?.subject?.name ?? noInformation}</Text>
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
	);
}
