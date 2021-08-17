import React, { useState, useEffect } from "react";
import Contest from "../../components/Contest";
import contestService from "../../services/contest";
import { Row, Typography } from "antd";
import { contestTypes, noInformation } from "../../constants";

const { Text } = Typography;

export default function Contests(props) {
  const [contests, setContests] = useState([]);
  const [contestsCount, setContestsCount] = useState(0);

  useEffect(() => {
    async function fetchData() {
      let contestForUser;
      switch (props.type) {
        case contestTypes.all:
          contestForUser = await contestService.getContestForUser();
          break;
        case contestTypes.postulations:
          contestForUser = await contestService.getContestPostulations();
          break;
        case contestTypes.favourites:
          contestForUser = await contestService.getFavouriteContest();
          break;
      }
      setContests(contestForUser);
      setContestsCount(contestForUser.length);
    }
    fetchData();
  }, [props.type]);

  const getPageTitle = (type) => {
    switch (type) {
      case contestTypes.all:
        return "Busquedas Activas";
      case contestTypes.postulations:
        return "Postulacones";
      case contestTypes.favourites:
        return "Favoritos";
    }
  };

  return (
    <React.Fragment>
      <Row>
        <Text style={{ fontSize: "20px" }}>
          {getPageTitle(props.type)}({contestsCount})
        </Text>
      </Row>
      <Row>
        {contests
          ? contests.map((x) => <Contest key={x._id} data={x} />)
          : noInformation}
      </Row>
    </React.Fragment>
  );
}
