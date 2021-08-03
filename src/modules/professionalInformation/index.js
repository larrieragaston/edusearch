import React from 'react'
import { Result, Button } from 'antd'
import { navigate } from '@reach/router'

export default function ProfessionalInformation() {
    return (
        <React.Fragment>
            <Result
                status="warning"
                title="Sección Mi CV en desarrollo"
                extra={<Button type="primary" key="backToHome" onClick={() => navigate('/dashboard')}>Volver al inicio</Button>}
            />
        </React.Fragment>
    )
}