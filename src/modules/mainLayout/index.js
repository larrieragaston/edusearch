import React, { useState, useMemo, useContext } from 'react'
import './mainLayout.css';
import { navigate } from '@reach/router'
import logoSrc from '../../assets/logo.png'
import { Layout, Menu, Avatar, Button, Popover, PageHeader, Tag } from 'antd';
import { MoreOutlined, BarChartOutlined, ProfileOutlined, ContainerOutlined, UserOutlined, InfoCircleOutlined, BellOutlined, QuestionCircleOutlined, LogoutOutlined } from '@ant-design/icons';
import { UserContext } from '../../contexts/userContext';
import userService from '../../services/user';
import localStorage from '../../services/localStorage'
import { resumeSections } from './../../constants';
import styles from './mainLayout.css'

const { Header, Content, Sider } = Layout;
const { SubMenu } = Menu;

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
        <div style={{ maxWidth: 150 }}>
            <Button type="text" block onClick={() => navigate('/personal-information')}>Datos Personales</Button>
            {/* <Button type="text" block>Mi CV</Button> */}
            <Button type="text" block onClick={() => navigate('/acccount-settings')}>Mi Cuenta</Button>
            <Button type="text" block onClick={() => logout()}>Cerrar sesión</Button>
        </div>
    );

    const scrollTo = (id) => {
        return document.getElementById(id)?.scrollIntoView({ block: 'start', behavior: 'smooth' })
    }

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider collapsible collapsed={collapsed} className="sider-content" width={300}>
                <Menu defaultSelectedKeys={['1']} mode="inline">
                    <Menu.Item key="0" icon={<MoreOutlined />} onClick={() => setCollapsed(!collapsed)} />
                    <Menu.Item key="1" icon={<BarChartOutlined />} onClick={() => navigate('/')}>
                        Dashboard
                    </Menu.Item>
                    <Menu.Item key="2" icon={<UserOutlined />} onClick={() => navigate('/personal-information')}>
                        Datos Personales
                    </Menu.Item>
                    <SubMenu key="3" icon={<ProfileOutlined />} title="Mi CV" onTitleClick={() => navigate('/my-resume')}>
                        {resumeSections.map(x => <Menu.Item key={x.key} onClick={() => scrollTo(x.value)}>{x.description}</Menu.Item>)}
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

