import React from 'react'
import { Card, Row, Typography } from 'antd'
import { dashboardCardTypes } from '../constants'

const { Title, Text } = Typography

export default function DashboardNumber({ data }) {

    const getCardText = (type) => {
        switch (type) {
            case dashboardCardTypes.FAVOURITE_TO_EXPIRE:
                return 'De tus cursos favoritos se encuentran próximos a vencer'
            case dashboardCardTypes.PERSONAL_DATA_COMPLETED:
                return 'De tus datos personales se encuentran completados'
            case dashboardCardTypes.ACTIVE_APPLICATIONS:
                return 'De tus postulaciones a cursos se encuentran activas'
            case dashboardCardTypes.PUBLISHED_RESULTS:
                return 'Cursos en los que te has postulado han publicado sus resultados'
            case dashboardCardTypes.NEW_CONTESTS:
                return 'Nuevos concursos han sido publicados que pueden ser de tu interes'
            default:
                return 'ERROR'
        }
    }

    return (
        <Card style={{ width: 250 }}>
            <Row justify='center'><Title level={2} style={{ color: 'blue' }}>{data.quantity}</Title></Row>
            <Row>
                <Text style={{ textAlign: 'center' }}>
                    {getCardText(data.type)}
                </Text>
            </Row>
        </Card>
    )
}