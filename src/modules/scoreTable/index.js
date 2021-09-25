import React, { useState, useEffect } from "react";
import {
	Row,
	Typography,
	Col,
	Form,
	InputNumber,
	Modal,
	Card,
	Button,
} from "antd";
import { EditOutlined } from "@ant-design/icons";
import scoreService from "./../../services/score";
import styles from "./score.module.css";

const { Text, Title } = Typography;

export default function ScoreTable() {
	const [data, setData] = useState([]);
	const [visible, setVisible] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);

	useEffect(() => {
		async function fetchData() {
			const response = await scoreService.getScores();
			setData(response);
		}
		fetchData();
	}, []);

	const showModal = () => {
		setVisible(true);
	};

	const closeModal = () => {
		setVisible(false);
	};

	const createOrUpdate = (id) => async (values) => {
		setIsSubmitting(true);
		try {
			if (id) {
				const response = await scoreService.putScore(id, values);
				console.log("await scoreService.putScore(id, payload);");
				console.log(response);
				setData(response);
			} else {
				const response = await scoreService.postScore(values);
				console.log("await scoreService.postScore(payload);");
				console.log(response);
				setData(response);
			}
		} catch (e) {
			console.log(e);
		} finally {
			setIsSubmitting(false);
			setVisible(false);
		}
	};

	const getModalBody = (sectionData) => {
		return (
			<>
				<Form
					name="basic"
					preserve={false}
					initialValues={sectionData}
					onFinish={createOrUpdate(sectionData?._id)}
				>
					<Row style={{ justifyContent: "space-between" }}>
						<Title level={5} style={{ color: "#0262CF" }}>
							Formación Superior y Media
						</Title>
					</Row>
					<Row style={{ justifyContent: "center", maxHeight: 40 }}>
						<Col span={10}>
							<Text style={{ fontWeight: "bold" }}>Secundario</Text>
						</Col>
						<Col span={10}>
							<Form.Item label="Valor asignado" name="degreeSecondary">
								<InputNumber />
							</Form.Item>
						</Col>
					</Row>
					<Row style={{ justifyContent: "center", maxHeight: 40 }}>
						<Col span={10}>
							<Text style={{ fontWeight: "bold" }}>No Universitario</Text>
						</Col>
						<Col span={10}>
							<Form.Item label="Valor asignado" name="degreeNonUni">
								<InputNumber />
							</Form.Item>
						</Col>
					</Row>
					<Row style={{ justifyContent: "center", maxHeight: 40 }}>
						<Col span={10}>
							<Text style={{ fontWeight: "bold" }}>
								No Universitario - PostTitulo
							</Text>
						</Col>
						<Col span={10}>
							<Form.Item label="Valor asignado" name="degreeNonUniPostTitle">
								<InputNumber />
							</Form.Item>
						</Col>
					</Row>
					<Row style={{ justifyContent: "center", maxHeight: 40 }}>
						<Col span={10}>
							<Text style={{ fontWeight: "bold" }}>Grado</Text>
						</Col>
						<Col span={10}>
							<Form.Item label="Valor asignado" name="degreeGrade">
								<InputNumber />
							</Form.Item>
						</Col>
					</Row>
					<Row style={{ justifyContent: "center", maxHeight: 40 }}>
						<Col span={10}>
							<Text style={{ fontWeight: "bold" }}>
								PostGrado - Especialización
							</Text>
						</Col>
						<Col span={10}>
							<Form.Item label="Valor asignado" name="degreePostgraSpecial">
								<InputNumber />
							</Form.Item>
						</Col>
					</Row>
					<Row style={{ justifyContent: "center", maxHeight: 40 }}>
						<Col span={10}>
							<Text style={{ fontWeight: "bold" }}>PostGrado - Maestría</Text>
						</Col>
						<Col span={10}>
							<Form.Item label="Valor asignado" name="degreePostgraMaster">
								<InputNumber />
							</Form.Item>
						</Col>
					</Row>
					<Row style={{ justifyContent: "center", maxHeight: 40 }}>
						<Col span={10}>
							<Text style={{ fontWeight: "bold" }}>PostGrado - Doctorado</Text>
						</Col>
						<Col span={10}>
							<Form.Item label="Valor asignado" name="degreePostgraDoctorate">
								<InputNumber />
							</Form.Item>
						</Col>
					</Row>
					<Row>
						<Title level={5} style={{ color: "#0262CF" }}>
							Formación Complementaria
						</Title>
					</Row>
					<Row style={{ justifyContent: "center" }}>
						<Col>
							<Form.Item label="Valor asignado" name="furtherTraining">
								<InputNumber />
							</Form.Item>
						</Col>
					</Row>
					<Row>
						<Title level={5} style={{ color: "#0262CF" }}>
							Becas
						</Title>
					</Row>
					<Row style={{ justifyContent: "center" }}>
						<Col>
							<Form.Item label="Valor asignado" name="scholarship">
								<InputNumber />
							</Form.Item>
						</Col>
					</Row>
					<Row>
						<Title level={5} style={{ color: "#0262CF" }}>
							Antecedentes en Docencia
						</Title>
					</Row>
					<Row style={{ justifyContent: "center" }}>
						<Col>
							<Form.Item label="Valor asignado" name="teachingBackground">
								<InputNumber />
							</Form.Item>
						</Col>
					</Row>
					<Row>
						<Title level={5} style={{ color: "#0262CF" }}>
							Antecedentes en Gestión
						</Title>
					</Row>
					<Row style={{ justifyContent: "center" }}>
						<Col>
							<Form.Item label="Valor asignado" name="managementBackground">
								<InputNumber />
							</Form.Item>
						</Col>
					</Row>
					<Row>
						<Title level={5} style={{ color: "#0262CF" }}>
							Antecedentes en Investigación
						</Title>
					</Row>
					<Row style={{ justifyContent: "center" }}>
						<Col>
							<Form.Item label="Valor asignado" name="researchBackground">
								<InputNumber />
							</Form.Item>
						</Col>
					</Row>
					<Row>
						<Title level={5} style={{ color: "#0262CF" }}>
							Antecedentes en Formación y RRHH
						</Title>
					</Row>
					<Row style={{ justifyContent: "center" }}>
						<Col>
							<Form.Item label="Valor asignado" name="hRBackground">
								<InputNumber />
							</Form.Item>
						</Col>
					</Row>
					<Row>
						<Title level={5} style={{ color: "#0262CF" }}>
							Antecedentes en Evaluación
						</Title>
					</Row>
					<Row style={{ justifyContent: "center" }}>
						<Col>
							<Form.Item label="Valor asignado" name="evaluationBackground">
								<InputNumber />
							</Form.Item>
						</Col>
					</Row>
					<Row>
						<Title level={5} style={{ color: "#0262CF" }}>
							Antecedentes en Ciencia y Tecnología
						</Title>
					</Row>
					<Row style={{ justifyContent: "center" }}>
						<Col>
							<Form.Item label="Valor asignado" name="sTBackground">
								<InputNumber />
							</Form.Item>
						</Col>
					</Row>
					<Row>
						<Title level={5} style={{ color: "#0262CF" }}>
							Producciones Academicas
						</Title>
					</Row>
					<Row style={{ justifyContent: "center" }}>
						<Col>
							<Form.Item label="Valor asignado" name="academicProduction">
								<InputNumber />
							</Form.Item>
						</Col>
					</Row>
					<Row>
						<Title level={5} style={{ color: "#0262CF" }}>
							Premios
						</Title>
					</Row>
					<Row style={{ justifyContent: "center" }}>
						<Col>
							<Form.Item label="Valor asignado" name="award">
								<InputNumber />
							</Form.Item>
						</Col>
					</Row>
					<Row>
						<Col span={6} offset={15}>
							{!isSubmitting ? (
								<Form.Item>
									<Button
										type="primary"
										htmlType="submit"
										block
										style={{ outlineColor: "#0262cf", borderRadius: 5 }}
									>
										Guardar Cambios
									</Button>
								</Form.Item>
							) : (
								<Form.Item>
									<Button
										type="primary"
										loading
										block
										style={{ outlineColor: "#0262cf", borderRadius: 5 }}
									>
										Enviando
									</Button>
								</Form.Item>
							)}
						</Col>
					</Row>
				</Form>
			</>
		);
	};

	return (
		<React.Fragment>
			<Row justify="center">
				<Title level={3} className={styles.sectiontitle}>
					Tabla de puntaje
					<EditOutlined
						style={{ color: "#0262CF", paddingLeft: 25, fontSize: "24px" }}
						onClick={() => showModal()}
					/>
				</Title>
			</Row>
			<Row justify="center">
				<Text type="secondary" className={styles.sectionsubtitle}>
					Asigna manualmente un puntaje numérico a cada una de las categorías
					(solo los usuarios categoría administrador podrán editarlo).
				</Text>
			</Row>
			<Row justify="center">
				<Card
					style={{
						width: 800,
						margin: "0.5em",
						borderRadius: 5,
						boxShadow: "0px 7px 6px rgb(0 0 0 / 7%)",
					}}
					bodyStyle={{ padding: "20px" }}
				>
					<Row style={{ alignItems: "center" }}>
						<Col>
							<Title level={5} style={{ color: "#0262CF" }}>
								Formación Superior y Media
							</Title>
						</Col>
					</Row>
					<Row style={{ paddingLeft: "20px" }}>
						<Col span={10}>
							<Text style={{ fontWeight: "bold" }}>Secundario</Text>
						</Col>
						<Col span={14}>
							<Text style={{ color: "#666666" }}>
								Valor asignado: {data?.degreeSecondary ?? 0}
							</Text>
						</Col>
					</Row>
					<Row style={{ paddingLeft: "20px" }}>
						<Col span={10}>
							<Text style={{ fontWeight: "bold" }}>No Universitario</Text>
						</Col>
						<Col span={14}>
							<Text style={{ color: "#666666" }}>
								Valor asignado: {data?.degreeNonUni ?? 0}
							</Text>
						</Col>
					</Row>
					<Row style={{ paddingLeft: "20px" }}>
						<Col span={10}>
							<Text style={{ fontWeight: "bold" }}>
								No Universitario - PostTitulo
							</Text>
						</Col>
						<Col span={14}>
							<Text style={{ color: "#666666" }}>
								Valor asignado: {data?.degreeNonUniPostTitle ?? 0}
							</Text>
						</Col>
					</Row>
					<Row style={{ paddingLeft: "20px" }}>
						<Col span={10}>
							<Text style={{ fontWeight: "bold" }}>Grado</Text>
						</Col>
						<Col span={14}>
							<Text style={{ color: "#666666" }}>
								Valor asignado: {data?.degreeGrade ?? 0}
							</Text>
						</Col>
					</Row>
					<Row style={{ paddingLeft: "20px" }}>
						<Col span={10}>
							<Text style={{ fontWeight: "bold" }}>
								PostGrado - Especialización
							</Text>
						</Col>
						<Col span={14}>
							<Text style={{ color: "#666666" }}>
								Valor asignado: {data?.degreePostgraSpecial ?? 0}
							</Text>
						</Col>
					</Row>
					<Row style={{ paddingLeft: "20px" }}>
						<Col span={10}>
							<Text style={{ fontWeight: "bold" }}>PostGrado - Maestría</Text>
						</Col>
						<Col span={14}>
							<Text style={{ color: "#666666" }}>
								Valor asignado: {data?.degreePostgraMaster ?? 0}
							</Text>
						</Col>
					</Row>
					<Row style={{ paddingLeft: "20px" }}>
						<Col span={10}>
							<Text style={{ fontWeight: "bold" }}>PostGrado - Doctorado</Text>
						</Col>
						<Col span={14}>
							<Text style={{ color: "#666666" }}>
								Valor asignado: {data?.degreePostgraDoctorate ?? 0}
							</Text>
						</Col>
					</Row>
				</Card>
				<Card
					// id={props.data?.sectionType}
					style={{
						width: 800,
						margin: "0.5em",
						borderRadius: 5,
						boxShadow: "0px 7px 6px rgb(0 0 0 / 7%)",
					}}
					bodyStyle={{ padding: "20px" }}
				>
					<Row style={{ alignItems: "center" }}>
						<Col>
							<Title level={5} style={{ color: "#0262CF" }}>
								Formación Complementaria
							</Title>
						</Col>
					</Row>
					<Row style={{ paddingLeft: "20px" }}>
						<Col span={14}>
							<Text style={{ color: "#666666" }}>
								Valor asignado: {data?.furtherTraining ?? 0}
							</Text>
						</Col>
					</Row>
				</Card>
				<Card
					// id={props.data?.sectionType}
					style={{
						width: 800,
						margin: "0.5em",
						borderRadius: 5,
						boxShadow: "0px 7px 6px rgb(0 0 0 / 7%)",
					}}
					bodyStyle={{ padding: "20px" }}
				>
					<Row style={{ alignItems: "center" }}>
						<Col>
							<Title level={5} style={{ color: "#0262CF" }}>
								Becas
							</Title>
						</Col>
					</Row>
					<Row style={{ paddingLeft: "20px" }}>
						<Col span={14}>
							<Text style={{ color: "#666666" }}>
								Valor asignado: {data?.scholarship ?? 0}
							</Text>
						</Col>
					</Row>
				</Card>
				<Card
					// id={props.data?.sectionType}
					style={{
						width: 800,
						margin: "0.5em",
						borderRadius: 5,
						boxShadow: "0px 7px 6px rgb(0 0 0 / 7%)",
					}}
					bodyStyle={{ padding: "20px" }}
				>
					<Row style={{ alignItems: "center" }}>
						<Col>
							<Title level={5} style={{ color: "#0262CF" }}>
								Antecedentes en Docencia
							</Title>
						</Col>
					</Row>
					<Row style={{ paddingLeft: "20px" }}>
						<Col span={14}>
							<Text style={{ color: "#666666" }}>
								Valor asignado: {data?.teachingBackground ?? 0}
							</Text>
						</Col>
					</Row>
				</Card>
				<Card
					// id={props.data?.sectionType}
					style={{
						width: 800,
						margin: "0.5em",
						borderRadius: 5,
						boxShadow: "0px 7px 6px rgb(0 0 0 / 7%)",
					}}
					bodyStyle={{ padding: "20px" }}
				>
					<Row style={{ alignItems: "center" }}>
						<Col>
							<Title level={5} style={{ color: "#0262CF" }}>
								Antecedentes en Gestión
							</Title>
						</Col>
					</Row>
					<Row style={{ paddingLeft: "20px" }}>
						<Col span={14}>
							<Text style={{ color: "#666666" }}>
								Valor asignado: {data?.managementBackground ?? 0}
							</Text>
						</Col>
					</Row>
				</Card>
				<Card
					// id={props.data?.sectionType}
					style={{
						width: 800,
						margin: "0.5em",
						borderRadius: 5,
						boxShadow: "0px 7px 6px rgb(0 0 0 / 7%)",
					}}
					bodyStyle={{ padding: "20px" }}
				>
					<Row style={{ alignItems: "center" }}>
						<Col>
							<Title level={5} style={{ color: "#0262CF" }}>
								Antecedentes en Investigación
							</Title>
						</Col>
					</Row>
					<Row style={{ paddingLeft: "20px" }}>
						<Col span={14}>
							<Text style={{ color: "#666666" }}>
								Valor asignado: {data?.researchBackground ?? 0}
							</Text>
						</Col>
					</Row>
				</Card>
				<Card
					// id={props.data?.sectionType}
					style={{
						width: 800,
						margin: "0.5em",
						borderRadius: 5,
						boxShadow: "0px 7px 6px rgb(0 0 0 / 7%)",
					}}
					bodyStyle={{ padding: "20px" }}
				>
					<Row style={{ alignItems: "center" }}>
						<Col>
							<Title level={5} style={{ color: "#0262CF" }}>
								Antecedentes en Formación y RRHH
							</Title>
						</Col>
					</Row>
					<Row style={{ paddingLeft: "20px" }}>
						<Col span={14}>
							<Text style={{ color: "#666666" }}>
								Valor asignado: {data?.hRBackground ?? 0}
							</Text>
						</Col>
					</Row>
				</Card>
				<Card
					// id={props.data?.sectionType}
					style={{
						width: 800,
						margin: "0.5em",
						borderRadius: 5,
						boxShadow: "0px 7px 6px rgb(0 0 0 / 7%)",
					}}
					bodyStyle={{ padding: "20px" }}
				>
					<Row style={{ alignItems: "center" }}>
						<Col>
							<Title level={5} style={{ color: "#0262CF" }}>
								Antecedentes en Evaluación
							</Title>
						</Col>
					</Row>
					<Row style={{ paddingLeft: "20px" }}>
						<Col span={14}>
							<Text style={{ color: "#666666" }}>
								Valor asignado: {data?.evaluationBackground ?? 0}
							</Text>
						</Col>
					</Row>
				</Card>
				<Card
					// id={props.data?.sectionType}
					style={{
						width: 800,
						margin: "0.5em",
						borderRadius: 5,
						boxShadow: "0px 7px 6px rgb(0 0 0 / 7%)",
					}}
					bodyStyle={{ padding: "20px" }}
				>
					<Row style={{ alignItems: "center" }}>
						<Col>
							<Title level={5} style={{ color: "#0262CF" }}>
								Antecedentes en Ciencia y Tecnología
							</Title>
						</Col>
					</Row>
					<Row style={{ paddingLeft: "20px" }}>
						<Col span={14}>
							<Text style={{ color: "#666666" }}>
								Valor asignado: {data?.sTBackground ?? 0}
							</Text>
						</Col>
					</Row>
				</Card>
				<Card
					// id={props.data?.sectionType}
					style={{
						width: 800,
						margin: "0.5em",
						borderRadius: 5,
						boxShadow: "0px 7px 6px rgb(0 0 0 / 7%)",
					}}
					bodyStyle={{ padding: "20px" }}
				>
					<Row style={{ alignItems: "center" }}>
						<Col>
							<Title level={5} style={{ color: "#0262CF" }}>
								Producciones Academicas
							</Title>
						</Col>
					</Row>
					<Row style={{ paddingLeft: "20px" }}>
						<Col span={14}>
							<Text style={{ color: "#666666" }}>
								Valor asignado: {data?.academicProduction ?? 0}
							</Text>
						</Col>
					</Row>
				</Card>
				<Card
					// id={props.data?.sectionType}
					style={{
						width: 800,
						margin: "0.5em",
						borderRadius: 5,
						boxShadow: "0px 7px 6px rgb(0 0 0 / 7%)",
					}}
					bodyStyle={{ padding: "20px" }}
				>
					<Row style={{ alignItems: "center" }}>
						<Col>
							<Title level={5} style={{ color: "#0262CF" }}>
								Premios
							</Title>
						</Col>
					</Row>
					<Row style={{ paddingLeft: "20px" }}>
						<Col span={14}>
							<Text style={{ color: "#666666" }}>
								Valor asignado: {data?.award ?? 0}
							</Text>
						</Col>
					</Row>
				</Card>
			</Row>
			<Modal
				title={
					<Text style={{ color: "#0262CF" }}>Editar - Tabla de puntaje</Text>
				}
				visible={visible}
				onCancel={closeModal}
				footer={null}
				width={700}
			>
				{getModalBody(data)}
			</Modal>
		</React.Fragment>
	);
}
