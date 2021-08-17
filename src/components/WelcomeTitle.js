import React from 'react'
import { Typography } from 'antd';
const { Text } = Typography;


export default function WelcomeTitle(props) {
    return (
        <Text style={{ fontSize: '26px', paddingTop: '0.5em'  }}>¡Hola, <Text strong style={{ color: '#0262CF' }}>{props.data.firstName}</Text>!</Text>
    )
}