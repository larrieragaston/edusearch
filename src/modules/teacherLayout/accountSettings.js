import React from 'react'
import { Card, Row, Col, Typography, Button, Avatar, Checkbox } from 'antd';
import { UserOutlined } from '@ant-design/icons';

const { Text, Title } = Typography;

export default function AccountSettings({ data }) {

    function onChange(e) {
        console.log(`checked = ${e.target.checked}`);
    }

    return (
        <React.Fragment>
            <Row justify='center'>
                <Title level={3}>Configuracion de la Cuenta</Title>
            </Row>
            <Row justify='center'>
                <Text type='secondary'>Información básica, como tu nombre y foto, que verán las Universidades al momento de tu postulación</Text>
            </Row>
            <Row justify='center'>
                <Card style={{ width: '80%' }}>
                    <Row>
                        <Title level={5}>Información Básica</Title>
                    </Row>
                    <Row>
                        <Col span={10}>
                            <Row justify='center'>
                                <Avatar size={64} icon={<UserOutlined />} />
                            </Row>
                            <Row justify='center'>
                                <Text type='secondary'>Editar tu foto de perfil</Text>
                            </Row>
                        </Col>
                        <Col span={14}>
                            <Row>
                                <Text type='primary'>Nombre/es</Text>
                            </Row>
                            <Row>
                                <Text type='secondary'>{data.firstName}</Text>
                            </Row>
                            <Row>
                                <Text type='primary'>Apellido/s</Text>
                            </Row>
                            <Row>
                                <Text type='secondary'>{data.lastName}</Text>
                            </Row>
                            <Row>
                                <Text type='primary'>Correo electrónico</Text>
                            </Row>
                            <Row>
                                <Text type='secondary'>{data.email}</Text>
                            </Row>
                            <Row>
                                <Checkbox checked={data.hasNotificationsEnabled} onChange={onChange} />
                                <Text type='secondary'>Quiero recibir noitificaciones por correo</Text>
                            </Row>
                            <Row>
                                <Text type='primary'>Contraseña</Text>
                            </Row>
                            <Row>
                                <Text type='secondary'>{data.password}</Text>
                            </Row>
                        </Col>
                    </Row>
                    <Row justify='end'>
                        <Button type="primary">Editar</Button>
                    </Row>
                </Card>
            </Row>
        </React.Fragment>
    )
}