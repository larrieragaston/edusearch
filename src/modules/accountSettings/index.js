import React, { useState, useEffect, useContext } from 'react'
import { Card, Row, Col, Typography, Button, Form, Input, Avatar, Checkbox } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { noInformation } from "../../constants";
import userService from '../../services/user';
import { UserContext } from '../../contexts/userContext';
import errorMessage from '../../utils/errorMessage'
import { toast } from 'react-toastify'
import styles from './account.module.css';

const { Text, Title } = Typography;

export default function AccountSettings() {
    const [data, setData] = useState({})
    const [isEditing, setIsEditing] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)

    const { userData, setUserData } = useContext(UserContext)

    useEffect(() => {
        setData(userData)
    }, [userData])

    const onFinish = async (values) => {
        setIsSubmitting(true)
        const payload = { ...values }
        try {
            const response = await userService.updateUserByToken(payload)
            setUserData(response.user)
            setData(response.user)
        } catch (e) {
            const message = errorMessage(e)
            toast.error(message)
        } finally {
            setIsSubmitting(false)
            setIsEditing(false)
        }
    }

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <React.Fragment>
            <Row justify='center'>
                <Title level={3} className={styles.sectiontitle}>Configuracion de la Cuenta</Title>
            </Row>
            <Row justify='center'>
                <Text type='secondary' className={styles.sectionsubtitle}>Información básica, como tu nombre y foto, que verán las Universidades al momento de tu postulación</Text>
            </Row>
            <Row justify='center'>
                <Card style={{ width: '80%'}} bodyStyle={{ padding: '15px 35px', borderRadius: '5px', boxShadow: '0px 7px 6px rgb(0 0 0 / 7%)' }}>
                    <Row>
                        <Title level={5} className={styles.insidetitle}>Información Básica</Title>
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
                                        <Text type='primary' className={styles.textprimary}>Nombre/es</Text>
                                    </Row>
                                    <Row>
                                        <Text type='secondary' className={styles.textsecondary}>{data?.firstName ?? noInformation}</Text>
                                    </Row>
                                    <Row>
                                        <Text type='primary' className={styles.textprimary}>Apellido/s</Text>
                                    </Row>
                                    <Row>
                                        <Text type='secondary' className={styles.textsecondary}>{data?.lastName ?? noInformation}</Text>
                                    </Row>
                                    <Row>
                                        <Text type='primary' className={styles.textprimary}>Correo electrónico</Text>
                                    </Row>
                                    <Row>
                                        <Text type='secondary' className={styles.textsecondary}>{data?.email ?? noInformation}</Text>
                                    </Row>
                                    <Row>
                                        <Checkbox disabled checked={data?.hasNotificationsEnabled ?? false} />
                                        <Text type='secondary' className={styles.textsecondary}>Quiero recibir noitificaciones por correo</Text>
                                    </Row>
                                    <Row>
                                        <Text type='primary' className={styles.textprimary}>Contraseña</Text>
                                    </Row>
                                    <Row>
                                        <Text type='secondary' className={styles.textsecondary}>********</Text>
                                    </Row>
                                </Col>
                            </Row>
                            <Row justify='end'>
                                <Button type="primary" className={styles.buttonprimary} onClick={() => setIsEditing(true)}>Editar</Button>
                            </Row>
                        </>
                        :
                        <>
                            <Form
                                layout="vertical"
                                name="basic"
                                initialValues={{
                                    firstName: data?.firstName,
                                    lastName: data?.lastName,
                                    email: data?.email,
                                    hasNotificationsEnabled: data?.hasNotificationsEnabled ?? false
                                }}
                                onFinish={onFinish}
                                onFinishFailed={onFinishFailed}
                            >
                                <Form.Item
                                    label="Nombre/es"
                                    name="firstName"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Campo obligatorio',
                                        }
                                    ]}
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    label="Apellido/s"
                                    name="lastName"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Campo obligatorio',
                                        }
                                    ]}
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    label="Correo electrónico"
                                    name="email"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Campo obligatorio',
                                        },
                                        {
                                            type: 'email',
                                            message: 'Ingresá un email válido',
                                        }
                                    ]}
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    name="hasNotificationsEnabled"
                                    valuePropName="checked"
                                >
                                    <Checkbox>Quiero recibir noitificaciones por correo</Checkbox>
                                </Form.Item>
                                {!isSubmitting ?
                                    <Form.Item >
                                        <Button type="primary" htmlType="submit" block>Guardar Cambios</Button>
                                        <Button type="link" onClick={() => setIsEditing(false)}>Cancelar</Button>
                                    </Form.Item> :
                                    <Form.Item >
                                        <Button type="primary" loading block>Loading</Button>
                                        <Button type="link" disabled>Cancelar</Button>
                                    </Form.Item>}

                            </Form>
                        </>}
                </Card>
            </Row>
        </React.Fragment>
    )
}