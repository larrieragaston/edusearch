import React from 'react'
import { Result, Button } from 'antd'
import { navigate } from '@reach/router'

function ServerError() {
    return (
        <Result
            status="500"
            title="500"
            subTitle="Lo sentimos, ha ocurrido un error inesperado."
            extra={<Button type="primary" onClick={() => navigate('/dashboard')}>Volver al inicio</Button>}
        />
    )
}

export default ServerError