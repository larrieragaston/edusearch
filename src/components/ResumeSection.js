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
  PlusCircleOutlined,
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
  const [type, setType] = useState(props.data?.sectionType);
  const { userData, setUserData } = useContext(UserContext);

  const getDegreeType = (type) => {
    return degreeTypes.filter((x) => x.value === type)[0]?.description ?? null;
  };

  const showModal = (sectionData) => {
    setModalData(sectionData);
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

  const createOrUpdate = (id) => async (values) => {
    setIsSubmitting(true);
    const payload = { ...values, type };
    try {
      if (id) {
        const response = await degreeService.putDegree(id, payload);
        let degrees = userData.professionalInformation.map((x) =>
          x._id === id ? response : x
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
    return resumeSections.filter((x) => x.value === sectionType)[0]
      ?.description;
  };

  const getSectionFields = (sectionType) => {
    return resumeSections.filter((x) => x.value === sectionType)[0]
      ?.fieldsToShow;
  };

  const getsituationType = (type) => {
    return (
      situationTypes.filter((x) => x.value === type)[0]?.description ?? null
    );
  };

  const getSectionBody = (sectionType, sectionData) => {
    const activeFields = getSectionFields(sectionType);

    return (
      <>
        <Col span={20} style={{ paddingTop: 10, paddingLeft: 20 }}>
          {activeFields.subType ? (
            <Row>
              <Text style={{ color: "#CCCCCC" }}>
                {getDegreeType(sectionData?.subType)}
              </Text>
            </Row>
          ) : (
            <></>
          )}
          {activeFields.institution ? (
            <Row style={{ paddingLeft: "20px" }}>
              <Text style={{ color: "#666666" }}>
                {sectionData?.institution}
              </Text>
            </Row>
          ) : (
            <></>
          )}
          {activeFields.title ? (
            <Row style={{ paddingLeft: "20px" }}>
              <Text style={{ color: "#0262CF" }}>{sectionData?.title}</Text>
            </Row>
          ) : (
            <></>
          )}
          {activeFields.startYear ? (
            <Row style={{ paddingLeft: "20px" }}>
              <Text style={{ color: "#CCCCCC" }}>
                {sectionData?.startYear} - {sectionData?.endYear} (
                {getsituationType(sectionData?.currentSituation)})
              </Text>
            </Row>
          ) : activeFields.currentSituation ? (
            <Row style={{ paddingLeft: "20px" }}>
              <Text style={{ color: "#CCCCCC" }}>
                {sectionData?.endYear} (
                {getsituationType(sectionData?.currentSituation)})
              </Text>
            </Row>
          ) : activeFields.endYear ? (
            <Row style={{ paddingLeft: "20px" }}>
              <Text style={{ color: "#CCCCCC" }}>{sectionData?.endYear}</Text>
            </Row>
          ) : (
            <></>
          )}
          {activeFields.subject ? (
            <Row style={{ paddingLeft: "20px" }}>
              <Text>{sectionData?.subject}</Text>
            </Row>
          ) : (
            <></>
          )}
          {activeFields.duration ? (
            <Row style={{ paddingLeft: "20px" }}>
              <Text style={{ color: "#CCCCCC" }}>{sectionData?.duration}</Text>
            </Row>
          ) : (
            <></>
          )}
        </Col>
        <Col span={4} style={{ alignItems: "center" }}>
          <EditOutlined
            style={{ color: "#0262CF", padding: 5, fontSize: "16px" }}
            onClick={() => showModal(sectionData)}
          />
          <DeleteOutlined
            style={{ color: "#0262CF", padding: 5, fontSize: "16px" }}
            onClick={() => showConfirm(sectionData)}
          />
        </Col>
      </>
    );
  };

  const getModalBody = (sectionType, sectionData) => {
    const activeFields = getSectionFields(sectionType);

    return (
      <Form
        key={sectionData?._id}
        layout="vertical"
        // labelCol={{       span: 4}       }
        // wrapperCol={{span: 14}}
        name="basic"
        preserve={false}
        initialValues={sectionData}
        onFinish={createOrUpdate(sectionData?._id)}
        // onFinishFailed={onFinishFailed}
      >
        <Row style={{ justifyContent: "space-between" }}>
          {activeFields.subType ? (
            <Col span={10}>
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
                    option.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {degreeTypes.map((x) => (
                    <Option key={x.value} value={x.value}>
                      {x.description}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          ) : (
            <></>
          )}
          {activeFields.institution ? (
            <Col span={10}>
              <Form.Item
                label="Institución"
                name="institution"
                rules={[
                  {
                    required: true,
                    message: "Campo obligatorio",
                  },
                ]}
              >
                <Input bordered={true} />
              </Form.Item>
            </Col>
          ) : (
            <></>
          )}
          {activeFields.title ? (
            <Col span={10}>
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
            </Col>
          ) : (
            <></>
          )}
          {activeFields.startYear ? (
            <Col span={5}>
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
            </Col>
          ) : (
            <></>
          )}
          {activeFields.endYear ? (
            <Col span={5}>
              <Form.Item label="Hasta" name="endYear">
                <InputNumber min={1950} max={2021} />
              </Form.Item>
            </Col>
          ) : (
            <></>
          )}
          {activeFields.currentSituation ? (
            <Col span={10}>
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
                    option.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {situationTypes.map((x) => (
                    <Option key={x.value} value={x.value}>
                      {x.description}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          ) : (
            <></>
          )}
          {activeFields.subject ? (
            <Col span={10}>
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
            </Col>
          ) : (
            <></>
          )}
          {activeFields.duration ? (
            <Col span={10}>
              <Form.Item
                label="Duración"
                name="duration"
                rules={[
                  {
                    required: true,
                    message: "Campo obligatorio",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
          ) : (
            <></>
          )}
        </Row>
        <Row>
          <Col span={6} offset={15}>
            {!isSubmitting ? (
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  block
                  style={{ outlineColor: "#0262cf", borderRadius: 5 }}
                >
                  Guardar Cambios
                </Button>
              </Form.Item>
            ) : (
              <Form.Item>
                <Button
                  type="primary"
                  loading
                  block
                  style={{ outlineColor: "#0262cf", borderRadius: 5 }}
                >
                  Enviando
                </Button>
              </Form.Item>
            )}
          </Col>
        </Row>
      </Form>
    );
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
          <Col span={2} style={{ textAlign: "center" }}>
            <PlusCircleOutlined
              style={{
                color: "#0262CF",
                fontSize: 24,
                paddingTop: "0.3em",
                paddingBottom: "0.4em",
                paddingLeft: "0.2em",
              }}
              onClick={() => showModal()}
            />
          </Col>
        </Row>
        {props.data?.sectionData?.length > 0 ? (
          <Row style={{ alignItems: "center" }}>
            {props.data.sectionData.map((x) =>
              getSectionBody(props.data?.sectionType, x)
            )}
          </Row>
        ) : (
          <Row>
            <Text style={{ color: "#CCCCCC" }}>{noInformationSection}</Text>
          </Row>
        )}
      </Card>
      <Modal
        title={
          <Text style={{ color: "#0262CF" }}>
            {getSectionTitle(props.data?.sectionType)}
          </Text>
        }
        visible={visible}
        onCancel={cancelCreateOrUpdate}
        footer={null}
        width={700}
      >
        {getModalBody(props.data?.sectionType, modalData)}
      </Modal>
    </>
  );
}
