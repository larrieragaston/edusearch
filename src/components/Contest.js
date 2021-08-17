import React, { useState } from "react";
import { Card, Row, Col, Typography, Button, Modal } from "antd";
// import logoSrc from "../assets/logo.png";
import uadeSrc from "../assets/uade.png";
// import udesaSrc from "../assets/udesa.png";
import {
  HeartOutlined,
  HeartFilled,
  ExclamationCircleOutlined,
  ClockCircleOutlined,
  CalendarOutlined,
  ApartmentOutlined
} from "@ant-design/icons";
import { noInformation, periodTypes } from "../constants";
import moment from "moment";
import { navigate } from "@reach/router";
import postulationService from "../services/postulation";
import favouriteService from "./../services/favourite";

const { Text } = Typography;
const { confirm } = Modal;

export default function Contest({ data }) {
  const [hasPostulation, setHasPostulation] = useState(data?.hasPostulation);
  const [isFavourite, setIsFavourite] = useState(data?.isFavourite);

  const getPeriodType = (type) => {
    return periodTypes.filter((x) => x.value === type)[0]?.description ?? null;
  };

  function showConfirmPostulation(contestId) {
    confirm({
      title: "Esta seguro que desea postularse?",
      icon: <ExclamationCircleOutlined />,
      content: "Si se postula, no podra revertirlo",
      okText: "Confirmar",
      cancelText: "Cancelar",
      async onOk() {
        console.log("Confirmar");
        try {
          const payload = { contest: contestId };
          await postulationService.postulate(payload);
          success();
        } catch (e) {
          error();
        }
      },
      onCancel() {
        console.log("Cancelar");
      },
    });
  }

  function success() {
    setHasPostulation(true);
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
    <Card style={{ width: '25em', margin: '0.5em', borderRadius: '5px', boxShadow: '0px 7px 6px rgb(0 0 0 / 7%)' }} bodyStyle={{ padding: '15px' }}>
      <Row>
        <Col span={12}>
          <Text type="secondary" style={{ fontSize: '14px' }}> Fecha de finalización: <br /> {data?.dueDate
            ? moment(data.dueDate, "YYYY-MM-DDT00:00:00.000+00:00").format(
              "DD-MM-YYYY"
            )
            : noInformation}</Text>
        </Col>
        <Col span={10} offset={2}>
          <img alt={"logo-uade"} src={uadeSrc} style={{ maxWidth: '9em' }} />
        </Col>
      </Row>
      <Row>
        {isFavourite ? (
          <HeartFilled style={{ color: "#e01616", fontSize: 20, paddingTop: '0.3em', paddingBottom: '0.4em', paddingLeft: '0.2em' }} onClick={() => deleteFavourite(data._id)} />
        ) : (
          <HeartOutlined style={{ color: '#0262CF', fontSize: 20, paddingTop: '0.3em', paddingBottom: '0.4em', paddingLeft: '0.2em' }} onClick={() => saveFavourite(data._id)} />
        )}
      </Row>
      <Row>
        <Text style={{ fontSize: '20px' }} strong>{data?.subject?.name ?? noInformation}</Text>
      </Row>
      <Col span={6}>
        <hr style={{ border: '1px solid #0262CF', marginTop: '0' }} />
      </Col>
      <Row style={{ paddingTop: '1em', alignItems: 'center' }}>
        <ClockCircleOutlined style={{ color: '#0262CF', paddingLeft: '0.3em', paddingRight: '0.5em' }} />
        <Text>
          {data?.day ?? noInformation} -{" "}
          {data?.startsAt || data?.endsAt
            ? data?.startsAt + "hs a " + data?.endsAt + "hs"
            : noInformation}
        </Text>
      </Row>
      <Row style={{ alignItems: 'center' }}>
        <CalendarOutlined style={{ color: '#0262CF', paddingLeft: '0.3em', paddingRight: '0.5em' }} />
        <Text>
          Periodo {getPeriodType(data?.subject?.periodType) ?? noInformation}
        </Text>
      </Row>
      <Row style={{ paddingBottom: '1em', alignItems: 'center' }} >
        <ApartmentOutlined style={{ color: '#0262CF', paddingLeft: '0.3em', paddingRight: '0.5em' }} />
        <Text>{data?.university?.name ?? noInformation}</Text>
      </Row>
      <Row justify="end">
        <Button type="link" onClick={() => navigate("/contest/" + data._id)}>
          Ver Detalle
        </Button>
        {hasPostulation ? (
          <Button type="primary" disabled>
            Postulado
          </Button>
        ) : (
          <Button
            type="primary"
            onClick={() => showConfirmPostulation(data._id)}
          >
            Postularme
          </Button>
        )}
      </Row>
    </Card>
  );
}
