import React, { useEffect, useState, useContext } from 'react'
import logoSrc from '../../assets/logo.png'
import { Layout, Menu, Avatar, Button, Popover } from 'antd';
import { MoreOutlined, BarChartOutlined, ProfileOutlined, ContainerOutlined, UserOutlined, InfoCircleOutlined, BellOutlined, QuestionCircleOutlined, LogoutOutlined } from '@ant-design/icons';
import Home from './home'
import AccountSettings from './accountSettings'
import ContestDetails from './contestDetails'
import PersonalInformation from './personalInformation'
import ProfessionalInformation from './professionalInformation'
import { UserContext } from '../../contexts/userContext';
import userService from '../../services/user';
import { navigate } from '@reach/router'
import localStorage from '../../services/localStorage'

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

export default function TeacherLayout() {
    const [collapsed, setCollapsed] = useState(false)
    // const { userData, setUserData } = useContext(UserContext)

    // useEffect(async () => {
    //     const response = await userService.getUserByToken()
    //     console.log(response)
    //     // setUserData(response)
    // }, [])

    React.useMemo(async () => {
        const data = localStorage.get()
        if (!data?.token) {
            navigate('/login')
        }
        // setNavigation(navigationByRole[data?.user?.role])
    }, [])

    const logout = () => {
        localStorage.delete()
        navigate('/login')
    }

    const content = (
        <div style={{ maxWidth: 200 }}>
            <Button type="text" block>Datos personales</Button>
            <Button type="text" block>Mi CV</Button>
            <Button type="text" block>Configuración de la cuenta</Button>
            <Button type="text" block onClick={() => logout()}>Cerrar sesión</Button>
        </div>
    );

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider collapsible collapsed={collapsed}>
                <Menu defaultSelectedKeys={['1']} mode="inline">
                    <Menu.Item key="0" icon={<MoreOutlined />} onClick={() => setCollapsed(!collapsed)} />
                    <Menu.Item key="1" icon={<BarChartOutlined />}>
                        Dashboard
                    </Menu.Item>
                    <Menu.Item key="2" icon={<UserOutlined />}>
                        Datos Personales
                    </Menu.Item>
                    <SubMenu key="sub1" icon={<ProfileOutlined />} title="Mi CV">
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
                        <Menu.Item key="13">Todos</Menu.Item>
                        <Menu.Item key="14">Postulaciones</Menu.Item>
                        <Menu.Item key="15">Favoritos</Menu.Item>
                    </SubMenu>
                    <Menu.Item key="16" icon={<QuestionCircleOutlined />}>
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
                        {/* <Home /> */}
                        {/* <AccountSettings /> */}
                        {/* <PersonalInformation /> */}
                        {/* <ContestDetails /> */}
                        {/* <ProfessionalInformation /> */}
                        <AccountSettings data={{
                            firstName: 'Gastón Ariel',
                            lastName: 'Larriera',
                            email: 'gaston@email.com',
                            password: 'admin1234',
                            hasNotificationsEnabled: true
                        }} />
                        {/* <PersonalInformation data={{
                            firstName: 'Gastón Ariel',
                            lastName: 'Larriera',
                            idNumber: '11223344',
                            phone: '4444-4444',
                            mobilePhone: '15-5555-5555',
                            email: 'gaston@email.com',
                            birthDate: '01/01/1900',
                            birthPlace: 'Capital Federal'
                        }} /> */}
                        {/* <ContestDetails data={{
                            subjectName: 'Programacion I',
                            periodType: 'Anual',
                            universityName: 'UADE',
                            hasPostulation: true,
                            days: ['Lunes', 'Martres', 'Miercoles'],
                            dueDate: '25/08/2021',
                            scheduleFrom: '08:00',
                            scheduleTo: '12:00',
                            activeStep: 3,
                            subjectProgram: 'Acá este espacio se lo dejamos a las distintas universidades para que escriban lo que quieran al docente por si creen que es necesario hacer alguna anotación previa a descargarse el programa de la materia o curso . Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed varius enim eu velit pulvinar congue. Duis aliquam molestie ante, ac ullamcorper magna semper ut. Cras quam leo, condimentum commodo erat convallis, tincidunt convallis ligula. Integer leo libero, luctus sed lacinia sit amet',
                            subjectProgramLink: '',
                            requirements: [
                                { name: 'Acá enlistas los requisitos del docente', optional: false },
                                { name: 'Como cinco o seis cosas.', optional: false },
                                { name: 'Asi se veria algo que no cumple', optional: true },
                                { name: 'Y que evidentemente queden cinco ítems.', optional: false },
                                { name: 'Con un interlineado más grande', optional: true },
                                { name: 'Que los textos normales.', optional: false }]
                        }} /> */}
                    </div>
                </Content>
            </Layout>
        </Layout>
    )
}

