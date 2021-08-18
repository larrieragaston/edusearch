import React, { useState, useMemo, useContext } from 'react'
import './mainLayout.css';
import { navigate } from '@reach/router'
import logoSrc from '../../assets/logo.png'
import { Layout, Menu, Avatar, Button, Popover, PageHeader, Tag } from 'antd';
import { MoreOutlined, BarChartOutlined, ProfileOutlined, ContainerOutlined, UserOutlined, InfoCircleOutlined, BellOutlined, QuestionCircleOutlined, LogoutOutlined } from '@ant-design/icons';
import { UserContext } from '../../contexts/userContext';
import userService from '../../services/user';
import localStorage from '../../services/localStorage'
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
                    <SubMenu key="sub1" icon={<ProfileOutlined />} title="Mi CV" onTitleClick={() => navigate('/my-resume')}>
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
                    <SubMenu key="sub2" icon={<ContainerOutlined />} title="Concursos">
                        <Menu.Item key="13" onClick={() => navigate('/contests/all')}>Todos</Menu.Item>
                        <Menu.Item key="14" onClick={() => navigate('/contests/postulations')}>Postulaciones</Menu.Item>
                        <Menu.Item key="15" onClick={() => navigate('/contests/favourites')}>Favoritos</Menu.Item>
                    </SubMenu>
                    <Menu.Item key="16" icon={<QuestionCircleOutlined />} onClick={() => navigate('/faq')}>
                        F.A.Q.
                    </Menu.Item>
                    <Menu.Item key="17" icon={<LogoutOutlined />} onClick={() => logout()}>
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

