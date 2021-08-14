import React, { useState, useEffect, useContext } from 'react'
import { Card, Row, Col, Typography, Button, Form, Input, DatePicker, Select, InputNumber, Divider } from 'antd';
import { PlusOutlined, EditOutlined } from '@ant-design/icons';
import { resumeSections, noInformation } from '../constants';

const { Text, Title } = Typography;

export default function ResumeSection(props) {

    // useEffect(() => {
    //     console.log('props.data')
    //     console.log(props.data)
    // }, [])

    // const visibleOptions = getOptionsbySection(props.data?.sectionType)

    const getTitleSection = (sectionType) => {
        switch (sectionType) {
            case resumeSections.Degree: return 'Formación superior y media'
            case resumeSections.FurtherTraining: return 'Formacion complementaria'
            case resumeSections.Scholarship: return 'Becas'
            case resumeSections.TeachingBackground: return 'Antecedentes en docencia'
            case resumeSections.ManagementBackground: return 'Antecedentes en gestión'
            case resumeSections.ResearchBackground: return 'Antecedentes en investigación'
            case resumeSections.HRBackground: return 'Antecedentes en formación y RRHH'
            case resumeSections.EvaluationBackground: return 'Antecedentes en evaluación'
            case resumeSections.STBackground: return 'Antecedentes en ciencia y tecnología'
            case resumeSections.AcademicProduction: return 'Producciones academicas'
            case resumeSections.Award: return 'Premios'
            case resumeSections.Other: return 'Otros antecedentes profesionales relevantes'
            default: return 'ERROR'
        }
    }

    const getSectionBody = (sectionType, sectionData) => {
        switch (sectionType) {
            case resumeSections.Degree:
                return <>
                    <Col span={20}>
                        <Row>
                            <Text>{sectionData?.subType}</Text>
                        </Row>
                        <Row>
                            <Text>{sectionData?.institution}</Text>
                        </Row>
                        <Row>
                            <Text>{sectionData?.title}</Text>
                        </Row>
                        <Row>
                            <Text>{sectionData?.startYear} - {sectionData?.endYear} ({sectionData?.currentSituation})</Text>
                        </Row>
                    </Col>
                    <Col span={4}>
                        <EditOutlined />
                    </Col>
                </>
            case resumeSections.FurtherTraining:
                return <>
                    <Col span={20}>
                        <Row>
                            <Text>{sectionData?.subType}</Text>
                        </Row>
                        <Row>
                            <Text>{sectionData?.title}</Text>
                        </Row>
                        <Row>
                            <Text>{sectionData?.institution}</Text>
                        </Row>
                        <Row>
                            <Text>{sectionData?.endYear}</Text>
                        </Row>
                    </Col>
                    <Col span={4}>
                        <EditOutlined />
                    </Col>
                </>
            case resumeSections.Scholarship:
                return <>
                    <Col span={20}>
                        <Row>
                            <Text>{sectionData?.title}</Text>
                        </Row>
                        <Row>
                            <Text>{sectionData?.subType}</Text>
                        </Row>
                        <Row>
                            <Text>{sectionData?.institution}</Text>
                        </Row>
                        <Row>
                            <Text>{sectionData?.startYear} - {sectionData?.endYear} ({sectionData?.currentSituation})</Text>
                        </Row>
                    </Col>
                    <Col span={4}>
                        <EditOutlined />
                    </Col>
                </>
            case resumeSections.TeachingBackground:
                return <>
                    <Col span={20}>
                        <Row>
                            <Text>{sectionData?.subType}</Text>
                        </Row>
                        <Row>
                            <Text>{sectionData?.title}</Text>
                        </Row>
                        <Row>
                            <Text>{sectionData?.institution}</Text>
                        </Row>
                        <Row>
                            <Text>{sectionData?.startYear} - {sectionData?.endYear} ({sectionData?.currentSituation})</Text>
                        </Row>
                        <Row>
                            <Text>{sectionData?.subject}</Text>
                        </Row>
                        <Row>
                            <Text>{sectionData?.duration}</Text>
                        </Row>
                    </Col>
                    <Col span={4}>
                        <EditOutlined />
                    </Col>
                </>
            case resumeSections.ManagementBackground:
                return <>
                    <Col span={20}>
                        <Row>
                            <Text>{sectionData?.subType}</Text>
                        </Row>
                        <Row>
                            <Text>{sectionData?.title}</Text>
                        </Row>
                        <Row>
                            <Text>{sectionData?.institution}</Text>
                        </Row>
                        <Row>
                            <Text>{sectionData?.startYear} - {sectionData?.endYear} ({sectionData?.currentSituation})</Text>
                        </Row>
                    </Col>
                    <Col span={4}>
                        <EditOutlined />
                    </Col>
                </>
            case resumeSections.ResearchBackground:
                return <>
                    <Col span={20}>
                        <Row>
                            <Text>{sectionData?.title}</Text>
                        </Row>
                        <Row>
                            <Text>{sectionData?.institution}</Text>
                        </Row>
                        <Row>
                            <Text>{sectionData?.startYear} - {sectionData?.endYear} ({sectionData?.currentSituation})</Text>
                        </Row>
                    </Col>
                    <Col span={4}>
                        <EditOutlined />
                    </Col>
                </>
            case resumeSections.HRBackground:
                return <>
                    <Col span={20}>
                        <Row>
                            <Text>{sectionData?.title}</Text>
                        </Row>
                        <Row>
                            <Text>{sectionData?.institution}</Text>
                        </Row>
                        <Row>
                            <Text>{sectionData?.startYear} - {sectionData?.endYear} ({sectionData?.currentSituation})</Text>
                        </Row>
                    </Col>
                    <Col span={4}>
                        <EditOutlined />
                    </Col>
                </>
            case resumeSections.EvaluationBackground:
                return <>
                    <Col span={20}>
                        <Row>
                            <Text>{sectionData?.title}</Text>
                        </Row>
                        <Row>
                            <Text>{sectionData?.institution}</Text>
                        </Row>
                        <Row>
                            <Text>{sectionData?.startYear} - {sectionData?.endYear} ({sectionData?.currentSituation})</Text>
                        </Row>
                    </Col>
                    <Col span={4}>
                        <EditOutlined />
                    </Col>
                </>
            case resumeSections.STBackground:
                return <>
                    <Col span={20}>
                        <Row>
                            <Text>{sectionData?.title}</Text>
                        </Row>
                        <Row>
                            <Text>{sectionData?.institution}</Text>
                        </Row>
                        <Row>
                            <Text>{sectionData?.startYear} - {sectionData?.endYear} ({sectionData?.currentSituation})</Text>
                        </Row>
                    </Col>
                    <Col span={4}>
                        <EditOutlined />
                    </Col>
                </>
            case resumeSections.AcademicProduction:
                return <>
                    <Col span={20}>
                        <Row>
                            <Text>{sectionData?.title}</Text>
                        </Row>
                        <Row>
                            <Text>{sectionData?.institution}</Text>
                        </Row>
                        <Row>
                            <Text>{sectionData?.endYear} ({sectionData?.currentSituation})</Text>
                        </Row>
                    </Col>
                    <Col span={4}>
                        <EditOutlined />
                    </Col>
                </>
            case resumeSections.Award:
                return <>
                    <Col span={20}>
                        <Row>
                            <Text>{sectionData?.title}</Text>
                        </Row>
                        <Row>
                            <Text>{sectionData?.institution}</Text>
                        </Row>
                        <Row>
                            <Text>{sectionData?.endYear} ({sectionData?.currentSituation})</Text>
                        </Row>
                    </Col>
                    <Col span={4}>
                        <EditOutlined />
                    </Col>
                </>
            case resumeSections.Other:
                return <>
                    <Col span={20}>
                        <Row>
                            <Text>{sectionData?.title}</Text>
                        </Row>
                        <Row>
                            <Text>{sectionData?.institution}</Text>
                        </Row>
                        <Row>
                            <Text>{sectionData?.startYear} - {sectionData?.endYear} ({sectionData?.currentSituation})</Text>
                        </Row>
                    </Col>
                    <Col span={4}>
                        <EditOutlined />
                    </Col>
                </>
            default:
                return <Text>Seccion en desarrollo</Text>
        }
    }

    return (
        <>
            <Card style={{ width: '80%' }}>
                <Row>
                    <Col span={22}>
                        <Title level={5}>{getTitleSection(props.data?.sectionType)}</Title>
                    </Col>
                    <Col span={2} >
                        <PlusOutlined />
                    </Col>
                </Row>
                {
                    props.data?.sectionData?.length > 0 ?
                        <Row>
                            {props.data.sectionData.map(x => getSectionBody(props.data?.sectionType, x))}
                        </Row>
                        :
                        <Row>
                            <Text>Aún no has cargado ningun elemento en esta categoría</Text>
                        </Row>
                }
            </Card>
        </>
    )
}