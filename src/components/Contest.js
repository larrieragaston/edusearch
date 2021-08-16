import React from 'react'
import { Card, Row, Col, Typography, Button, Divider, Modal } from 'antd';
import logoSrc from '../assets/logo.png'
import { HeartOutlined, HeartFilled } from '@ant-design/icons';
import { noInformation } from "../constants";
import moment from 'moment';
import { navigate } from '@reach/router'
import postulationService from '../services/postulation';

const { Text } = Typography;

export default function Contest({ data }) {

      function success() {
        Modal.success({
          title: 'Felicitaciones!',
          content: 'Muchas gracias por su postulacion',
        });
      }
      
      function error() {
        Modal.error({
          title: 'Ups!',
          content: 'No se ha podido realizar la postulacion',
        });
      }


    const postulate = async (contestId) => {
        try {
            const payload = { contest: contestId }
            await postulationService.postulate(payload)
            success()
        } catch (e) {
            // const message = errorMessage(e)
            error()
        } 
        // finally {
        //     setSubmitting(false)
        // }
    }

    return (
        <Card size="small" style={{ width: 300 }}>
            <Row>
                <Col span={12}>
                    <Text type="secondary"> Fecha de Finalización:</Text>
                    <Text type='secondary'>{data?.dueDate ? moment(data.dueDate, 'YYYY-MM-DDT00:00:00.000+00:00').format('DD-MM-YYYY') : noInformation}</Text>
                </Col>
                <Col span={12}>
                    <img alt={"logo-EduSearch"} src={logoSrc} />
                </Col>
            </Row>
            <Row>
                <HeartFilled style={{ color: "#e01616", fontSize: 20 }} />
                {/* <HeartOutlined style={{fontSize: 20}}/> */}
            </Row>
            <Row>
                <Text strong>{data?.subject?.name ?? noInformation}</Text>
            </Row>
            <Divider />
            <Row>
                <HeartOutlined />
                <Text>{data?.day ?? noInformation} - {data?.startsAt || data?.endsAt ? data?.startsAt + 'hs a ' + data?.endsAt + 'hs' : noInformation}</Text>
            </Row>
            <Row>
                <HeartOutlined />
                <Text>Periodo {data?.subject?.periodType ?? noInformation}</Text>
            </Row>
            <Row>
                <HeartOutlined />
                <Text>{data?.university?.name ?? noInformation}</Text>
            </Row>
            <Row justify="end">
                <Button type="link" onClick={() => navigate('/contest/' + data._id)}>Ver Detalle</Button>
                {data?.hasPostulation ?
                    <Button type='primary' disabled>Postulado</Button> :
                    <Button type='primary' onClick={() => postulate(data._id)}>Postularme</Button>}
            </Row>
        </Card>
    )
}