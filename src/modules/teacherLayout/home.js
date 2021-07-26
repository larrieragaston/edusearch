import React, { useState, useEffect } from 'react'
import { Row, Typography } from 'antd';
import teacherContestService from '../../services/teacherContest';
import Contest from '../../components/Contest'
import DashboardNumber from '../../components/DashboardNumber'
import WelcomeTitle from '../../components/WelcomeTitle'
import { noInformation } from '../../constants';

const { Text } = Typography

export default function Home() {

    const [contests, setContests] = useState([])

    useEffect(() => {
        async function fetchData() {
            const response = await teacherContestService.getContestForUser()
            console.log(response)
            setContests(response)
        }
        fetchData()
    }, [])

    return (
        <React.Fragment>
            <Row>
                <WelcomeTitle data={{ name: 'Gastón' }} />
            </Row>
            <Row>
                <DashboardNumber data={{ quantity: 4, type: 'NEW_CONTESTS' }} />
                <DashboardNumber data={{ quantity: '80%', type: 'PERSONAL_DATA_COMPLETED' }} />
                <DashboardNumber data={{ quantity: 1, type: 'NEW_CONTESTS' }} />
            </Row>
            <Row>
                <Text style={{ fontSize: '20px' }}>Concursos Activos</Text>
            </Row>
            <Row>
                {contests ? contests.map(x => <Contest data={x} />) : noInformation}
                {/* <Contest data={{ subjectName: 'Programacion I', periodType: 'Anual', universityName: 'UADE', hasPostulation: true, days: ['Lunes', 'Martres', 'Miercoles'], dueDate: '25/08/2021', scheduleFrom: '08:00', scheduleTo: '12:00' }} />
                <Contest data={{ subjectName: 'Programacion I', periodType: 'Anual', universityName: 'UADE', hasPostulation: true, days: ['Lunes', 'Martres', 'Miercoles'], dueDate: '25/08/2021', scheduleFrom: '08:00', scheduleTo: '12:00' }} />
                <Contest data={{ subjectName: 'Programacion I', periodType: 'Anual', universityName: 'UADE', hasPostulation: true, days: ['Lunes', 'Martres', 'Miercoles'], dueDate: '25/08/2021', scheduleFrom: '08:00', scheduleTo: '12:00' }} />
                <Contest data={{ subjectName: 'Programacion I', periodType: 'Anual', universityName: 'UADE', hasPostulation: true, days: ['Lunes', 'Martres', 'Miercoles'], dueDate: '25/08/2021', scheduleFrom: '08:00', scheduleTo: '12:00' }} />
                <Contest data={{ subjectName: 'Programacion I', periodType: 'Anual', universityName: 'UADE', hasPostulation: true, days: ['Lunes', 'Martres', 'Miercoles'], dueDate: '25/08/2021', scheduleFrom: '08:00', scheduleTo: '12:00' }} />
                <Contest data={{ subjectName: 'Programacion I', periodType: 'Anual', universityName: 'UADE', hasPostulation: true, days: ['Lunes', 'Martres', 'Miercoles'], dueDate: '25/08/2021', scheduleFrom: '08:00', scheduleTo: '12:00' }} />
                <Contest data={{ subjectName: 'Programacion I', periodType: 'Anual', universityName: 'UADE', hasPostulation: true, days: ['Lunes', 'Martres', 'Miercoles'], dueDate: '25/08/2021', scheduleFrom: '08:00', scheduleTo: '12:00' }} />
                <Contest data={{ subjectName: 'Programacion I', periodType: 'Anual', universityName: 'UADE', hasPostulation: true, days: ['Lunes', 'Martres', 'Miercoles'], dueDate: '25/08/2021', scheduleFrom: '08:00', scheduleTo: '12:00' }} /> */}
            </Row>
        </React.Fragment>
    )
}