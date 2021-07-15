import React from 'react'
import { Result, Button } from 'antd'
import { navigate } from '@reach/router'

function NotFound() {
    return (
        <Result
            status="404"
            title="404"
            subTitle="Lo sentimos, la pagina que está tratando de visitar no existe."
            extra={<Button type="primary" onClick={() => navigate('/login')}>Volver al inicio</Button>}
        />
    )
}

export default NotFound