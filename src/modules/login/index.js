import React, { useState, useMemo } from 'react'
// import { css, jsx } from '@emotion/core'
import { navigate, Redirect } from '@reach/router'
import localStorage from '../../services/localStorage'
import sessionService from '../../services/session'
import errorMessage from '../../utils/errorMessage'
import { toast } from 'react-toastify'
import { Row, Col, Form, Input, Button, Typography } from 'antd'
import imgSrc from '../../assets/teacher.png'
import logoSrc from '../../assets/logo.png'

const { Title, Text, Link } = Typography;

// const styles = {
//   container: css`
//     min-heigth: 100vw;
//     display: flex;
//     flex-direction: row;
//   `,
//   leftContainer: css`
//     flex: 1;
//   `,
//   imgStyle: css`
//   heigth: 100%;
//   width: 100%;
// `,
//   rightContainer: css`
//     flex: 1;
//     display: flex;
//     flex-direction: column;
//   `,
//   logoContainer: css`
//   flex: 1;
//   display: flex;
//   padding-top: 10px;
//   padding-right: 10px;
//   `,
//   formContainer: css`
//   flex: 1;
//   display: flex;
//   justify-content: center;
//   `,
//   footerContainer: css`
//   flex: 1;
//   display: flex;
//   justify-content: center;
//   align-items: flex-end;
//   `
// }
export default function Login() {

  const [redirectHome, setRedirectHome] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useMemo(() => {
    if (localStorage.get()?.token) {
      setRedirectHome(true)
    }
  }, [])

  // const onFinish = async (values, { setIsSubmitting }) => {
  const onFinish = async (values) => {
    debugger;
    setIsSubmitting(true)
    console.log('Success:', values)
    try {
      const response = await sessionService.create(values.email, values.password)
      const payload = { token: response.token, user: response.user }
      localStorage.set(payload)
      navigate('/dashboard')
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
    <Redirect from="/login" to="/dashboard" noThrow />
  ) : (
    <Row>
      <Col span={12}>
        <img alt={"portada"} src={imgSrc} />
      </Col>
      <Col span={12}>
        <Row justify="end">
          <img alt={"logo-EduSearch"} src={logoSrc} />
        </Row>
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
                    Loading
                  </Button>}
              </Form.Item>
              <Row justify="end">
                <Form.Item >
                  <Link href="#"> ¿Olvidaste tu contraseña? </Link>
                </Form.Item>
              </Row>
            </Form>
          </Col>
        </Row>
        <Row align="bottom" justify="center">
          <Text level={5}>No tenes una cuenta <Link strong href="#"> Crea tu cuenta </Link></Text>
        </Row>
      </Col>
    </Row>
  );
};
