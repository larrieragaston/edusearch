import React, { useState, useEffect } from 'react'
import Contest from '../../components/Contest'
import contestService from '../../services/contest';
import { Row, Typography } from 'antd';
import { noInformation } from '../../constants';

const { Text } = Typography

export default function Contests() {
    const [contests, setContests] = useState([])
    const [contestsCount, setContestsCount] = useState(0)

    useEffect(() => {
        async function fetchData() {
            const contestForUser = await contestService.getContestForUser()
            setContests(contestForUser)
            setContestsCount(contestForUser.length)
        }
        fetchData()
    }, [])

    return (
        <React.Fragment>
            <Row>
                <Text style={{ fontSize: '20px' }}>Busquedas Activas({contestsCount})</Text>
            </Row>
            <Row>
                {contests ? contests.map(x => <Contest key={x._id} data={x} />) : noInformation}
            </Row>
        </React.Fragment>
    )
}