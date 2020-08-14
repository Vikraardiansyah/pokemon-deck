import React, { useState, useEffect } from "react";
import { Container, Row, Col, Input } from "reactstrap";
import axios from "axios";
import Navbars from "../components/Navbar";
import Card from "../components/Card";

const Home = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("https://pokeapi.co/api/v2/pokemon")
      .then((response) => {
        setData(response.data.results);
      })
      .catch((error) => console.log(error));
  }, [data]);

  return (
    <>
      <Navbars isToggle={true}>
        <Input
          type="text"
          name="search"
          id="search"
          placeholder="Search pokemon"
          autoComplete="off"
          className="my-2 my-lg-0 rounded-pill search-bg"
          onChange={(e) => console.log(e.target.value)}
        />
      </Navbars>
      <Container fluid="xl" className="mt-3">
        <Row className="d-flex justify-content-center">
          {data.map((d) => {
            return (
              <Col key={d.name} xs="6" sm="6" md="3">
                <Card name={d.name} />
              </Col>
            );
          })}
        </Row>
      </Container>
    </>
  );
};

export default Home;
