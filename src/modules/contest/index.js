import React, { useState, useEffect, useContext } from "react";
import {
	Card,
	Row,
	Typography,
	Button,
	Form,
	Checkbox,
	DatePicker,
	Select,
	Radio,
	TimePicker,
} from "antd";
import { days } from "../../constants";
import errorMessage from "../../utils/errorMessage";
import { toast } from "react-toastify";
import styles from "./contest.module.css";
import contestService from "./../../services/contest";
import universityService from "../../services/university";
import { UserContext } from "../../contexts/userContext";
import moment from "moment";
import { navigate } from "@reach/router";

const { Text, Title } = Typography;
const { Option } = Select;

export default function Contest(props) {
	const [careers, setCareers] = useState([]);
	const [subjects, setSubjects] = useState([]);
	const [filteredSubjects, setFilteredSubjects] = useState([]);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [isDraft, setIsDraft] = useState(false);
	const [startsAt, setStartsAt] = useState(false);
	const [endsAt, setEndsAt] = useState(false);
	const [initValues, setInitValues] = useState({});
	const [isLoading, setIsLoading] = useState(true);
	const { userData, setUserData } = useContext(UserContext);

	useEffect(() => {
		async function fetchData() {
			setIsLoading(true);
			const response = await universityService.getSubjectsByUniversity(
				userData.university
			);
			let initialValues = null;
			if (props.id) {
				const contest = await contestService.getContestById(props.id);
				initialValues = {
					career: contest?.career?._id,
					subject: contest?.subject?._id,
					day: contest?.day,
					startsAt: moment(contest?.startsAt, "HH:mm"),
					endsAt: moment(contest?.endsAt, "HH:mm"),
					dueDate: moment(contest?.dueDate, "YYYY-MM-DDT00:00:00.000+00:00"),
					hasColloquium: contest?.hasColloquium ?? false,
					showResultsScore: contest?.showResultsScore ?? false,
				};
				onChangeStartsAt(initialValues?.startsAt)
				onChangeEndsAt(initialValues?.endsAt)
			}
			setInitValues(initialValues);
			setCareers(response.careers);
			setSubjects(response.subjects);
			setFilteredSubjects(response.subjects);
			setIsLoading(false);
		}
		fetchData();
	}, [userData]);

	const handleCareerChange = (value) => {
		console.log("value");
		console.log(value);
		setFilteredSubjects(subjects?.filter((x) => x.career === value));
	};

	const onChangeStartsAt = (value) => {
		const startsAtHHMM = value.format("HH:mm");
		setStartsAt(startsAtHHMM);
	};

	const onChangeEndsAt = (value) => {
		const endsAtHHMM = value.format("HH:mm");
		setEndsAt(endsAtHHMM);
	};

	const onFinish = async (values) => {
		setIsSubmitting(true);
		const staticRequeriments = [
			{ name: 'Acá enlistas los requisitos del docente', optional: false },
			{ name: 'Como cinco o seis cosas.', optional: false },
			{ name: 'Asi se veria algo que no cumple', optional: true },
			{ name: 'Y que evidentemente queden cinco ítems.', optional: false },
			{ name: 'Con un interlineado más grande', optional: true },
			{ name: 'Que los textos normales.', optional: false }]
		const payload = { ...values, isDraft: isDraft, startsAt, endsAt, isClosed: false, requirements: staticRequeriments };
		console.log(payload);
		try {
			if(props?.id){
				await contestService.edit(props.id, payload);
			}else {
				await contestService.create(payload);
			}
		} catch (e) {
			const message = errorMessage(e);
			toast.error(message);
		} finally {
			setIsSubmitting(false);
			isDraft ? navigate("/contests/drafts") : navigate("/contests/actives")
		}
	};

	const onFinishFailed = (errorInfo) => {
		console.log("Failed:", errorInfo);
	};

	return (
		<React.Fragment>
			<Row justify="center">
				<Title level={3} className={styles.sectiontitle}>
					Crear Concurso
				</Title>
			</Row>
			<Row justify="center">
				<Text type="secondary" className={styles.sectionsubtitle}>
					Crea un concurso nuevo, puedes guardarlo como borrador o abrir la
					postulación ahora
				</Text>
			</Row>
			<Row justify="center">
				<Card
					style={{ width: "80%" }}
					bodyStyle={{
						padding: "15px 35px",
						borderRadius: "5px",
						boxShadow: "0px 7px 6px rgb(0 0 0 / 7%)",
					}}
				>
					<Row>
						<Title level={5} className={styles.insidetitle}>
							Concurso Nuevo
						</Title>
					</Row>
					{!isLoading ? (
						<Form
							layout="vertical"
							name="basic"
							initialValues={{ ...initValues }}
							onFinish={onFinish}
							onFinishFailed={onFinishFailed}
						>
							<Form.Item label="Carrera" name="career">
								<Select
									showSearch
									placeholder="Seleccione una carrera"
									optionFilterProp="children"
									filterOption={(input, option) =>
										option.children
											.toLowerCase()
											.indexOf(input.toLowerCase()) >= 0
									}
									onChange={handleCareerChange}
								>
									{careers?.map((x) => (
										<Option value={x._id}>{x.name}</Option>
									))}
								</Select>
							</Form.Item>
							<Form.Item label="Materia" name="subject">
								<Select
									showSearch
									placeholder="Seleccione una materia"
									optionFilterProp="children"
									filterOption={(input, option) =>
										option.children
											.toLowerCase()
											.indexOf(input.toLowerCase()) >= 0
									}
								>
									{filteredSubjects?.map((x) => (
										<Option value={x._id}>{x.name}</Option>
									))}
								</Select>
							</Form.Item>

							<Form.Item
								label="Día de cursada"
								name="day"
								rules={[
									{
										required: true,
										message: "Campo obligatorio",
									},
								]}
							>
								<Radio.Group>
									{days.map((x) => (
										<Radio value={x}>{x}</Radio>
									))}
								</Radio.Group>
							</Form.Item>
							<Form.Item
								label="Horario Desde"
								name="startsAt"
								rules={[
									{
										required: true,
										message: "Campo obligatorio",
									},
								]}
							>
								<TimePicker
									onChange={onChangeStartsAt}
									showTime={{ format: "HH:mm" }}
								/>
							</Form.Item>
							<Form.Item
								label="Horario Hasta"
								name="endsAt"
								rules={[
									{
										required: true,
										message: "Campo obligatorio",
									},
								]}
							>
								<TimePicker
									onChange={onChangeEndsAt}
									showTime={{ format: "HH:mm" }}
								/>
							</Form.Item>
							<Form.Item
								label="Fecha de finalización de postulaciones"
								name="dueDate"
								rules={[
									{
										required: true,
										message: "Campo obligatorio",
									},
								]}
							>
								<DatePicker format="DD-MM-YYYY" />
							</Form.Item>
							<Form.Item name="hasColloquium" valuePropName="checked">
								<Checkbox>Posee etapa de microclase</Checkbox>
							</Form.Item>
							<Text>Publicación de resultados</Text>
							<Checkbox disabled checked={true}>
								Mostrar orden de mérito
							</Checkbox>
							<Form.Item name="showResultsScore" valuePropName="checked">
								<Checkbox>Mostrar resultado con puntaje</Checkbox>
							</Form.Item>
							{!isSubmitting ? (
								<Form.Item>
									<Button
										type="link"
										onClick={() => setIsDraft(true)}
										htmlType="submit"
										block
									>
										Guardar como Borrador
									</Button>
									<Button type="primary" htmlType="submit" block>
										Publicar
									</Button>
								</Form.Item>
							) : (
								<Form.Item>
									<Button type="primary" loading block>
										Enviando
									</Button>
								</Form.Item>
							)}
						</Form>
					) : (
						<></>
					)}
				</Card>
			</Row>
		</React.Fragment>
	);
}
