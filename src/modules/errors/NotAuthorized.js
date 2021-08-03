import React from 'react'
import { Result, Button } from 'antd'
import { navigate } from '@reach/router'

function NotAuthorized() {
    return (
        <Result
            status="403"
            title="403"
            subTitle="Lo sentimos, no está autorizado a ingresar a esta pagina."
            extra={<Button type="primary" onClick={() => navigate('/dashboard')}>Volver al inicio</Button>}
        />
    )
}

export default NotAuthorized