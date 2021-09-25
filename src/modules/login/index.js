import React, { useState, useMemo } from 'react'
import { navigate, Redirect } from '@reach/router'
import localStorage from '../../services/localStorage'
import sessionService from '../../services/session'
import errorMessage from '../../utils/errorMessage'
import { toast } from 'react-toastify'
import { Row, Col, Form, Input, Button, Typography } from 'antd'
import imgSrc from '../../assets/teacher.png'
import logoSrc from '../../assets/logo.png'
import styles from './login.module.css';

const { Title, Text, Link } = Typography;

export default function Login() {
  const [redirectHome, setRedirectHome] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useMemo(() => {
    if (localStorage.get()?.token) {
      setRedirectHome(true)
    }
  }, [])

  const onFinish = async (values) => {
    setIsSubmitting(true)
    console.log('Success:', values)
    try {
      const response = await sessionService.create(values.email, values.password)
      const payload = { token: response.token, user: response.user }
      localStorage.set(payload)
      navigate('/')
    } catch (e) {
      const message = errorMessage(e)
      toast.error(message)
    } finally {
      setIsSubmitting(false)
    }
  }

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return redirectHome ? (
    <Redirect path="/login" to="/" noThrow />
  ) : (
    <div className={styles.container}>
      <Col span={12}>
        <img alt={"portada"} src={imgSrc} className={styles.leftImg}/>
      </Col>
      <Col span={12} className={styles.rightColumn}>
        <img alt={"logo-EduSearch"} src={logoSrc} className={styles.logo}/>
        <div className={styles.content}>
          <Row justify="center">
            <Col span={16} >
              <Title level={5}>Iniciar Sesión</Title>
            </Col>
          </Row>
          <Row align="middle" justify="center">
            <Col span={16}>
              <Form
                  layout="vertical"
                  name="basic"
                  initialValues={{
                    remember: true,
                  }}
                  onFinish={onFinish}
                  onFinishFailed={onFinishFailed}
              >
                <Form.Item
                    label="Email"
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
                    label="Contraseña"
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: 'Campo obligatorio',
                      },
                    ]}
                >
                  <Input.Password />
                </Form.Item>

                <Form.Item>
                  {!isSubmitting ?
                      <Button type="primary" htmlType="submit" block>
                        Iniciar sesión
                      </Button> :
                      <Button type="primary" loading block>
                        Enviando
                      </Button>}
                </Form.Item>
                <Row justify="end">
                  <Form.Item >
                    <Link  onClick={() => navigate('/forgot')}> ¿Olvidaste tu contraseña? </Link>
                  </Form.Item>
                </Row>
              </Form>
            </Col>
          </Row>
          <Row align="bottom" justify="center">
            <Text level={5}>No tenes una cuenta <Link strong onClick={() => navigate('/register')}> Crea tu cuenta </Link></Text>
          </Row>
        </div>
      </Col>
    </div>
  );
};
