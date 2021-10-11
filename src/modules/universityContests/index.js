import React, { useState, useEffect } from "react";
import Contest from "../../components/Contest";
import contestService from "../../services/contest";
import { Row, Typography } from "antd";
import { contestTypes, noInformation } from "../../constants";

const { Text } = Typography;

export default function UniversityContests(props) {
  const [contests, setContests] = useState([]);
  const [contestsCount, setContestsCount] = useState(0);

  useEffect(() => {
    async function fetchData() {
      let contestForUser;
      switch (props.type) {
        case contestTypes.drafts:
          contestForUser = await contestService.getDraftContestsForUniversity();
          break;
        case contestTypes.actives:
          contestForUser = await contestService.getActiveContestsForUniversity();
          break;
        case contestTypes.ended:
          contestForUser = await contestService.getEndedContestsForUniversity();
          break;
        default:
          contestForUser = null;
          break;
      }
      setContests(contestForUser);
      setContestsCount(contestForUser?.length);
    }
    fetchData();
  }, [props.type]);

  const getPageTitle = (type) => {
    switch (type) {
      case contestTypes.drafts:
        return "Borradores";
      case contestTypes.actives:
        return "Concursos Activos";
      case contestTypes.ended:
        return "Concursos Finalizados";
      default:
        return "Error";
    }
  };

  return (
    <React.Fragment>
      <Row>
        <Text
          style={{
            fontSize: "20px",
            color: "#0262CF",
            paddingBottom: "0.9em",
            paddingTop: "0.9em",
          }}
        >
          {getPageTitle(props.type)} ({contestsCount})
        </Text>
      </Row>
      <Row>
        {contests
          ? contests.map((x) => <Contest key={x._id} data={x} isUniversity={true} />)
          : noInformation}
      </Row>
    </React.Fragment>
  );
}
