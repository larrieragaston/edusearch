import React, { useState, useMemo, useContext } from 'react'
import './mainLayout.css';
import { navigate, Router } from '@reach/router'
import logoSrc from '../../assets/logo.png'
import { Layout, Menu, Avatar, Button, Popover } from 'antd';
import { MoreOutlined, BarChartOutlined, ProfileOutlined, ContainerOutlined, UserOutlined, InfoCircleOutlined, BellOutlined, QuestionCircleOutlined, LogoutOutlined } from '@ant-design/icons';
import Home from '../home'
import AccountSettings from '../accountSettings'
import ContestDetails from '../contestDetails'
import Contests from '../contests'
import PersonalInformation from '../personalInformation'
import ProfessionalInformation from '../professionalInformation'
import { UserContext } from '../../contexts/userContext';
import userService from '../../services/user';
import localStorage from '../../services/localStorage'
import FAQ from '../faq';

const { Header, Content, Sider } = Layout;
const { SubMenu } = Menu;
const fullHeight = { height: '100%' }

// const navigationByRole = {
//     [roles.Teacher]: teacherNavigation,
//     [roles.UAdmin]: universityNavigation,
//     [roles.UCouncilMember]: universityNavigation,
//     [roles.UHumanResources]: universityNavigation,
//   }

//   const adminNavigation = [
//     { title: 'Inicio', url: '' },
//     { title: 'Noticias', url: 'news-list' },
//     { title: 'Perfil', url: 'edit-user' },
//     { title: 'Usuarios', url: 'user-list' },
//   ]

export default function MainLayout() {
    const [collapsed, setCollapsed] = useState(false)
    const { userData, setUserData } = useContext(UserContext)

    useMemo(async () => {
        const data = localStorage.get()
        if (!data?.token) {
            navigate('/login')
        }
        else {
            // setNavigation(navigationByRole[data?.user?.role])
            const response = await userService.getUserByToken()
            setUserData(response)
        }
    }, [])

    const logout = () => {
        localStorage.delete()
        navigate('/login')
    }

    const content = (
        <div style={{ maxWidth: 200 }}>
            <Button type="text" block onClick={() => navigate('/personal-information')}>Datos personales</Button>
            {/* <Button type="text" block>Mi CV</Button> */}
            <Button type="text" block onClick={() => navigate('/acccount-settings')}>Configuración de la cuenta</Button>
            <Button type="text" block onClick={() => logout()}>Cerrar sesión</Button>
        </div>
    );

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider collapsible collapsed={collapsed} className="sider-content" width={280}>
                <Menu defaultSelectedKeys={['1']} mode="inline">
                    <Menu.Item key="0" icon={<MoreOutlined />} onClick={() => setCollapsed(!collapsed)} />
                    <Menu.Item key="1" icon={<BarChartOutlined />} onClick={() => navigate('/dashboard')}>
                        Dashboard
                    </Menu.Item>
                    <Menu.Item key="2" icon={<UserOutlined />} onClick={() => navigate('/personal-information')}>
                        Datos Personales
                    </Menu.Item>
                    <SubMenu key="sub1" icon={<ProfileOutlined />} title="Mi CV" onTitleClick={() => navigate('/professional-information')}>
                        <Menu.Item key="3">Formación Superior y Media</Menu.Item>
                        <Menu.Item key="4">Formación Complementaria</Menu.Item>
                        <Menu.Item key="5">Becas</Menu.Item>
                        <Menu.Item key="6">Formación Auitodidacta</Menu.Item>
                        <Menu.Item key="7">Antecedentes en Docencia</Menu.Item>
                        <Menu.Item key="8">Antecedentes en Gestión</Menu.Item>
                        <Menu.Item key="9">Otros Antecedentes Docentes</Menu.Item>
                        <Menu.Item key="10">Antecedentes Profesionales</Menu.Item>
                        <Menu.Item key="11">Producciones Académicas</Menu.Item>
                        <Menu.Item key="12">Premios</Menu.Item>
                    </SubMenu>
                    <SubMenu key="sub2" icon={<ContainerOutlined />} title="Concursos" onTitleClick={() => navigate('/contests')}>
                        <Menu.Item key="13">Todos</Menu.Item>
                        <Menu.Item key="14">Postulaciones</Menu.Item>
                        <Menu.Item key="15">Favoritos</Menu.Item>
                    </SubMenu>
                    <Menu.Item key="16" icon={<QuestionCircleOutlined />} onClick={() => navigate('/faq')}>
                        F.A.Q.
                    </Menu.Item>
                    <Menu.Item key="17" icon={<LogoutOutlined />} onClick={() => logout()}>
                        Cerrar sesión
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout className="site-layout">
                <Header className="site-layout-background" style={{ padding: 0 }}>
                    <Menu mode="horizontal">
                        <Menu.Item key="1" disabled><img alt={"logo-EduSearch"} src={logoSrc} /></Menu.Item>
                        <Menu.Item key="2" disabled><Button type="primary" disabled>Docente</Button></Menu.Item>
                        <Menu.Item key="3" icon={<InfoCircleOutlined style={{ fontSize: 20 }} />} />
                        <Menu.Item key="4" icon={<BellOutlined style={{ fontSize: 20 }} />} />
                        <Menu.Item key="5" >
                            <Popover placement="bottomRight" content={content}>
                                <Avatar icon={<UserOutlined />} />
                            </Popover>
                        </Menu.Item>
                    </Menu>
                </Header>
                <Content style={{ margin: '0 16px' }}>
                    <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                        <Router style={fullHeight}>
                            <Home path="/dashboard" />
                            <AccountSettings path="/acccount-settings" />
                            <PersonalInformation path="/personal-information" />
                            <ProfessionalInformation path="/professional-information" />
                            <Contests path="/contests-all" />
                            <ContestDetails path="/contest/:id" />
                            <FAQ path="/faq" />
                        </Router>
                    </div>
                </Content>
            </Layout>
        </Layout>
    )
}

