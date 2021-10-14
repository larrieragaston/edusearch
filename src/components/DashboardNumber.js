import React from 'react'
import { Card, Typography } from 'antd'
import { dashboardCardTypes } from '../constants'

const { Title } = Typography

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
            case dashboardCardTypes.ACTIVE_CONTESTS:
                return 'Concursos Activos'
            case dashboardCardTypes.DRAFT_CONTESTS:
                return 'Concursos en Borradores'
            case dashboardCardTypes.CAREERS_UPLOADED:
                return 'Carreras Cargadas'
            case dashboardCardTypes.USERS:
                return 'Usuarios'
            default:
                return 'ERROR'
        }
    }

    return (
        <Card style={{ width: '16em', margin: '0.5em', borderRadius: '5px', textAlign: 'center', boxShadow: '0px 7px 6px rgb(0 0 0 / 7%)' }} bodyStyle={{padding: '10px'}}>
            <Title level={2} style={{ color: '#0262cf', marginBottom: '0.2em' }}>{data.quantity}</Title>
            <p style={{lineHeight: '20px'}}>{getCardText(data.type)}</p>
        </Card>
    )
}