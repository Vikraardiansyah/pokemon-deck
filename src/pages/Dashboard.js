import React, { useEffect } from "react";

const Dashboard = ({ history }) => {
  useEffect(() => {
    history.push("/home");
  });
  return <></>;
};

export default Dashboard;
