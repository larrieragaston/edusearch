import React, { useState, useEffect } from 'react'
import { Row, Typography } from 'antd';
import contestService from '../../services/contest';
import Contest from '../../components/Contest'
import DashboardNumber from '../../components/DashboardNumber'
import WelcomeTitle from '../../components/WelcomeTitle'
import { noInformation } from '../../constants';

const { Text } = Typography

export default function Home() {
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
                <WelcomeTitle data={{ name: 'Gastón' }} />
            </Row>
            <Row style={{paddingBottom:'2em'}}>
                <DashboardNumber data={{ quantity: 4, type: 'NEW_CONTESTS' }} />
                <DashboardNumber data={{ quantity: '80%', type: 'PERSONAL_DATA_COMPLETED' }} />
                <DashboardNumber data={{ quantity: 1, type: 'ACTIVE_APPLICATIONS' }} />
                <DashboardNumber data={{ quantity: 1, type: 'FAVOURITE_TO_EXPIRE' }} />
            </Row>
            <Row>
                <Text style={{ fontSize: '20px', color: '#0262CF', paddingBottom: '0.9em' }}>Busquedas Activas ({contestsCount})</Text>
            </Row>
            <Row>
                {contests ? contests.map(x => <Contest key={x._id} data={x} />) : noInformation}
            </Row>
        </React.Fragment>
    )
}