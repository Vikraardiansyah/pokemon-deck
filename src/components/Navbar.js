import React, { useState } from "react";
import {
  Container,
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
} from "reactstrap";
import { useHistory } from "react-router-dom";

const Navbars = ({ children, isToggle }) => {
  const [isOpen, setIsOpen] = useState(false);
  const history = useHistory();

  const toggle = () => setIsOpen(!isOpen);
  return (
    <Navbar className="navbar-bg" light expand="sm">
      <Container fluid="xl">
        <NavbarBrand
          onClick={() => history.push("/home")}
          className="navbar-text"
        >
          Pokemon Deck
        </NavbarBrand>
        {isToggle ? <NavbarToggler onClick={toggle} /> : null}
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar></Nav>
          <Nav navbar>{children}</Nav>
        </Collapse>
      </Container>
    </Navbar>
  );
};

export default Navbars;
