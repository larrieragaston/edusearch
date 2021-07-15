import React from 'react'
import { Card, Row, Col, Typography, Button, Divider } from 'antd';
import logoSrc from '../assets/logo.png'
import { HeartOutlined } from '@ant-design/icons';

const { Text } = Typography;

export default function Contest({ data }) {
    return (
        <Card size="small" style={{ width: 300 }}>
            <Row>
                <Col span={16}>
                    <Text type="secondary"> Fecha de Finalización:</Text>
                    <Text type="secondary"> {data.dueDate}</Text>
                </Col>
                <Col span={16}>
                    <img alt={"logo-EduSearch"} src={logoSrc} />
                </Col>
            </Row>
            <Row>
                <HeartOutlined />
            </Row>
            <Row>
                <Text strong>{data.subjectName}</Text>
            </Row>
            <Divider />
            <Row>
                <HeartOutlined />
                <Text>{data.days.map(i => i.substr(0, 3)).join(', ')} - {data.scheduleFrom}hs a {data.scheduleTo}hs</Text>
            </Row>
            <Row>
                <HeartOutlined />
                <Text>Periodo {data.periodType}</Text>
            </Row>
            <Row>
                <HeartOutlined />
                <Text>{data.universityName}</Text>
            </Row>
            <Row justify="end">{data.hasPostulation ?
                <Button type='primary' disabled>Postulado</Button> :
                <Button type='primary'>Postularme</Button>}
            </Row>
        </Card>
    )
}