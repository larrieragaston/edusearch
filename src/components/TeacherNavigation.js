import React, { useState } from "react";
import { Layout, Menu } from "antd";
import {
	MoreOutlined,
	BarChartOutlined,
	ProfileOutlined,
	ContainerOutlined,
	UserOutlined,
	QuestionCircleOutlined,
	LogoutOutlined,
} from "@ant-design/icons";
import { resumeSections } from "./../constants";
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

	const scrollTo = (id) => {
		return document
			.getElementById(id)
			?.scrollIntoView({ block: "start", behavior: "smooth" });
	};

	return (
		<Sider collapsible collapsed={collapsed} className="sider-content" width={300}>
			<Menu defaultSelectedKeys={["1"]} mode="inline">
				<Menu.Item key="0" icon={<MoreOutlined />} onClick={() => setCollapsed(!collapsed)}/>
				<Menu.Item key="1" icon={<BarChartOutlined />} onClick={() => navigate("/")}>Dashboard</Menu.Item>
				<Menu.Item key="2" icon={<UserOutlined />} onClick={() => navigate("/personal-information")}>Datos Personales</Menu.Item>
				<SubMenu key="3" icon={<ProfileOutlined />} title="Mi CV" onTitleClick={() => navigate("/my-resume")}>
					{resumeSections.map((x) => (<Menu.Item key={x.key} onClick={() => scrollTo(x.value)}> {x.description} </Menu.Item>))}
				</SubMenu>
				<SubMenu key="16" icon={<ContainerOutlined />} title="Concursos">
					<Menu.Item key="17" onClick={() => navigate("/contests/all")}>Todos</Menu.Item>
					<Menu.Item key="18" onClick={() => navigate("/contests/postulations")}>Postulaciones</Menu.Item>
					<Menu.Item key="19" onClick={() => navigate("/contests/favourites")}>Favoritos</Menu.Item>
				</SubMenu>
				<Menu.Item key="20" icon={<QuestionCircleOutlined />} onClick={() => navigate("/faq")}>F.A.Q.</Menu.Item>
				<Menu.Item key="21" icon={<LogoutOutlined />} onClick={() => logout()}>Cerrar sesión</Menu.Item>
			</Menu>
		</Sider>
	);
}
