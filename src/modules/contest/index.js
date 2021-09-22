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

const { Text, Title } = Typography;
const { Option } = Select;

export default function Contest() {
	const [careers, setCareers] = useState([]);
	const [subjects, setSubjects] = useState([]);
	const [filteredSubjects, setFilteredSubjects] = useState([]);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [startsAt, setStartsAt] = useState(false);
	const [endsAt, setEndsAt] = useState(false);

	const { userData, setUserData } = useContext(UserContext)

	useEffect(() => {
		async function fetchData() {
			const response = await universityService.getSubjectsByUniversity(userData.university);
			setCareers(response.careers);
			setSubjects(response.subjects);
			setFilteredSubjects(response.subjects);
		}
		fetchData();
	}, [userData]);

	const handleCareerChange = (value) => {
        console.log('value')
        console.log(value)
		setFilteredSubjects(subjects?.filter((x) => x.career === value));
	};

    const onChangeStartsAt = (value) => {
        const startsAtHHMM = value.format("HH:mm");
        setStartsAt(startsAtHHMM)
    }

    const onChangeEndsAt = (value) => {
        const endsAtHHMM = value.format("HH:mm");
        setEndsAt(endsAtHHMM)
    }

	const onFinish = async (values) => {
		setIsSubmitting(true);
		const payload = { ...values, active: true, startsAt, endsAt };
		try {
			await contestService.create(payload);
		} catch (e) {
			const message = errorMessage(e);
			toast.error(message);
		} finally {
			setIsSubmitting(false);
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
					<Form
						layout="vertical"
						name="basic"
						// initialValues={{
						// 	career: data?.career?.name,
						// 	subject: data?.subject?.name,
						// 	day: data?.day,
						// 	startsAt: data?.startsAt,
						// 	endsAt: data?.endsAt,
						// 	dueDate: data?.dueDate,
						// 	hasColloquium: data?.hasColloquium ?? false,
						// 	showResultsScore: data?.showResultsScore ?? false,
						// }}
						onFinish={onFinish}
						onFinishFailed={onFinishFailed}
					>
						<Form.Item label="Carrera" name="career">
							<Select
								showSearch
								placeholder="Seleccione una carrera"
								optionFilterProp="children"
								filterOption={(input, option) =>
									option.children.toLowerCase().indexOf(input.toLowerCase()) >=
									0
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
									option.children.toLowerCase().indexOf(input.toLowerCase()) >=
									0
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
							<TimePicker onChange={onChangeStartsAt} showTime={{ format: 'HH:mm' }}/>
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
							<TimePicker onChange={onChangeEndsAt} showTime={{ format: 'HH:mm' }}/>
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
							<DatePicker />
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
								<Button type="primary" htmlType="submit" block>
									Publicar
								</Button>
								{/* <Button type="link" onClick={() => setIsEditing(false)}>
									Guardar como Borrador
								</Button> */}
							</Form.Item>
						) : (
							<Form.Item>
								<Button type="primary" loading block>
									Enviando
								</Button>
								{/* <Button type="link" disabled>
									Cancelar
								</Button> */}
							</Form.Item>
						)}
					</Form>
				</Card>
			</Row>
		</React.Fragment>
	);
}
