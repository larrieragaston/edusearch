import React, { useEffect, useState } from 'react'
import { Row, Col, Typography, Button, Divider, Tabs, Steps, List } from 'antd';
import logoSrc from '../../assets/logo.png'
import { HeartOutlined, DownloadOutlined } from '@ant-design/icons'
import { contestSteps, noInformation } from '../../constants'
import teacherContestService from '../../services/teacherContest';

const { Text } = Typography;
const { TabPane } = Tabs;
const { Step } = Steps;

export default function ContestDetails() {

    const getSteps = (hasColloquium) => {
        if (hasColloquium)
            return contestSteps.filter(x => x !== 'Coloquio').map(x => <Step title={x} />)
        else
            return contestSteps.map(x => <Step title={x} />)
    }
    const [data, setContest] = useState([])

    useEffect(() => {
        async function fetchData() {
            const response = await teacherContestService.getContestById('000000000000000000000000')
            console.log(response)
            setContest(response)
        }
        fetchData()
    }, [])

    return (
        <React.Fragment>
            <Row>
                <Col span={12}>
                    <Row>{data.subject?.name ?? noInformation}</Row>
                    <Row>
                        {data.dueDate ?
                            <Text>No se ha establecido una fecha para el cierren las postulaciones aun</Text> :
                            <Text>Quedan {data.dueDate} días para que se cierren las postulaciones</Text>}
                    </Row>
                    <Row>
                        <HeartOutlined />
                        <Text>{data.day ?? noInformation} - {data.startsAt || data.endsAt ? data.startsAt + 'hs a ' + data.endsAt + 'hs' : noInformation}</Text>
                        {/* <Text>{data.days.join(', ')} - {data.scheduleFrom}hs a {data.scheduleTo}hs</Text> */}
                    </Row>
                    <Row>
                        <HeartOutlined />
                        <Text>Periodo {data.periodType ?? noInformation}</Text>
                    </Row>
                    <Row>
                        <HeartOutlined />
                        <Text>{data.university?.name ?? noInformation}</Text>
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
                        {
                            data.requirements ?
                                <List
                                    size="small"
                                    dataSource={data.requirements}
                                    renderItem={item => (
                                        <List.Item>
                                            - {item.name} {item.optional ? <Text disabled>(Opcopnal)</Text> : ''}
                                        </List.Item>
                                    )}
                                />
                                :
                                <Text>{noInformation}</Text>
                        }
                    </TabPane>
                    <TabPane tab="Programa" key="2">
                        <Row>
                            <Text>{data.subject?.name ?? noInformation}</Text>
                        </Row>
                        <Row>
                            <Button type="primary" icon={<DownloadOutlined />} size='large' shape="round" href="" download="Programa">Descargar Programa</Button>
                        </Row>
                    </TabPane>
                </Tabs>
            </Row>
            <Divider />
            <Row>
                <Steps progressDot current={data.activeStage ?? 0}>
                    {getSteps(data.hasColloquium)}
                </Steps>
            </Row>
        </React.Fragment >
    )
}