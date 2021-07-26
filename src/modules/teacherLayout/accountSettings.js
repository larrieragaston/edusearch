import React, { useState, useEffect } from 'react'
import { Card, Row, Col, Typography, Button, Form, Avatar, Checkbox } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { noInformation } from "../../constants";
import userService from '../../services/user';

const { Text, Title } = Typography;

export default function AccountSettings() {

    const [data, setData] = useState({})
    const [isEditing, setIsEditing] = useState(false)

    useEffect(() => {
        async function fetchData() {
            const response = await userService.getPersonalInformation()
            console.log(response)
            setData(response)
        }
        fetchData()
    }, [])

    function onChange(e) {
        console.log(`checked = ${e.target.checked}`);
    }

    const onFinish = async (values) => {
        console.log('Success:', values)
        // try {
        //     const response = await userService.update(values.email, values.password)
        //     const payload = { token: response.token, user: response.user }
        //     localStorage.set(payload)
        //     navigate('/')
        // } catch (e) {
        //     const message = errorMessage(e)
        //     toast.error(message)
        // } finally {
        //     setIsSubmitting(false)
        // }
        setIsEditing(false)
    }

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

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
                    {!isEditing ?
                        <>
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
                                        <Text type='secondary'>{data.firstName ?? noInformation}</Text>
                                    </Row>
                                    <Row>
                                        <Text type='primary'>Apellido/s</Text>
                                    </Row>
                                    <Row>
                                        <Text type='secondary'>{data.lastName ?? noInformation}</Text>
                                    </Row>
                                    <Row>
                                        <Text type='primary'>Correo electrónico</Text>
                                    </Row>
                                    <Row>
                                        <Text type='secondary'>{data.email ?? noInformation}</Text>
                                    </Row>
                                    <Row>
                                        <Checkbox checked={data.hasNotificationsEnabled ?? false} onChange={onChange} />
                                        <Text type='secondary'>Quiero recibir noitificaciones por correo</Text>
                                    </Row>
                                    <Row>
                                        <Text type='primary'>Contraseña</Text>
                                    </Row>
                                    <Row>
                                        {/* <Text type='secondary'>{data.password}</Text> */}
                                        <Text type='secondary'>********</Text>
                                    </Row>
                                </Col>
                            </Row>
                            <Row justify='end'>
                                <Button type="primary" onClick={() => setIsEditing(true)}>Editar</Button>
                            </Row>
                        </>
                        :
                        <>
                            <Form
                                layout="vertical"
                                name="basic"
                                initialValues={{
                                    remember: true,
                                }}
                                onFinish={onFinish}
                                onFinishFailed={onFinishFailed}
                            >
                                {/* <Form.Item label="Field A">
                        <Input placeholder="input placeholder" />
                    </Form.Item>
                    <Form.Item label="Field B">
                        <Input placeholder="input placeholder" />
                    </Form.Item> */}
                                <Text type='primary'>ACA IRÍA EL FORMULARIO PARA EDITAR LOS DATOS</Text>
                                <Form.Item >
                                    <Button type="link" onClick={() => setIsEditing(false)}>Cancelar</Button>
                                    <Button type="primary" >Guardar Cambios</Button>
                                </Form.Item>
                            </Form>
                        </>}
                </Card>
            </Row>
        </React.Fragment>
    )
}