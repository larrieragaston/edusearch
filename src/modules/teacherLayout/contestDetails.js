import React from 'react'
import { Row, Col, Typography, Button, Divider, Tabs, Steps, List } from 'antd';
import logoSrc from '../../assets/logo.png'
import { HeartOutlined, DownloadOutlined } from '@ant-design/icons'
import { contestSteps } from '../../constants'

const { Text } = Typography;
const { TabPane } = Tabs;
const { Step } = Steps;

export default function ContestDetails({ data }) {

    const steps = contestSteps.map(x => <Step title={x} />)

    return (
        <React.Fragment>
            <Row>
                <Col span={12}>
                    <Row>{data.subjectName}</Row>
                    <Row>
                        <Text>Quedan {data.dueDate} días para que se cierren las postulaciones</Text>
                    </Row>
                    <Row>
                        <HeartOutlined />
                        <Text>{data.days.join(', ')} - {data.scheduleFrom}hs a {data.scheduleTo}hs</Text>
                    </Row>
                    <Row>
                        <HeartOutlined />
                        <Text>Periodo {data.periodType}</Text>
                    </Row>
                    <Row>
                        <HeartOutlined />
                        <Text>{data.universityName}</Text>
                    </Row>
                </Col>
                <Col span={12}>
                    <Row justify='end'>
                        <img alt={"logo-EduSearch"} src={logoSrc} />
                    </Row>
                    <Row justify="end">
                        {data.hasPostulation ?
                            <Button type='primary' disabled>Postulado</Button> :
                            <Button type='primary'>Postularme</Button>}
                    </Row>
                </Col>
            </Row>
            <Divider />
            <Row>
                <Tabs defaultActiveKey="1" >
                    <TabPane tab="Requisitos" key="1">
                        <List
                            size="small"
                            dataSource={data.requirements}
                            renderItem={item => (
                                <List.Item>
                                    - {item.name} {item.optional ? <Text disabled>(Opcopnal)</Text> : ''}
                                </List.Item>
                            )}
                        />
                    </TabPane>
                    <TabPane tab="Programa" key="2">
                        <Row>
                            <Text>{data.subjectProgram}</Text>
                        </Row>
                        <Row>
                            <Button type="primary" icon={<DownloadOutlined />} size='large' shape="round" href="" download="Programa">Descargar Programa</Button>
                        </Row>
                    </TabPane>
                </Tabs>
            </Row>
            <Divider />
            <Row>
                <Steps progressDot current={data.activeStep}>
                    {steps}
                </Steps>
            </Row>
        </React.Fragment >
    )
}