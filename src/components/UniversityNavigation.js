import React, { useState } from "react";
import { Layout, Menu } from "antd";
import {
	MoreOutlined,
	BarChartOutlined,
	PlusOutlined,
	ContainerOutlined,
	ApartmentOutlined,
	QuestionCircleOutlined,
	LogoutOutlined,
} from "@ant-design/icons";
import { navigate } from "@reach/router";
import localStorage from "../services/localStorage";

const { Sider } = Layout;
const { SubMenu } = Menu;

export default function TeacherNavigation() {
	const [collapsed, setCollapsed] = useState(false);

	const logout = () => {
		localStorage.delete();
		navigate("/login");
	};

	return (
		<Sider collapsible collapsed={collapsed} className="sider-content" width={300}>
			<Menu defaultSelectedKeys={["1"]} mode="inline">
				<Menu.Item key="0" icon={<MoreOutlined />} onClick={() => setCollapsed(!collapsed)}/>
				<Menu.Item key="1" icon={<BarChartOutlined />} onClick={() => navigate("/")}>Dashboard</Menu.Item>
				<Menu.Item key="2" icon={<PlusOutlined />} onClick={() => navigate("/contest/create")}>Crear Concurso</Menu.Item>
				<SubMenu key="3" icon={<ApartmentOutlined />} title="Universidad">
					<Menu.Item key="4" onClick={() => navigate("/my-university")}>Mi Universidad</Menu.Item>
					<Menu.Item key="5" onClick={() => navigate("/score-table")}>Tabla de Puntajes</Menu.Item>
					<Menu.Item key="6" onClick={() => navigate("/careers")}>Carreras</Menu.Item>
					<Menu.Item key="7" onClick={() => navigate("/users")}>Usuarios</Menu.Item>
				</SubMenu>
				<SubMenu key="8" icon={<ContainerOutlined />} title="Concursos">
					<Menu.Item key="9" onClick={() => navigate("/contests/drafts")}>Borradores</Menu.Item>
					<Menu.Item key="10" onClick={() => navigate("/contests/actives")}>Activos</Menu.Item>
					<Menu.Item key="11" onClick={() => navigate("/contests/ended")}>Finalizados</Menu.Item>
				</SubMenu>
				<Menu.Item key="12" icon={<QuestionCircleOutlined />} onClick={() => navigate("/faq")}>F.A.Q.</Menu.Item>
				<Menu.Item key="13" icon={<LogoutOutlined />} onClick={() => logout()}>Cerrar sesión</Menu.Item>
			</Menu>
		</Sider>
	);
}
