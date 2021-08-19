import React, { useEffect, useState } from "react";
import {
  Row,
  Col,
  Typography,
  Button,
  Divider,
  Tabs,
  Steps,
  List,
  Modal,
} from "antd";
import logoSrc from "../../assets/uade.png";
import { HeartOutlined, DownloadOutlined, HeartFilled, ClockCircleOutlined, CalendarOutlined, ApartmentOutlined } from "@ant-design/icons";
import { contestSteps, noInformation, periodTypes } from "../../constants";
import contestService from "../../services/contest";
import postulationService from "../../services/postulation";
import favouriteService from "../../services/favourite";
import moment from "moment";

const { Text } = Typography;
const { TabPane } = Tabs;
const { Step } = Steps;

export default function ContestDetails(props) {
  const [data, setContest] = useState([]);
  const [hasPostulation, setHasPostulation] = useState(data?.hasPostulation);
  const [isFavourite, setIsFavourite] = useState(data?.isFavourite);

  useEffect(() => {
    async function fetchData() {
      const contest = await contestService.getContestById(props.id);
      setContest(contest);
      setHasPostulation(contest.hasPostulation)
      setIsFavourite(contest.isFavourite)
    }
    fetchData();
  }, [props.id]);

  const getPeriodType = (type) => {
    return periodTypes.filter((x) => x.value === type)[0]?.description ?? null;
  };

  const getSteps = (hasColloquium) => {
    if (hasColloquium)
      return contestSteps
        .filter((x) => x !== "Coloquio")
        .map((x) => <Step key={x} title={x} />);
    else return contestSteps.map((x) => <Step key={x} title={x} />);
  };

  const getDaysDifferenceText = (date) => {
    const dateMoment = moment(date, "YYYY-MM-DDT00:00:00.000+00:00");
    const today = moment();
    const diffDays = dateMoment.diff(today, "days");
    return diffDays < 0
      ? `Las posulaciones ya se encuentran cerradas`
      : `Quedan ${diffDays} días para que se cierren las postulaciones`;
  };

  function success() {
    Modal.success({
      title: "Felicitaciones!",
      content: "Muchas gracias por su postulacion",
    });
  }

  function error() {
    Modal.error({
      title: "Ups!",
      content: "No se ha podido realizar la postulacion",
    });
  }

  const postulate = async (contestId) => {
    try {
      const payload = { contest: contestId };
      await postulationService.postulate(payload);
      setHasPostulation(true);
      success();
    } catch (e) {
      console.log(e);
      error();
    }
  };

  const saveFavourite = async (contestId) => {
    console.log("saveFavourite");
    try {
      const payload = { contest: contestId };
      await favouriteService.save(payload);
      setIsFavourite(true)
      Modal.success({
        title: "Se ha guardado correctamente!",
      });
    } catch (e) {
      Modal.error({
        title: "No se ha guardar el elemento como favoritos!",
      });
    }
  };

  const deleteFavourite = async (contestId) => {
    console.log("saveFavourite");
    try {
      await favouriteService.deleteFavourite(contestId);
      setIsFavourite(false)
      Modal.success({
        title: "Se ha borrado correctamente!",
      });
    } catch (e) {
      Modal.error({
        title: "No se ha podido quitar el elemento de sus favoritos!",
      });
    }
  };

  return (
    <React.Fragment>
      <Row style={{ paddingTop: '2em', paddingLeft: '1em' }}>
        <Col span={12}>
          <Row style={{ alignItems: 'center' }}>
            <Text style={{ fontSize: '26px' }}>{data.subject?.name ?? noInformation}</Text>
            {isFavourite ? (
              <HeartFilled
                style={{ color: "#e01616", fontSize: 20, paddingLeft: '0.5em' }}
                onClick={() => deleteFavourite(data._id)}
              />
            ) : (
              <HeartOutlined
                style={{ color: '#0262CF', fontSize: 20, paddingTop: '0.3em', paddingBottom: '0.4em', paddingLeft: '0.5em' }}
                onClick={() => saveFavourite(data._id)}
              />
            )}
          </Row>
          <Row style={{ fontStyle: 'italic', fontSize: '14px', paddingBottom: '0.7em' }}>
            {data.dueDate ? (
              <Text>{getDaysDifferenceText(data.dueDate)}</Text>
            ) : (
              <Text>No se ha establecido fecha para el cierre de postulaciones</Text>
            )}
          </Row>
        </Col>
        <Col span={10}>
          <Row justify="end">
            <img height={50} alt={"logo-EduSearch"} src={logoSrc} />
          </Row>
        </Col>
        <Col span={12}>
          <Row style={{ alignItems: 'center' }}>
            <ClockCircleOutlined style={{ color: '#0262CF', paddingLeft: '0.3em', paddingRight: '0.5em' }} />
            <Text>
              {data.day ?? noInformation} -{" "}
              {data.startsAt || data.endsAt
                ? data.startsAt + "hs a " + data.endsAt + "hs"
                : noInformation}
            </Text>
          </Row>
          <Row>
            <CalendarOutlined style={{ color: '#0262CF', paddingLeft: '0.3em', paddingRight: '0.5em' }} />
            <Text>
              Periodo{" "}
              {getPeriodType(data?.subject?.periodType) ?? noInformation}
            </Text>
          </Row>
          <Row>
            <ApartmentOutlined style={{ color: '#0262CF', paddingLeft: '0.3em', paddingRight: '0.5em' }} />
            <Text>{data.university?.name ?? noInformation}</Text>
          </Row>
        </Col>

        <Col span={10} style={{ alignSelf: 'flex-end' }}>
          <Row justify="end">
            {hasPostulation ? (
              <Button type="primary" disabled>
                Postulado
              </Button>
            ) : (
              <Button type="primary" onClick={() => postulate(data._id)}>
                Postularme
              </Button>
            )}
          </Row>
        </Col>
      </Row>
      <Divider />
      <Row>
        <Tabs defaultActiveKey="1">
          <TabPane tab="Requisitos" key="1">
            {data.requirements ? (
              <List
                size="small"
                dataSource={data.requirements}
                split={false}
                renderItem={(item) => (
                  item.optional ?
                    <List.Item style={{ fontStyle: 'italic', fontSize: '14px', color: "#CCCCCC" }}>
                      - {item.name}{" "}
                    </List.Item> :
                    <List.Item style={{ fontStyle: 'italic', fontSize: '14px' }}>
                      - {item.name}{" "}
                    </List.Item>
                )}
              />
            ) : (
              <Text>{noInformation}</Text>
            )}
          </TabPane>
          <TabPane tab="Programa" key="2">
            <Row>
              <Text>{data.subject?.name ?? noInformation}</Text>
            </Row>
            <Row>
              <Button
                type="primary"
                icon={<DownloadOutlined />}
                size="large"
                shape="round"
                href=""
                download="Programa"
              >
                Descargar Programa
              </Button>
            </Row>
          </TabPane>
        </Tabs>
      </Row>
      <Divider />
      <Row>
        <Text style={{ color: '#0262CF', fontSize: '26px', paddingBottom: '1.5em' }}>Etapa de busqueda</Text>
        <Steps progressDot current={data.activeStage ?? 0}>
          {getSteps(data.hasColloquium)}
        </Steps>
      </Row>
    </React.Fragment>
  );
}
