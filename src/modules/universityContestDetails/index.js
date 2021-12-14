import React, { useEffect, useState } from "react";
import {
	Row,
	Col,
	Typography,
	Button,
	Divider,
	Table,
	Steps,
	Modal,
	Spin,
} from "antd";
import noLogo from "../../assets/noLogo.jpg";
import {
	ClockCircleOutlined,
	CalendarOutlined,
	ApartmentOutlined,
	LoadingOutlined
} from "@ant-design/icons";
import {
	contestSteps,
	noInformation,
	periodTypes,
	bucketBaseUrl,
} from "../../constants";
import contestService from "../../services/contest";
import moment from "moment";

const { Text } = Typography;
const { Step } = Steps;

const columns = [
	{
		title: "#",
		dataIndex: "number",
		key: "number",
	},
	{
		title: "Nombre",
		dataIndex: "name",
		key: "name",
		align: "center",
		width: 250,
	},
	{
		title: "Email",
		dataIndex: "email",
		key: "email",
		align: "center",
		width: 400,
	},
	{
		title: "Teléfono",
		dataIndex: "phone",
		key: "phone",
		align: "center",
		width: 200,
	},
	{
		title: "Puntaje",
		dataIndex: "score",
		key: "score",
		align: "center",
		width: 120,
	},
];

export default function UniversityContestDetails(props) {
	const [data, setData] = useState({});
	const [activeStage, setActiveStage] = useState(data?.activeStage);
	const [postulations, setPostulations] = useState(data?.activeStage);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		async function fetchData() {
			setIsLoading(true);
			const contest = await contestService.getContestById(props.id);
			const postulationsByContest =
				await contestService.getPostulationsByContest(props.id);
			setData(contest);
			setActiveStage(contest.activeStage);
			const dataTable = postulationsByContest.map(function (x, i) {
				const key = x._id;
				const number = i + 1;
				const name = x.user.lastName + ", " + x.user.firstName;
				const email = x.user.email ?? noInformation;
				const phone = x.user.mobilePhone ?? noInformation;
				const score = x.postulationScore ?? "-";
				return { key, number, name, email, phone, score };
			});
			setPostulations(dataTable);
			setIsLoading(false);
		}
		fetchData();
	}, [props.id]);

	const getPeriodType = (type) => {
		return periodTypes.find((x) => x.value === type)?.description ?? null;
	};

	const getSteps = (hasColloquium) => {
		if (!hasColloquium)
			return contestSteps
				.filter((x) => x !== "Coloquio")
				.map((x) => <Step key={x} title={x} />);
		else return contestSteps.map((x) => <Step key={x} title={x} />);
	};

	const getDaysDifferenceText = (date) => {
		const dateMoment = moment(date, "YYYY-MM-DDT00:00:00.000+00:00");
		const today = moment();
		const diffDays = dateMoment.diff(today, "days");
		return diffDays < 0
			? `Las postulaciones ya se encuentran cerradas`
			: `Quedan ${diffDays} días para que se cierren las postulaciones`;
	};

	function error() {
		Modal.error({
			title: "Ups!",
			content: "No se ha podido avanzar de etapa",
		});
	}

	const nextStage = async (contestId, isAlmostClose) => {
		try {
			if (isAlmostClose) await contestService.closeContest(contestId);
			else await contestService.nextStage(contestId);
			setActiveStage(activeStage + 1);
		} catch (e) {
			console.log(e);
			error();
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
			) : (
				<React.Fragment>
					<Row style={{ paddingTop: "2em", paddingLeft: "1em" }}>
						<Col span={12}>
							<Row style={{ alignItems: "center" }}>
								<Text style={{ fontSize: "26px" }}>
									{data.subject?.name ?? noInformation}
								</Text>
							</Row>
							<Row
								style={{
									fontStyle: "italic",
									fontSize: "14px",
									paddingBottom: "0.7em",
								}}
							>
								{data.dueDate ? (
									<Text>{getDaysDifferenceText(data.dueDate)}</Text>
								) : (
									<Text>
										No se ha establecido fecha para el cierre de postulaciones
									</Text>
								)}
							</Row>
						</Col>
						<Col span={10}>
							<Row justify="end">
								<img
									height={50}
									alt={"logo-universidad"}
									src={
										data.university?.logoUrl != null
											? `${bucketBaseUrl}${data.university.logoUrl}`
											: noLogo
									}
								/>
							</Row>
						</Col>
						<Col span={12}>
							<Row style={{ alignItems: "center" }}>
								<ClockCircleOutlined
									style={{
										color: "#0262CF",
										paddingLeft: "0.3em",
										paddingRight: "0.5em",
									}}
								/>
								<Text>
									{data.day ?? noInformation} -{" "}
									{data.startsAt || data.endsAt
										? data.startsAt + "hs a " + data.endsAt + "hs"
										: noInformation}
								</Text>
							</Row>
							<Row>
								<CalendarOutlined
									style={{
										color: "#0262CF",
										paddingLeft: "0.3em",
										paddingRight: "0.5em",
									}}
								/>
								<Text>
									Periodo{" "}
									{getPeriodType(data?.subject?.periodType) ?? noInformation}
								</Text>
							</Row>
							<Row>
								<ApartmentOutlined
									style={{
										color: "#0262CF",
										paddingLeft: "0.3em",
										paddingRight: "0.5em",
									}}
								/>
								<Text>{data.university?.name ?? noInformation}</Text>
							</Row>
						</Col>

						<Col span={10} style={{ alignSelf: "flex-end" }}>
							<Row justify="end">
								{activeStage === 6 ||
								(activeStage === 5 && !data.hasColloquium) ? (
									<Button type="primary" disabled>
										Concurso Finalizado
									</Button>
								) : activeStage === 5 ||
								  (activeStage === 4 && !data.hasColloquium) ? (
									<Button
										type="primary"
										onClick={() => nextStage(data._id, true)}
									>
										Finalizar Concurso
									</Button>
								) : (
									<Button type="primary" onClick={() => nextStage(data._id)}>
										Avanzar Etapa
									</Button>
								)}
							</Row>
						</Col>
					</Row>
					<Divider />
					<Row>
						<Text
							style={{
								color: "#0262CF",
								fontSize: "26px",
								paddingBottom: "1.5em",
							}}
						>
							Etapa activa del Concurso
						</Text>
						<Steps progressDot current={activeStage ?? 0}>
							{getSteps(data.hasColloquium)}
						</Steps>
					</Row>
					<Divider />

					<Row>
						<Text
							style={{
								color: "#0262CF",
								fontSize: "26px",
								paddingBottom: "1.5em",
							}}
						>
							Resultados
						</Text>
					</Row>
					<Row justify="center">
						<Table dataSource={postulations} columns={columns} size="middle" />
					</Row>
				</React.Fragment>
			)}
		</>
	);
}
