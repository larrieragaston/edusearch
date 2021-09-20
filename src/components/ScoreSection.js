import React from "react";
import { Card, Row, Col, Typography } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { resumeSections, degreeTypes } from "../constants";

const { Text, Title } = Typography;

export default function ScoreSection(props) {
	const getDegreeType = (type) => {
		return degreeTypes.filter((x) => x.value === type)[0]?.description ?? null;
	};

	const getSectionTitle = (sectionType) => {
		return resumeSections.filter((x) => x.value === sectionType)[0]
			?.description;
	};

	const getSectionBody = (sectionData) => {
		if (sectionData.type === "Degree") {
			degreeTypes.map(function (dt) {
				const subType = getDegreeType(dt.value);
				const score = sectionData.scores?.filter((x) => x.subType)[0] ?? 0;
				return (
					<>
						<Col span={20} style={{ paddingTop: 10, paddingLeft: 20 }}>
							<Row style={{ paddingLeft: "20px" }}>
								<Text style={{ color: "#666666" }}>
									{subType} - Valor asignado: {score}
								</Text>
							</Row>
						</Col>
						<Col span={4} style={{ alignItems: "center" }}>
							<EditOutlined
								style={{ color: "#0262CF", padding: 5, fontSize: "16px" }}
								// onClick={() => showModal(sectionData)}
							/>
						</Col>
					</>
				);
			});
		} else {
			return (
				<>
					<Col span={20} style={{ paddingTop: 10, paddingLeft: 20 }}>
						<Row style={{ paddingLeft: "20px" }}>
							<Text style={{ color: "#666666" }}>
								Valor asignado: {sectionData?.score[0] ?? 0}
							</Text>
						</Row>
					</Col>
					<Col span={4} style={{ alignItems: "center" }}>
						<EditOutlined
							style={{ color: "#0262CF", padding: 5, fontSize: "16px" }}
							// onClick={() => showModal(sectionData)}
						/>
					</Col>
				</>
			);
		}
	};

	return (
		<>
			<Card
				id={props.data?.sectionType}
				style={{
					width: 800,
					margin: "0.5em",
					borderRadius: 5,
					boxShadow: "0px 7px 6px rgb(0 0 0 / 7%)",
				}}
				bodyStyle={{ padding: "20px" }}
			>
				<Row style={{ alignItems: "center" }}>
					<Col span={22}>
						<Title level={5} style={{ color: "#0262CF" }}>
							{getSectionTitle(props.data?.sectionType)}
						</Title>
					</Col>
				</Row>
				<Row style={{ alignItems: "center" }}>{getSectionBody(props.data)}</Row>
			</Card>
		</>
	);
}
