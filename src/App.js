import React, { useState, useEffect } from "react";
import "./App.css";
import {
  Container,
  Row,
  Col,
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  Input,
} from "reactstrap";
import axios from "axios";
import Card from "./components/Card";

const App = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("https://pokeapi.co/api/v2/pokemon")
      .then((response) => {
        setData(response.data.results);
        // response.data.results.map((result) =>
        //   axios.get(`${result.url}`).then((response) => {
        //     let temp = data;
        //     temp.push(response.data);
        //     setData(temp);
        //   })
        // );
      })
      .catch((error) => console.log(error));
  }, [data]);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <>
      <Navbar className="navbar-bg" light expand="sm">
        <Container fluid="xl">
          <NavbarBrand href="#" className="navbar-text">
            Pokemon Deck
          </NavbarBrand>
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="mr-auto" navbar></Nav>
            <Nav navbar>
              <Input
                type="text"
                name="search"
                id="search"
                placeholder="Search pokemon"
                autoComplete="off"
                className="my-2 my-lg-0 rounded-pill search-bg"
              />
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
      <Container fluid="xl" className="mt-3">
        <Row>
          {data.map((d) => {
            return (
              <Col key={d.id} xs="6" sm="6" md="3">
                <Card name={d.name} />
              </Col>
            );
          })}
        </Row>
      </Container>
    </>
  );
};

export default App;
