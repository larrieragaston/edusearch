import React, { useState, useMemo, useContext } from 'react'
import './mainLayout.css';
import { navigate } from '@reach/router'
import logoSrc from '../../assets/logo.png'
import { Layout, Menu, Avatar, Button, Popover, PageHeader, Tag } from 'antd';
import { MoreOutlined, BarChartOutlined, ProfileOutlined, ContainerOutlined, UserOutlined, InfoCircleOutlined, BellOutlined, QuestionCircleOutlined, LogoutOutlined } from '@ant-design/icons';
import { UserContext } from '../../contexts/userContext';
import userService from '../../services/user';
import localStorage from '../../services/localStorage'
import { resumeSections } from '../../constants'
import styles from './mainLayout.css'

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

export default function MainLayout(props) {
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
            // navigate('/dashboard')
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

    const scrollTo = (id) => {
        return document.getElementById(id)?.scrollIntoView({ block: 'start', behavior: 'smooth' })
    }

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider collapsible collapsed={collapsed} className="sider-content" width={280}>
                <Menu defaultSelectedKeys={['1']} mode="inline">
                    <Menu.Item key="0" icon={<MoreOutlined />} onClick={() => setCollapsed(!collapsed)} />
                    <Menu.Item key="1" icon={<BarChartOutlined />} onClick={() => navigate('/')}>
                        Dashboard
                    </Menu.Item>
                    <Menu.Item key="2" icon={<UserOutlined />} onClick={() => navigate('/personal-information')}>
                        Datos Personales
                    </Menu.Item>
                    <SubMenu key="3" icon={<ProfileOutlined />} title="Mi CV" onTitleClick={() => navigate('/my-resume')}>
                        <Menu.Item key="4" onClick={() => scrollTo(resumeSections.Degree)}>Formación Superior y Media</Menu.Item>
                        <Menu.Item key="5" onClick={() => scrollTo(resumeSections.FurtherTraining)}>Formación Complementaria</Menu.Item>
                        <Menu.Item key="6" onClick={() => scrollTo(resumeSections.Scholarship)}>Becas</Menu.Item>
                        <Menu.Item key="7" onClick={() => scrollTo(resumeSections.TeachingBackground)}>Antecedentes en Docencia</Menu.Item>
                        <Menu.Item key="8" onClick={() => scrollTo(resumeSections.ManagementBackground)}>Antecedentes en Gestión</Menu.Item>
                        <Menu.Item key="9" onClick={() => scrollTo(resumeSections.ResearchBackground)}>Antecedentes en Investigación</Menu.Item>
                        <Menu.Item key="10" onClick={() => scrollTo(resumeSections.HRBackground)}>Antecedentes en Formación y RRHH</Menu.Item>
                        <Menu.Item key="11" onClick={() => scrollTo(resumeSections.EvaluationBackground)}>Antecedentes en Evaluación</Menu.Item>
                        <Menu.Item key="12" onClick={() => scrollTo(resumeSections.STBackground)}>Antecedentes en Ciencia y Tecnología</Menu.Item>
                        <Menu.Item key="13" onClick={() => scrollTo(resumeSections.AcademicProduction)}>Producciones Académicas</Menu.Item>
                        <Menu.Item key="14" onClick={() => scrollTo(resumeSections.Award)}>Premios</Menu.Item>
                        <Menu.Item key="15" onClick={() => scrollTo(resumeSections.Other)}>Otros Antecedentes Docentes</Menu.Item>
                    </SubMenu>
                    <SubMenu key="16" icon={<ContainerOutlined />} title="Concursos">
                        <Menu.Item key="17" onClick={() => navigate('/contests/all')}>Todos</Menu.Item>
                        <Menu.Item key="18" onClick={() => navigate('/contests/postulations')}>Postulaciones</Menu.Item>
                        <Menu.Item key="19" onClick={() => navigate('/contests/favourites')}>Favoritos</Menu.Item>
                    </SubMenu>
                    <Menu.Item key="20" icon={<QuestionCircleOutlined />} onClick={() => navigate('/faq')}>
                        F.A.Q.
                    </Menu.Item>
                    <Menu.Item key="21" icon={<LogoutOutlined />} onClick={() => logout()}>
                        Cerrar sesión
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout className="site-layout" style={{ backgroundColor: '#F9F9F9' }}>
                <Header className="site-layout-background" style={{ padding: '0', alignItems: 'center' }}>
                    <PageHeader
                        ghost={false}
                        title={<img alt={"logo-EduSearch"} src={logoSrc} />}
                        extra={[
                            <Tag key='4' color="blue">Docente</Tag>,
                            <Button key="3" shape='circle' size='large' icon={<InfoCircleOutlined />} />,
                            <Button key="2" shape='circle' size='large' icon={<BellOutlined />} />,
                            <Popover key="1" placement="bottomRight" content={content}>
                                <Avatar size='large' icon={<UserOutlined />} />
                            </Popover>,
                        ]}
                    ></PageHeader>
                </Header>
                <Content style={{ margin: '0 16px' }}>
                    <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                        {props.children}
                    </div>
                </Content>
            </Layout>
        </Layout>
    )
}

