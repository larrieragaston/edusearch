import React, { useState, useMemo, useContext } from 'react'
import { navigate } from '@reach/router'
import logoSrc from '../../assets/logo.png'
import { Layout, Avatar, Button, Popover, PageHeader, Tag } from 'antd';
import { UserOutlined, InfoCircleOutlined, BellOutlined } from '@ant-design/icons';
import { UserContext } from '../../contexts/userContext';
import userService from '../../services/user';
import localStorage from '../../services/localStorage'
import { roles } from './../../constants';
import TeacherNavigation from './../../components/TeacherNavigation';
import UniversityNavigation from './../../components/UniversityNavigation';
import './mainLayout.css';

const { Header, Content } = Layout;

const navigationByRole = {
    [roles.Teacher]: <TeacherNavigation/>,
    [roles.UAdmin]: <UniversityNavigation/>,
    [roles.UCouncilMember]: <UniversityNavigation/>,
    [roles.UHumanResources]: <UniversityNavigation/>,
  }

const profileLabels = {
    [roles.Teacher]: 'Docente',
    [roles.UAdmin]: 'Administrador',
    [roles.UCouncilMember]: 'Miembro del Consejo',
    [roles.UHumanResources]: 'Recursos Humanos',
  }

export default function MainLayout(props) {
    const [siderNavigation, setSiderNavigation] = useState('')
    const [profileLabel, setProfileLabel] = useState('')
    const { userData, setUserData } = useContext(UserContext)

    useMemo(async () => {
        const data = localStorage.get()
        if (!data?.token) {
            navigate('/login')
        }
        else {
            setSiderNavigation(data?.user?.role)
            setProfileLabel(profileLabels[data?.user?.role])
            const response = await userService.getUserByToken()
            setUserData(response)
        }
    }, [])

    const logout = () => {
        localStorage.delete()
        navigate('/login')
    }

    const content = (
        <div style={{ maxWidth: 150 }}>
            <Button type="text" block onClick={() => navigate('/personal-information')}>Datos Personales</Button>
            <Button type="text" block onClick={() => navigate('/acccount-settings')}>Mi Cuenta</Button>
            <Button type="text" block onClick={() => logout()}>Cerrar sesión</Button>
        </div>
    );

    return (
        <Layout style={{ minHeight: '100vh' }}>
                { siderNavigation ? navigationByRole[siderNavigation] : null }
            <Layout className="site-layout" style={{ backgroundColor: '#F9F9F9' }}>
                <Header className="site-layout-background" style={{ padding: '0', alignItems: 'center' }}>
                    <PageHeader
                        ghost={false}
                        title={<img alt={"logo-EduSearch"} src={logoSrc} />}
                        extra={[
                            <Tag key='4' color="blue">{profileLabel}</Tag>,
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

