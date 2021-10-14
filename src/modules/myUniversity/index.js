import React, { useState, useEffect } from "react";
import {
	Card,
	Row,
	Col,
	Typography,
	Button,
	Form,
	Input,
	Avatar,
	Image,
	Select,
	InputNumber,
	Divider,
	Upload,
	message,
} from "antd";
import { BankOutlined, EditOutlined } from "@ant-design/icons";
import {
	noInformation,
	provinces,
	universityTypes,
	apiBaseUrl,
	bucketBaseUrl,
} from "../../constants";
import universityService from "../../services/university";
import errorMessage from "../../utils/errorMessage";
import { toast } from "react-toastify";
import localStorage from "../../services/localStorage";
import styles from "./myuniversity.module.css";

const { Option } = Select;
const { Text, Title } = Typography;

const uploadProps = (setData, data) => ({
	name: "universityLogo",
	action: `${apiBaseUrl}/universities/logo`,
	headers: {
		Authorization: localStorage.get()?.token,
	},
	onChange(info) {
		if (info.file.status !== "uploading") {
			console.log(info.file, info.fileList);
		}
		if (info.file.status === "done") {
			setData({ ...data, logoUrl: info?.file?.response?.logoUrl });
			message.success(`${info.file.name} file uploaded successfully`);
		} else if (info.file.status === "error") {
			message.error(`${info.file.name} file upload failed.`);
		}
	},
});

