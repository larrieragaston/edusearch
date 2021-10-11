import React, { useState, useEffect, useContext } from "react";
import { Table, Button, Row, Typography } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import subjectService from "./../../services/subject";
import { UserContext } from "../../contexts/userContext";
import { noInformation, periodTypes } from "../../constants";
import styles from "./careers.module.css";

const { Text, Title } = Typography;

const columns = [
	{
		title: "Carrera",
		dataIndex: "career",
		key: "career",
	},
	{
		title: "Materia",
		dataIndex: "subject",
		key: "subject",
	},
	{
		title: "Periodo",
		dataIndex: "periodType",
		key: "periodType",
	},
	{
		title: "Programa",
		dataIndex: "curriculum",
		key: "curriculum",
	},
];

const getPeriodType = (type) => {
	return periodTypes.find((x) => x.value === type)?.description ?? null;
};

export default function Careers() {
	const { userData, setUserData } = useContext(UserContext);
	const [tableData, setTableData] = useState([]);

	useEffect(() => {
		async function fetchData() {
			const response = await subjectService.getSubjectsByUniversity();
			if (response) {
				const data = response.map(function (x) {
					const key = x._id;
					const career = x.career?.name ?? noInformation;
					const subject = x.name ?? noInformation;
					const periodType = getPeriodType(x.periodType) ?? noInformation;
					const curriculum = (
						<Button
							type="primary"
							shape="round"
							icon={<DownloadOutlined />}
							href=""
							download="Programa"
							disabled={x.curriculum ? false : true}
							size={10}
						>
							Descargar Programa
						</Button>
					);
					return { key, career, subject, periodType, curriculum };
				});
				setTableData(data);
			}
		}
		fetchData();
	}, [userData]);

	return (
		<React.Fragment>
			<Row justify="center">
				<Title level={3} className={styles.sectiontitle}>
					Listado de Materias
				</Title>
			</Row>
			<Row justify="center">
				<Text type="secondary" className={styles.sectionsubtitle}>
					Información sobre las carreras y materias de la universidad
				</Text>
			</Row>
			<Row justify="center">
				<Table dataSource={tableData} columns={columns} />
			</Row>
		</React.Fragment>
	);
}
