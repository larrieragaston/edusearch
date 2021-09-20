import React, { useState, useEffect } from "react";
import { Row, Typography } from 'antd';
import { resumeSections } from '../../constants';
import scoreService from './../../services/score';
import styles from './score.module.css';
import ScoreSection from "../../components/ScoreSection";

const { Text, Title } = Typography;

export default function ScoreTable() {
	const [data, setData] = useState([])

	useEffect(() => {
		async function fetchData() {
			const response = await scoreService.getScores();
			setData(response)
		}
		fetchData();
	}, []);

	
    const getSectionScores = (sectionType) => {
		const scores = data?.filter(x => x.type === sectionType)
        return { sectionType: sectionType, scores: scores }
    }

	return (
		<React.Fragment>
            <Row justify='center'>
                <Title level={3} className={styles.sectiontitle}>Tabla de puntaje</Title>
            </Row>
            <Row justify='center'>
                <Text type='secondary' className={styles.sectionsubtitle}>Asigna manualmente un puntaje numérico a cada una de las categorías, (solo los usuarios categoría administrador podrán editarlo).</Text>
            </Row>
            <Row justify='center'>
                {resumeSections.map(rs => <ScoreSection data={getSectionScores(rs.value)} />)}
            </Row>
		</React.Fragment>
	);
}
