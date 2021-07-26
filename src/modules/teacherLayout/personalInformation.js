import React, { useState, useEffect } from 'react'
import { Card, Row, Col, Typography, Button, Form, Input } from 'antd';
import userService from '../../services/user';
import localStorageService from '../../services/localStorage'
import { noInformation } from "../../constants";

const { Text, Title } = Typography;

export default function PersonalInformation() {

    const [data, setData] = useState({})
    const [isEditing, setIsEditing] = useState(false)

    // useEffect(async () => {
    //     const response = await userService.getPersonalInformation()
    //     console.log(response)
    //     // setPersonalInformation(response.data)
    // }, [])

    // React.useMemo(async () => {
    //     const response = await userService.getPersonalInformation()
    //     console.log(response)
    //     setData(response)
    //     const user = localStorageService.getUser()
    //     console.log(user)
    //     // const filtered = response.docs.filter(i => i._id !== user._id)
    //     // setUsers(filtered)
    //     // setInitialUsers(filtered)
    // }, [])

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
                <Title level={3}>Datos Personales</Title>
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
                                <Col span={8}>
                                    <Row>
                                        <Text type='primary'>Nombre/es</Text>
                                    </Row>
                                    <Row>
                                        <Text type='secondary'>{data.firstName ?? noInformation}</Text>
                                    </Row>
                                    <Row>
                                        <Text type='primary'>Lugar de nacimiento</Text>
                                    </Row>
                                    <Row>
                                        <Text type='secondary'>{data.personalInformation?.birthPlace ?? noInformation}</Text>
                                    </Row>
                                    <Row>
                                        <Text type='primary'>Teléfono fijo</Text>
                                    </Row>
                                    <Row>
                                        <Text type='secondary'>{data.personalInformation?.phone ?? noInformation}</Text>
                                    </Row>
                                </Col>
                                <Col span={8}>
                                    <Row>
                                        <Text type='primary'>Apellido/s</Text>
                                    </Row>
                                    <Row>
                                        <Text type='secondary'>{data.lastName ?? noInformation}</Text>
                                    </Row>
                                    <Row>
                                        <Text type='primary'>Fecha de nacimiento</Text>
                                    </Row>
                                    <Row>
                                        <Text type='secondary'>{data.personalInformation?.birthDate ?? noInformation}</Text>
                                    </Row>
                                    <Row>
                                        <Text type='primary'>Teléfono celular</Text>
                                    </Row>
                                    <Row>
                                        <Text type='secondary'>{data.personalInformation?.mobilePhone ?? noInformation}</Text>
                                    </Row>
                                </Col>
                                <Col span={8}>
                                    <Row>
                                        <Text type='primary'>DNI/Pasaporte</Text>
                                    </Row>
                                    <Row>
                                        <Text type='secondary'>{data.personalInformation?.idNumber ?? noInformation}</Text>
                                    </Row>
                                    <Row>
                                        <Text type='primary'>Correo electrónico</Text>
                                    </Row>
                                    <Row>
                                        <Text type='secondary'>{data.email ?? noInformation}</Text>
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