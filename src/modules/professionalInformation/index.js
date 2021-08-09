import React, { useState, useEffect, useContext } from 'react'
import { Card, Row, Col, Typography, Button, Form, Input, DatePicker, Select, InputNumber, Divider } from 'antd';
import { UserContext } from '../../contexts/userContext';
import ResumeSection from '../../components/ResumeSection';
import { resumeSectionsEnum } from '../../constants';

const { Text, Title } = Typography;

export default function ProfessionalInformation() {
    const [data, setData] = useState({})
    const [isEditing, setIsEditing] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)

    const { userData, setUserData } = useContext(UserContext)

    useEffect(() => {
        setData(userData)
    }, [userData])

    const getSectionData = (sectionType) => {
        const sectionData = data?.professionalInformation?.filter(x => x.type == sectionType)
        return { sectionType: sectionType, sectionData: sectionData }
    }

    return (
        <React.Fragment>
            <Row justify='center'>
                <Title level={3}>Mi CV</Title>
            </Row>
            <Row justify='center'>
                <Text type='secondary'>Información sobre tu formacion académica y profesional</Text>
            </Row>
            <Row justify='center'>
                {resumeSectionsEnum.map(x => <ResumeSection data={getSectionData(x)} />)}
            </Row>
        </React.Fragment>
    )
}