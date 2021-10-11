import React, { useState, useEffect, useContext } from "react";
import { Table, Row, Typography, Avatar, Tag } from "antd";
import userService from "./../../services/user";
import { UserContext } from "../../contexts/userContext";
import { noInformation, roles, bucketBaseUrl } from "../../constants";
import { UserOutlined } from '@ant-design/icons';

import styles from "./users.module.css";

const { Text, Title } = Typography;

const columns = [
	{
		title: "",
		dataIndex: "photo",
		key: "photo",
	},
	{
		title: "Nombre",
		dataIndex: "name",
		key: "name",
	},
	{
		title: "Email",
		dataIndex: "email",
		key: "email",
	},
	{
		title: "Rol",
		dataIndex: "role",
		key: "role",
	},
];

const profileLabels = {
    [roles.Teacher]: 'Docente',
    [roles.UAdmin]: 'Administrador',
    [roles.UCouncilMember]: 'Miembro del Consejo',
    [roles.UHumanResources]: 'Recursos Humanos',
  }

  const profileColors = {
    [roles.Teacher]: 'blue',
    [roles.UAdmin]: 'red',
    [roles.UCouncilMember]: 'lime',
    [roles.UHumanResources]: 'green',
  }

export default function Users() {
	const { userData, setUserData } = useContext(UserContext);
	const [tableData, setTableData] = useState([]);

	useEffect(() => {
		async function fetchData() {
			const response = await userService.getUsersByUniversity();
			if (response) {
				const data = response.map(function (x) {
					const key = x._id;
					const photo = <Avatar size='large' {...(x.mediaUrl ? {src: `${bucketBaseUrl}${x.mediaUrl}` } : { icon: <UserOutlined /> })} />;
					const name = x.lastName + ', ' + x.firstName;
					const email = x.email ?? noInformation;
					const role = <Tag key='4' color={profileColors[x.role]} size={64}>{profileLabels[x.role]}</Tag>;
					return { key, photo, name, email, role };
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
					Listado de Usuarios
				</Title>
			</Row>
			<Row justify="center">
				<Text type="secondary" className={styles.sectionsubtitle}>
					Información sobre los usuarios que integran el grupo de la universidad
				</Text>
			</Row>
			<Row justify="center">
				<Table dataSource={tableData} columns={columns} />
			</Row>
		</React.Fragment>
	);
}
