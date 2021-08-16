import React, { useState, useEffect, useContext } from 'react'
import { Card, Row, Col, Typography, Button, Form, Input, DatePicker, Select, InputNumber, Divider } from 'antd';
import userService from '../../services/user';
import { noInformation, countries, provinces } from "../../constants";
import { UserContext } from '../../contexts/userContext';
import errorMessage from '../../utils/errorMessage'
import { toast } from 'react-toastify'
import moment from 'moment';
import styles from './personal.module.css';

const { Option } = Select;
const { Text, Title } = Typography;

export default function PersonalInformation() {
    const [data, setData] = useState({})
    const [isEditing, setIsEditing] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)

    const { userData, setUserData } = useContext(UserContext)

    const [cities, setCities] = React.useState(userData?.address?.province ? provinces.filter(x => x.name === userData.address.province).cities : []);

    const handleProvinceChange = value => {
        setCities(provinces?.filter(x => x.name === value)[0]?.cities);
    };

    useEffect(() => {
        setData(userData)
    }, [userData])

    const addressGenerator = (values) => {
        const address = {
            country: values.country,
            province: values.province,
            locality: values.locality,
            street: values.street,
            number: values.number,
            floor: values.floor,
            department: values.department,
            postalCode: values.postalCode
        }
        return address
    }

    const onFinish = async (values) => {
        setIsSubmitting(true)
        values.address = addressGenerator(values)
        const payload = { ...values }
        try {
            const response = await userService.updateUserByToken(payload)
            setUserData(response)
            setData(response)
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
                <Title level={3} className={styles.sectiontitle}>Datos Personales</Title>
            </Row>
            <Row justify='center'>
                <Text type='secondary' className={styles.sectionsubtitle}>Información básica, como tu nombre y foto, que verán las Universidades al momento de tu postulación.</Text>
            </Row>
            <Row justify='center'>
                <Card style={{ width: '80%' }} bodyStyle={{ padding: '15px 35px', borderRadius: '5px', boxShadow: '0px 7px 6px rgb(0 0 0 / 7%)' }}>
                    <Row>
                        <Title level={5} className={styles.insidetitle}>Información Básica</Title>
                    </Row>
                    {!isEditing ?
                        <>
                            <Row>
                                <Col span={8}>
                                    <Row className="Pru">
                                        <Text type='primary' className={styles.textprimary}>Nombre/es</Text>
                                    </Row>
                                    <Row>
                                        <Text type='secondary' className={styles.textsecondary}>{data?.firstName ?? noInformation}</Text>
                                    </Row>
                                    <Row>
                                        <Text type='primary' className={styles.textprimary}>Lugar de nacimiento</Text>
                                    </Row>
                                    <Row>
                                        <Text type='secondary' className={styles.textsecondary}>{data?.birthPlace ?? noInformation}</Text>
                                    </Row>
                                    <Row>
                                        <Text type='primary' className={styles.textprimary}>Teléfono fijo</Text>
                                    </Row>
                                    <Row>
                                        <Text type='secondary' className={styles.textsecondary}>{data?.phone ?? noInformation}</Text>
                                    </Row>
                                </Col>
                                <Col span={8}>
                                    <Row>
                                        <Text type='primary' className={styles.textprimary}>Apellido/s</Text>
                                    </Row>
                                    <Row>
                                        <Text type='secondary' className={styles.textsecondary}>{data?.lastName ?? noInformation}</Text>
                                    </Row>
                                    <Row>
                                        <Text type='primary' className={styles.textprimary}>Fecha de nacimiento</Text>
                                    </Row>
                                    <Row>
                                        <Text type='secondary' className={styles.textsecondary}>{data?.birthDate ? moment(data.birthDate, 'YYYY-MM-DDT00:00:00.000+00:00').format('DD-MM-YYYY') : noInformation}</Text>
                                    </Row>
                                    <Row>
                                        <Text type='primary' className={styles.textprimary}>Teléfono celular</Text>
                                    </Row>
                                    <Row>
                                        <Text type='secondary' className={styles.textsecondary}>{data?.mobilePhone ?? noInformation}</Text>
                                    </Row>
                                </Col>
                                <Col span={8}>
                                    <Row>
                                        <Text type='primary' className={styles.textprimary}>DNI/Pasaporte</Text>
                                    </Row>
                                    <Row>
                                        <Text type='secondary' className={styles.textsecondary}>{data?.idNumber ?? noInformation}</Text>
                                    </Row>
                                    <Row>
                                        <Text type='primary' className={styles.textprimary}>Correo electrónico</Text>
                                    </Row>
                                    <Row>
                                        <Text type='secondary' className={styles.textsecondary}>{data?.email ?? noInformation}</Text>
                                    </Row>
                                </Col>
                            </Row>
                            <Divider orientation="left" className={styles.insidesubtitle}>Residencia</Divider>
                            <Row>
                                <Col span={8}>
                                    <Row>
                                        <Text type='primary' className={styles.textprimary}>País</Text>
                                    </Row>
                                    <Row>
                                        <Text type='secondary' className={styles.textsecondary}>{data?.address?.country ?? noInformation}</Text>
                                    </Row>
                                    <Row>
                                        <Text type='primary' className={styles.textprimary}>Calle</Text>
                                    </Row>
                                    <Row>
                                        <Text type='secondary' className={styles.textsecondary}>{data?.address?.street ?? noInformation}</Text>
                                    </Row>
                                    <Row>
                                        <Text type='primary' className={styles.textprimary}>Departamento</Text>
                                    </Row>
                                    <Row>
                                        <Text type='secondary' className={styles.textsecondary}>{data?.address?.department ?? noInformation}</Text>
                                    </Row>
                                </Col>
                                <Col span={8}>
                                    <Row>
                                        <Text type='primary' className={styles.textprimary}>Provincia</Text>
                                    </Row>
                                    <Row>
                                        <Text type='secondary' className={styles.textsecondary}>{data?.address?.province ?? noInformation}</Text>
                                    </Row>
                                    <Row>
                                        <Text type='primary' className={styles.textprimary}>Número</Text>
                                    </Row>
                                    <Row>
                                        <Text type='secondary' className={styles.textsecondary}>{data?.address?.number ?? noInformation}</Text>
                                    </Row>
                                    <Row>
                                        <Text type='primary' className={styles.textprimary}>Código Postal</Text>
                                    </Row>
                                    <Row>
                                        <Text type='secondary' className={styles.textsecondary}>{data?.address?.postalCode ?? noInformation}</Text>
                                    </Row>
                                </Col>
                                <Col span={8}>
                                    <Row>
                                        <Text type='primary' className={styles.textprimary}>Localidad</Text>
                                    </Row>
                                    <Row>
                                        <Text type='secondary' className={styles.textsecondary}>{data?.address?.locality ?? noInformation}</Text>
                                    </Row>
                                    <Row>
                                        <Text type='primary' className={styles.textprimary}>Piso</Text>
                                    </Row>
                                    <Row>
                                        <Text type='secondary' className={styles.textsecondary}>{data?.address?.floor ?? noInformation}</Text>
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
                                    birthPlace: data?.birthPlace,
                                    phone: data?.phone,
                                    lastName: data?.lastName,
                                    birthDate: data?.birthDate ? moment(data.birthDate, 'YYYY-MM-DDT00:00:00.000+00:00') : moment("01-01-2021", "DD-MM-YYYY"),
                                    mobilePhone: data?.mobilePhone,
                                    idNumber: data?.idNumber,
                                    email: data?.email,
                                    country: data?.address?.country,
                                    province: data?.address?.province,
                                    locality: data?.address?.locality,
                                    street: data?.address?.street,
                                    number: data?.address?.number,
                                    floor: data?.address?.floor,
                                    department: data?.address?.department,
                                    postalCode: data?.address?.postalCode
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
                                    label="Lugar de nacimiento"
                                    name="birthPlace"
                                >
                                    <Select
                                        showSearch
                                        placeholder="Seleccione un país"
                                        optionFilterProp="children"
                                        filterOption={(input, option) =>
                                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                        }
                                    >
                                        {countries.map(x => <Option value={x}>{x}</Option>)}
                                    </Select>
                                </Form.Item>
                                <Form.Item
                                    label="Teléfono fijo"
                                    name="phone"
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
                                <Form.Item label="Fecha de nacimiento"
                                    name="birthDate">
                                    <DatePicker />
                                </Form.Item>
                                <Form.Item
                                    label="Teléfono celular"
                                    name="mobilePhone"
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    label="DNI/Pasaporte"
                                    name="idNumber"
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
                                <Text>Residencia</Text>
                                <Form.Item
                                    label="País"
                                    name="country"
                                >
                                    <Select
                                        showSearch
                                        placeholder="Seleccione un país"
                                        optionFilterProp="children"
                                        filterOption={(input, option) =>
                                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                        }
                                    >
                                        <Option value="Argentina">Argentina</Option>
                                    </Select>
                                </Form.Item>
                                <Form.Item
                                    label="Provincia"
                                    name="province"
                                >
                                    <Select onChange={handleProvinceChange}>
                                        {provinces.map(x => (<Option key={x.name}>{x.name}</Option>))}
                                    </Select>
                                </Form.Item>
                                <Form.Item
                                    label="Localidad"
                                    name="locality"
                                >
                                    <Select>
                                        {cities?.map(city => (<Option key={city}>{city}</Option>))}
                                    </Select>
                                </Form.Item>
                                <Form.Item
                                    label="Calle"
                                    name="street"
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    label="Número"
                                    name="number"
                                >
                                    <InputNumber />
                                </Form.Item>
                                <Form.Item
                                    label="Piso"
                                    name="floor"
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    label="Departamento"
                                    name="department"
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    label="Código Postal"
                                    name="postalCode"
                                >
                                    <InputNumber />
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
        </React.Fragment >
    )
}