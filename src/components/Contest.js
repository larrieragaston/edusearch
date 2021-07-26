import React from 'react'
import { Card, Row, Col, Typography, Button, Divider } from 'antd';
import logoSrc from '../assets/logo.png'
import { HeartOutlined } from '@ant-design/icons';
import { noInformation } from "../constants";

const { Text } = Typography;

export default function Contest({ data }) {
    return (
        <Card size="small" style={{ width: 300 }}>
            <Row>
                <Col span={16}>
                    <Text type="secondary"> Fecha de Finalización:</Text>
                    <Text type="secondary">{data.dueDate?.toString('dd-mm-yyyy')}</Text>
                </Col>
                <Col span={16}>
                    <img alt={"logo-EduSearch"} src={logoSrc} />
                </Col>
            </Row>
            <Row>
                <HeartOutlined />
            </Row>
            <Row>
                <Text strong>{data.subject?.name ?? noInformation}</Text>
            </Row>
            <Divider />
            <Row>
                <HeartOutlined />
                <Text>{data.day ?? noInformation} - {data.startsAt || data.endsAt ? data.startsAt + 'hs a ' + data.endsAt + 'hs' : noInformation}</Text>
            </Row>
            <Row>
                <HeartOutlined />
                <Text>Periodo {data.periodType ?? noInformation}</Text>
            </Row>
            <Row>
                <HeartOutlined />
                <Text>{data.university?.name ?? noInformation}</Text>
            </Row>
            <Row justify="end">{data.hasPostulation ?
                <Button type='primary' disabled>Postulado</Button> :
                <Button type='primary' onClick={() => console.log('Postularme click')}>Postularme</Button>}
            </Row>
        </Card>
    )
}