import React from 'react'
import { Typography } from 'antd';
const { Text } = Typography;


export default function WelcomeTitle({ data }) {
    return (
        <Text style={{ fontSize: '20px' }}>¡Hola <Text strong style={{ color: 'blue' }}>{data.name}</Text>!</Text>
    )
}