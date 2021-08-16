import React, { useEffect, useState } from 'react'
import { Row, Col, Typography, Button, Divider, Tabs, Steps, List, Modal } from 'antd'
import logoSrc from '../../assets/logo.png'
import { HeartOutlined, DownloadOutlined } from '@ant-design/icons'
import { contestSteps, noInformation, periodTypes } from '../../constants'
import contestService from '../../services/contest'
import postulationService from '../../services/postulation'
import moment from 'moment'

const { Text } = Typography;
const { TabPane } = Tabs;
const { Step } = Steps;

export default function ContestDetails(props) {

    const [data, setContest] = useState([])

    useEffect(() => {
        async function fetchData() {
            const contest = await contestService.getContestById(props.id)
            setContest(contest)
        }
        fetchData()
    }, [props.id])

    const getPeriodType = (type) => {
        return periodTypes.filter(x => x.value == type)[0]?.description ?? null
      }

    const getSteps = (hasColloquium) => {
        if (hasColloquium)
            return contestSteps.filter(x => x !== 'Coloquio').map(x => <Step key={x} title={x} />)
        else
            return contestSteps.map(x => <Step key={x} title={x} />)
    }

    const getDaysDifferenceText = (date) => {
        const dateMoment = moment(date, 'YYYY-MM-DDT00:00:00.000+00:00')
        const today = moment();
        const diffDays = dateMoment.diff(today, 'days');
        return diffDays < 0 ? `Las posulaciones ya se encuentran cerradas` : `Quedan ${diffDays} días para que se cierren las postulaciones`;
    }

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
        <React.Fragment>
            <Row>
                <Col span={12}>
                    <Row>{data.subject?.name ?? noInformation}</Row>
                    <Row>
                        {data.dueDate ?
                            <Text>{getDaysDifferenceText(data.dueDate)}</Text> :
                            <Text>No se ha establecido una fecha para el cierren las postulaciones aun</Text>}
                    </Row>
                    <Row>
                        <HeartOutlined />
                        <Text>{data.day ?? noInformation} - {data.startsAt || data.endsAt ? data.startsAt + 'hs a ' + data.endsAt + 'hs' : noInformation}</Text>
                        {/* <Text>{data.days.join(', ')} - {data.scheduleFrom}hs a {data.scheduleTo}hs</Text> */}
                    </Row>
                    <Row>
                        <HeartOutlined />
                        <Text>Periodo {getPeriodType(data?.subject?.periodType) ?? noInformation}</Text>
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
                            <Button type='primary' onClick={() => postulate(data._id)}>Postularme</Button>}
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