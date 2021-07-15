import React from 'react'
import Contest from '../../components/Contest'
import DashboardNumber from '../../components/DashboardNumber'
import WelcomeTitle from '../../components/WelcomeTitle'

export default function Home() {
    return (
        <React.Fragment>
            <WelcomeTitle data={{ name: 'Gastón' }} />
            <DashboardNumber data={{ quantity: 4, type: 'NEW_CONTESTS' }} />
            <Contest data={{ subjectName: 'Programacion I', periodType: 'Anual', universityName: 'UADE', hasPostulation: true, days: ['Lunes', 'Martres', 'Miercoles'], dueDate: '25/08/2021', scheduleFrom: '08:00', scheduleTo: '12:00' }} />
        </React.Fragment>
    )
}