import React, { useState, useContext } from "react";
import {
  Card,
  Row,
  Col,
  Typography,
  Button,
  Form,
  Input,
  Select,
  InputNumber,
  Modal,
} from "antd";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import {
  resumeSections,
  noInformationSection,
  degreeTypes,
  situationTypes,
} from "../constants";
import degreeService from "./../services/degree";
import { UserContext } from "../contexts/userContext";

const { Text, Title } = Typography;
const { Option } = Select;
const { confirm } = Modal;

export default function ResumeSection(props) {
  const [visible, setVisible] = useState(false);
  const [modalData, setModalData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [degreeId, setDegreeId] = useState(0);
  const [type, setType] = useState(props.data?.sectionType);
  const { userData, setUserData } = useContext(UserContext);

  const getDegreeType = (type) => {
    return degreeTypes.filter(x => x.value == type)[0]?.description ?? null
  }

  const showModal = (sectionData) => {
    setModalData(sectionData);
    if (sectionData) setDegreeId(sectionData._id);
    setVisible(true);
  };

  function showConfirm(sectionData) {
    confirm({
      title: "Esta seguro que desea eliminar este item?",
      icon: <ExclamationCircleOutlined />,
      content: "Si lo elimina, no podra revertirlo",
      okText: "Confirmar",
      okType: "danger",
      cancelText: "Cancelar",
      async onOk() {
        console.log("Confirmar");
        try {
          await degreeService.deleteDegree(sectionData._id);
          let degrees = userData.professionalInformation.filter(
            (x) => x._id !== sectionData._id
          );
          setUserData({ ...userData, professionalInformation: degrees });
        } catch (e) {
          console.log(e);
        }
      },
      onCancel() {
        console.log("Cancelar");
      },
    });
  }

  const createOrUpdate = async (values) => {
    setIsSubmitting(true);
    const payload = { ...values, type };
    try {
      if (degreeId) {
        const response = await degreeService.putDegree(degreeId, payload);
        let degrees = userData.professionalInformation.map((x) =>
          x._id === degreeId ? response : x
        );
        setUserData({ ...userData, professionalInformation: degrees });
      } else {
        const response = await degreeService.postDegree(payload);
        let degrees = userData.professionalInformation;
        degrees.push(response);
        setUserData({ ...userData, professionalInformation: degrees });
      }
    } catch (e) {
      console.log(e);
    } finally {
      setIsSubmitting(false);
      setVisible(false);
    }
  };

  const cancelCreateOrUpdate = () => {
    setVisible(false);
  };

  const getSectionTitle = (sectionType) => {
    switch (sectionType) {
      case resumeSections.Degree:
        return "Formación superior y media";
      case resumeSections.FurtherTraining:
        return "Formacion complementaria";
      case resumeSections.Scholarship:
        return "Becas";
      case resumeSections.TeachingBackground:
        return "Antecedentes en docencia";
      case resumeSections.ManagementBackground:
        return "Antecedentes en gestión";
      case resumeSections.ResearchBackground:
        return "Antecedentes en investigación";
      case resumeSections.HRBackground:
        return "Antecedentes en formación y RRHH";
      case resumeSections.EvaluationBackground:
        return "Antecedentes en evaluación";
      case resumeSections.STBackground:
        return "Antecedentes en ciencia y tecnología";
      case resumeSections.AcademicProduction:
        return "Producciones academicas";
      case resumeSections.Award:
        return "Premios";
      case resumeSections.Other:
        return "Otros antecedentes profesionales relevantes";
      default:
        return "ERROR";
    }
  };

  const getSectionFields = (sectionType) => {
    switch (sectionType) {
      case resumeSections.Degree:
        return {
          subType: true,
          institution: true,
          title: true,
          startYear: true,
          endYear: true,
          currentSituation: true,
        };
      case resumeSections.FurtherTraining:
        return {
          subType: true,
          title: true,
          institution: true,
          endYear: true,
        };
      case resumeSections.Scholarship:
        return {
          title: true,
          subType: true,
          institution: true,
          startYear: true,
          endYear: true,
          currentSituation: true,
        };
      case resumeSections.TeachingBackground:
        return {
          subType: true,
          title: true,
          institution: true,
          startYear: true,
          endYear: true,
          currentSituation: true,
          subject: true,
          duration: true,
        };
      case resumeSections.ManagementBackground:
        return {
          subType: true,
          title: true,
          institution: true,
          startYear: true,
          endYear: true,
          currentSituation: true,
        };
      case resumeSections.ResearchBackground:
        return {
          title: true,
          institution: true,
          startYear: true,
          endYear: true,
          currentSituation: true,
        };
      case resumeSections.HRBackground:
        return {
          title: true,
          institution: true,
          startYear: true,
          endYear: true,
          currentSituation: true,
        };
      case resumeSections.EvaluationBackground:
        return {
          title: true,
          institution: true,
          startYear: true,
          endYear: true,
          currentSituation: true,
        };
      case resumeSections.STBackground:
        return {
          title: true,
          institution: true,
          startYear: true,
          endYear: true,
          currentSituation: true,
        };
      case resumeSections.AcademicProduction:
        return {
          title: true,
          institution: true,
          endYear: true,
          currentSituation: true,
        };
      case resumeSections.Award:
        return {
          title: true,
          institution: true,
          endYear: true,
          currentSituation: true,
        };
      case resumeSections.Other:
        return {
          title: true,
          institution: true,
          startYear: true,
          endYear: true,
          currentSituation: true,
        };
      default:
        return {};
    }
  };

  const getSectionBody = (sectionType, sectionData) => {
    const activeFields = getSectionFields(sectionType);

    return (
      <>
        <Col span={20}>
          {activeFields.subType ? (
            <Row>
              <Text>{getDegreeType(sectionData?.subType)}</Text>
            </Row>
          ) : (
            <></>
          )}
          {activeFields.institution ? (
            <Row>
              <Text>{sectionData?.institution}</Text>
            </Row>
          ) : (
            <></>
          )}
          {activeFields.title ? (
            <Row>
              <Text>{sectionData?.title}</Text>
            </Row>
          ) : (
            <></>
          )}
          {activeFields.startYear ? (
            <Row>
              <Text>
                {sectionData?.startYear} - {sectionData?.endYear} (
                {sectionData?.currentSituation})
              </Text>
            </Row>
          ) : activeFields.currentSituation ? (
            <Row>
              <Text>
                {sectionData?.endYear} ({sectionData?.currentSituation})
              </Text>
            </Row>
          ) : activeFields.endYear ? (
            <Row>
              <Text>{sectionData?.endYear}</Text>
            </Row>
          ) : (
            <></>
          )}
          {activeFields.subject ? (
            <Row>
              <Text>{sectionData?.subject}</Text>
            </Row>
          ) : (
            <></>
          )}
          {activeFields.duration ? (
            <Row>
              <Text>{sectionData?.duration}</Text>
            </Row>
          ) : (
            <></>
          )}
        </Col>
        <Col span={4}>
          <EditOutlined onClick={() => showModal(sectionData)} />
          <DeleteOutlined onClick={() => showConfirm(sectionData)} />
        </Col>
      </>
    );
  };

  const getModalBody = (sectionType, sectionData) => {
    const activeFields = getSectionFields(sectionType);

    return (
      <Form
        layout="inline"
        name="basic"
        preserve={false}
        initialValues={sectionData}
        // preserve={false}
        onFinish={createOrUpdate}
        // onFinishFailed={onFinishFailed}
      >
        {activeFields.subType ? (
          <Form.Item
            label="Tipo"
            name="subType"
            rules={[
              {
                required: true,
                message: "Campo obligatorio",
              },
            ]}
          >
            <Select
              placeholder="Seleccione un tipo"
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {degreeTypes.map((x) => (
                <Option key={x.value} value={x.value}>
                  {x.description}
                </Option>
              ))}
            </Select>
          </Form.Item>
        ) : (
          <></>
        )}
        {activeFields.subType ? (
          <Form.Item
            label="Institucion"
            name="institution"
            rules={[
              {
                required: true,
                message: "Campo obligatorio",
              },
            ]}
          >
            <Input />
          </Form.Item>
        ) : (
          <></>
        )}
        {activeFields.title ? (
          <Form.Item
            label="Titulo"
            name="title"
            rules={[
              {
                required: true,
                message: "Campo obligatorio",
              },
            ]}
          >
            <Input />
          </Form.Item>
        ) : (
          <></>
        )}
        {activeFields.startYear ? (
          <Form.Item
            label="Desde"
            name="startYear"
            rules={[
              {
                required: true,
                message: "Campo obligatorio",
              },
            ]}
          >
            <InputNumber min={1950} max={2021} />
          </Form.Item>
        ) : (
          <></>
        )}
        {activeFields.endYear ? (
          <Form.Item label="Hasta" name="endYear">
            <InputNumber min={1950} max={2021} />
          </Form.Item>
        ) : (
          <></>
        )}
        {activeFields.currentSituation ? (
          <Form.Item
            label="Situación Actual"
            name="currentSituation"
            rules={[
              {
                required: true,
                message: "Campo obligatorio",
              },
            ]}
          >
            <Select
              placeholder="Seleccione un estado"
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {situationTypes.map((x) => (
                <Option key={x.value} value={x.value}>
                  {x.description}
                </Option>
              ))}
            </Select>
          </Form.Item>
        ) : (
          <></>
        )}
        {activeFields.subject ? (
          <Form.Item
            label="Materia"
            name="subject"
            rules={[
              {
                required: true,
                message: "Campo obligatorio",
              },
            ]}
          >
            <Input />
          </Form.Item>
        ) : (
          <></>
        )}
        {activeFields.duration ? (
          <Form.Item
            label="Duration"
            name="duracion"
            rules={[
              {
                required: true,
                message: "Campo obligatorio",
              },
            ]}
          >
            <Input />
          </Form.Item>
        ) : (
          <></>
        )}
        {!isSubmitting ? (
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Guardar Cambios
            </Button>
            <Button type="link" onClick={() => cancelCreateOrUpdate()}>
              Cancelar
            </Button>
          </Form.Item>
        ) : (
          <Form.Item>
            <Button type="primary" loading block>
              Loading
            </Button>
            <Button type="link" disabled>
              Cancelar
            </Button>
          </Form.Item>
        )}
      </Form>
    );
  };

  return (
    <>
      <Card style={{ width: "80%" }}>
        <Row>
          <Col span={22}>
            <Title level={5}>{getSectionTitle(props.data?.sectionType)}</Title>
          </Col>
          <Col span={2}>
            <PlusOutlined onClick={() => showModal()} />
          </Col>
        </Row>
        {props.data?.sectionData?.length > 0 ? (
          <Row>
            {props.data.sectionData.map((x) =>
              getSectionBody(props.data?.sectionType, x)
            )}
          </Row>
        ) : (
          <Row>
            <Text>{noInformationSection}</Text>
          </Row>
        )}
      </Card>
      <Modal
        title={getSectionTitle(props.data?.sectionType)}
        visible={visible}
        onCancel={cancelCreateOrUpdate}
        footer={null}
      >
        {getModalBody(props.data?.sectionType, modalData)}
      </Modal>
    </>
  );
}
