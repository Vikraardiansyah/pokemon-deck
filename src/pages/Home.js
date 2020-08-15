import React, { useState, useEffect, useCallback } from "react";
import { Container, Row, Col, Input } from "reactstrap";
import Pagination from "react-reactstrap-pagination";
import { debounce } from "lodash";
import axios from "axios";
import qs from "querystring";
import Navbars from "../components/Navbar";
import Card from "../components/Card";
import loading from "../assets/loading.gif";

const Home = ({ history, location }) => {
  const [data, setData] = useState(null);
  const [page, setPage] = useState(qs.parse(location.search.slice(1)).page);
  const [search, setSearch] = useState("");
  const [dataSearch, setDataSearch] = useState(null);
  const [pageData, setPageData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [activePage, setActivePage] = useState(
    qs.parse(location.search.slice(1)).page || 1
  );

  const searchData = (search) => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${search}`)
      .then((response) => {
        setDataSearch(response.data);
        console.log(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  };

  const debounceSearch = useCallback(debounce(searchData, 1000), []);

  useEffect(() => {
    setIsLoading(true);
    if (page) {
      history.push(`/home?page=${page}`);
    } else {
      history.push("/home");
    }
    axios
      .get(`https://pokeapi.co/api/v2/pokemon?offset=${(page - 1) * 20}`)
      .then((response) => {
        setData(response.data.results);
        setPageData(response.data);
        setIsLoading(false);
      })
      .catch((error) => console.log(error));
  }, [page, history]);

  useEffect(() => {
    if (search !== "") {
      setIsLoading(true);
      debounceSearch(search);
    } else {
      setDataSearch(null);
      setPage(1);
      setActivePage(1);
    }
    console.log(search);
  }, [search, debounceSearch]);

  const handleSelected = (selectedPage) => {
    setPage(selectedPage);
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
          onChange={(e) => setSearch(e.target.value)}
        />
      </Navbars>
      <Container fluid="xl" className="container-mg">
        {!isLoading ? (
          dataSearch ? (
            <Row>
              <Col
                key={dataSearch.name}
                xs="6"
                md="3"
                onClick={() => history.push(`/detail/${dataSearch.name}`)}
              >
                <Card name={dataSearch.name} />
              </Col>
            </Row>
          ) : search ? (
            <Row className="d-flex justify-content-center mt-5">
              <h4 className="not-found">Result not found</h4>
            </Row>
          ) : (
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
          )
        ) : (
          <Row className="d-flex justify-content-center">
            <img src={loading} alt={loading} />
          </Row>
        )}
        {!search ? (
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
        ) : null}
      </Container>
    </>
  );
};

export default Home;
