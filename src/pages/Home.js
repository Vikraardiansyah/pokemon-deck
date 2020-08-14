import React, { useState, useEffect } from "react";
import { Container, Row, Col, Input } from "reactstrap";
import Pagination from "react-reactstrap-pagination";
import axios from "axios";
import qs from "querystring";
import Navbars from "../components/Navbar";
import Card from "../components/Card";
import loading from "../assets/loading.gif";

const Home = ({ history, location }) => {
  const [data, setData] = useState(null);
  const [offset, setOffset] = useState(
    qs.parse(location.search.slice(1)).offset
  );
  const [pageData, setPageData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [activePage, setActivePage] = useState(
    qs.parse(location.search.slice(1)).offset / 20 + 1 || 1
  );

  useEffect(() => {
    setIsLoading(true);
    if (offset) {
      history.push(`/home?offset=${offset}`);
    } else {
      history.push("/home");
    }
    axios
      .get(`https://pokeapi.co/api/v2/pokemon?offset=${offset}`)
      .then((response) => {
        setData(response.data.results);
        setPageData(response.data);
        setIsLoading(false);
      })
      .catch((error) => console.log(error));
  }, [offset, history]);

  const handleSelected = (selectedPage) => {
    setOffset((selectedPage - 1) * 20);
    setActivePage(selectedPage);
    window.scrollTo(0, 0);
  };

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
      <Container fluid="xl" className="container-mg">
        {!isLoading ? (
          <Row>
            {data.map((d) => {
              return (
                <Col
                  key={d.name}
                  xs="6"
                  md="3"
                  onClick={() => history.push(`/detail/${d.name}`)}
                >
                  <Card name={d.name} url={d.url} />
                </Col>
              );
            })}
          </Row>
        ) : (
          <Row className="d-flex justify-content-center">
            <img src={loading} alt={loading} />
          </Row>
        )}
        <Row>
          <Col sm="12" className="d-flex justify-content-center">
            <Pagination
              totalItems={pageData.count}
              pageSize={20}
              onSelect={handleSelected}
              defaultActivePage={activePage}
              firstPageText="<<"
              previousPageText="<"
              nextPageText=">"
              lastPageText=">>"
            />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Home;
