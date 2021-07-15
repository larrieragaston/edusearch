import React from 'react'
import { Card, Row, Col, Typography, Button } from 'antd';

const { Text, Title } = Typography;

export default function PersonalInformation({ data }) {
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
                    <Row>
                        <Col span={8}>
                            <Row>
                                <Text type='primary'>Nombre/es</Text>
                            </Row>
                            <Row>
                                <Text type='secondary'>{data.firstName}</Text>
                            </Row>
                            <Row>
                                <Text type='primary'>Lugar de nacimiento</Text>
                            </Row>
                            <Row>
                                <Text type='secondary'>{data.birthPlace}</Text>
                            </Row>
                            <Row>
                                <Text type='primary'>Teléfono fijo</Text>
                            </Row>
                            <Row>
                                <Text type='secondary'>{data.phone}</Text>
                            </Row>
                        </Col>
                        <Col span={8}>
                            <Row>
                                <Text type='primary'>Apellido/s</Text>
                            </Row>
                            <Row>
                                <Text type='secondary'>{data.lastName}</Text>
                            </Row>
                            <Row>
                                <Text type='primary'>Fecha de nacimiento</Text>
                            </Row>
                            <Row>
                                <Text type='secondary'>{data.birthDate}</Text>
                            </Row>
                            <Row>
                                <Text type='primary'>Teléfono celular</Text>
                            </Row>
                            <Row>
                                <Text type='secondary'>{data.mobilePhone}</Text>
                            </Row>
                        </Col>
                        <Col span={8}>
                            <Row>
                                <Text type='primary'>DNI/Pasaporte</Text>
                            </Row>
                            <Row>
                                <Text type='secondary'>{data.idNumber}</Text>
                            </Row>
                            <Row>
                                <Text type='primary'>Correo electrónico</Text>
                            </Row>
                            <Row>
                                <Text type='secondary'>{data.email}</Text>
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