export default function MyUniversity() {
	const [data, setData] = useState({});
	const [isEditing, setIsEditing] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [cities, setCities] = React.useState([]);

	useEffect(() => {
		async function fetchData() {
			const university = await universityService.getUniversityByUser();
			setData(university);
			setCities(
				provinces.filter((x) => x.name === university?.address?.province).cities
			);
		}
		fetchData();
	}, []);

	const handleProvinceChange = (value) => {
		setCities(provinces?.find((x) => x.name === value)?.cities);
	};

	const addressGenerator = (values) => {
		console.log("values");
		console.log(values);
		const address = {
			country: values.country,
			province: values.province,
			locality: values.locality,
			street: values.street,
			number: values.number,
			floor: values.floor,
			department: values.department,
			postalCode: values.postalCode,
		};
		return address;
	};

	const getUniversityType = (type) => {
		return universityTypes.find((x) => x.value === type)?.description ?? null;
	};

	const onFinish = async (values) => {
		setIsSubmitting(true);
		values.address = addressGenerator(values);
		const payload = { ...values };
		try {
			await universityService.updateUniversityByUser(payload);
			setData(values);
		} catch (e) {
			const message = errorMessage(e);
			toast.error(message);
		} finally {
			setIsSubmitting(false);
			setIsEditing(false);
		}
	};

	const onFinishFailed = (errorInfo) => {
		console.log("Failed:", errorInfo);
	};

	return (
		<React.Fragment>
			<Row justify="center">
				<Title level={3} className={styles.sectiontitle}>
					Mi Universidad
				</Title>
			</Row>
			<Row justify="center">
				<Text type="secondary" className={styles.sectionsubtitle}>
					Información pública de tu Universidad (solo usuarios administrador
					podrán editar esta información)
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
							Información Básica
						</Title>
					</Row>
					{!isEditing ? (
						<>
							<Row>
								<Col span={10}>
									<Row justify="center">
										{/* <Avatar size={100} {...(data?.logoUrl ? {src: `${bucketBaseUrl}${data.logoUrl}` } : { icon: <BankOutlined /> })} /> */}
										{data?.logoUrl ? (
											<Avatar
												size={100}
												src={<Image src={bucketBaseUrl + data.logoUrl} />}
											/>
										) : (
											<Avatar size={100} icon={<BankOutlined />} />
										)}
									</Row>
									<Row justify="center" {...{ justify: "center" }}>
										<Upload {...uploadProps(setData, data)}>
											<Button
												icon={<EditOutlined />}
												style={{ marginTop: "15px" }}
											>
												<Text type="secondary">
													Editar el logo de la universidad
												</Text>
											</Button>
										</Upload>
									</Row>
								</Col>
								<Col span={14}>
									<Row>
										<Text type="primary" className={styles.textprimary}>
											Nombre
										</Text>
									</Row>
									<Row>
										<Text type="secondary" className={styles.textsecondary}>
											{data?.name ?? noInformation}
										</Text>
									</Row>
									<Row>
										<Text type="primary" className={styles.textprimary}>
											Siglas
										</Text>
									</Row>
									<Row>
										<Text type="secondary" className={styles.textsecondary}>
											{data?.acronyms ?? noInformation}
										</Text>
									</Row>
									<Row>
										<Text type="primary" className={styles.textprimary}>
											Lugar
										</Text>
									</Row>
									<Row>
										<Text type="secondary" className={styles.textsecondary}>
											{data?.address?.province ?? noInformation} -{" "}
											{data?.address?.locality ?? noInformation}
										</Text>
									</Row>
									<Row>
										<Text type="primary" className={styles.textprimary}>
											Dirección
										</Text>
									</Row>
									<Row>
										<Text type="secondary" className={styles.textsecondary}>
											{data?.address?.street ?? noInformation} -{" "}
											{data?.address?.number ?? noInformation}
										</Text>
									</Row>
									<Row>
										<Text type="primary" className={styles.textprimary}>
											Email de contacto
										</Text>
									</Row>
									<Row>
										<Text type="secondary" className={styles.textsecondary}>
											{data?.email ?? noInformation}
										</Text>
									</Row>
									<Row>
										<Text type="primary" className={styles.textprimary}>
											Teléfono de contacto
										</Text>
									</Row>
									<Row>
										<Text type="secondary" className={styles.textsecondary}>
											{data?.phoneNumber ?? noInformation}
										</Text>
									</Row>
									<Row>
										<Text type="primary" className={styles.textprimary}>
											Sitio web
										</Text>
									</Row>
									<Row>
										<Text type="secondary" className={styles.textsecondary}>
											{data?.url ?? noInformation}
										</Text>
									</Row>
									<Row>
										<Text type="primary" className={styles.textprimary}>
											Nivel
										</Text>
									</Row>
									<Row>
										<Text type="secondary" className={styles.textsecondary}>
											{getUniversityType(data?.level) ?? noInformation}
										</Text>
									</Row>
								</Col>
							</Row>
							<Row justify="end">
								<Button
									type="primary"
									className={styles.buttonprimary}
									onClick={() => setIsEditing(true)}
								>
									Editar
								</Button>
							</Row>
						</>
					) : (
						<>
							<Form
								layout="vertical"
								name="basic"
								initialValues={{
									name: data?.name,
									acronyms: data?.acronyms,
									phoneNumber: data?.phoneNumber,
									url: data?.url,
									level: data?.level,
									email: data?.email,
									country: data?.address?.country,
									province: data?.address?.province,
									locality: data?.address?.locality,
									street: data?.address?.street,
									number: data?.address?.number,
									floor: data?.address?.floor,
									department: data?.address?.department,
									postalCode: data?.address?.postalCode,
								}}
								onFinish={onFinish}
								onFinishFailed={onFinishFailed}
							>
								<Form.Item
									label="Nombre"
									name="name"
									rules={[
										{
											required: true,
											message: "Campo obligatorio",
										},
									]}
								>
									<Input />
								</Form.Item>
								<Form.Item
									label="Siglas"
									name="acronyms"
									rules={[
										{
											required: true,
											message: "Campo obligatorio",
										},
									]}
								>
									<Input />
								</Form.Item>
								<Form.Item label="Teléfono de contacto" name="phoneNumber">
									<Input />
								</Form.Item>
								<Form.Item label="Sitio web" name="url">
									<Input />
								</Form.Item>
								<Form.Item
									label="Correo de contacto"
									name="email"
									rules={[
										{
											required: true,
											message: "Campo obligatorio",
										},
										{
											type: "email",
											message: "Ingresá un email válido",
										},
									]}
								>
									<Input />
								</Form.Item>
								<Form.Item label="Nivel" name="level">
									<Select>
										<Option key="NonUniversitary">
											Superior No universitario
										</Option>
										<Option key="Universitary">Universitario</Option>
									</Select>
								</Form.Item>
								<Divider orientation="left" className={styles.insidesubtitle}>
									Residencia
								</Divider>
								<Form.Item label="País" name="country">
									<Select
										showSearch
										placeholder="Seleccione un país"
										optionFilterProp="children"
										filterOption={(input, option) =>
											option.children
												.toLowerCase()
												.indexOf(input.toLowerCase()) >= 0
										}
									>
										<Option value="Argentina">Argentina</Option>
									</Select>
								</Form.Item>
								<Form.Item label="Provincia" name="province">
									<Select onChange={handleProvinceChange}>
										{provinces.map((x) => (
											<Option key={x.name}>{x.name}</Option>
										))}
									</Select>
								</Form.Item>
								<Form.Item label="Localidad" name="locality">
									<Select>
										{cities?.map((city) => (
											<Option key={city}>{city}</Option>
										))}
									</Select>
								</Form.Item>
								<Form.Item label="Calle" name="street">
									<Input />
								</Form.Item>
								<Form.Item label="Número" name="number">
									<InputNumber />
								</Form.Item>
								<Form.Item label="Piso" name="floor">
									<Input />
								</Form.Item>
								<Form.Item label="Departamento" name="department">
									<Input />
								</Form.Item>
								<Form.Item label="Código Postal" name="postalCode">
									<InputNumber />
								</Form.Item>
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
												<Button type="link" onClick={() => setIsEditing(false)}>
													Cancelar
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
												<Button type="link" disabled>
													Cancelar
												</Button>
											</Form.Item>
										)}
									</Col>
								</Row>
							</Form>
						</>
					)}
				</Card>
			</Row>
		</React.Fragment>
	);
}
