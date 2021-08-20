import React, { useState, useEffect, useContext } from 'react'
import { Row, Typography } from 'antd';
import { UserContext } from '../../contexts/userContext';
import ResumeSection from '../../components/ResumeSection';
import { resumeSections } from '../../constants';
import styles from './professional.module.css';

const { Text, Title } = Typography;

export default function ProfessionalInformation() {
    const [data, setData] = useState({})

    const { userData, setUserData } = useContext(UserContext)

    useEffect(() => {
        setData(userData)
    }, [userData])

    const getSectionData = (sectionType) => {
        const sectionData = data?.professionalInformation?.filter(x => x.type === sectionType)
        return { sectionType: sectionType, sectionData: sectionData }
    }

    return (
        <React.Fragment>
            <Row justify='center'>
                <Title level={3} className={styles.sectiontitle}>Mi CV</Title>
            </Row>
            <Row justify='center'>
                <Text type='secondary' className={styles.sectionsubtitle}>Información sobre tu formación académica y profesional.</Text>
            </Row>
            <Row justify='center'>
                {resumeSections.map(x => <ResumeSection data={getSectionData(x.value)} />)}
            </Row>
        </React.Fragment>
    )
}