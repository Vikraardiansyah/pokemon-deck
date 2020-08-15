import React, { useState, useEffect, useCallback } from "react";
import { Container, Row, Col, Input, Label } from "reactstrap";
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
  const [types, setTypes] = useState([]);
  const [type, setType] = useState(qs.parse(location.search.slice(1)).type);
  const [dataType, setDataType] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://pokeapi.co/api/v2/type")
      .then((response) => setTypes(response.data.results));
  }, []);

  useEffect(() => {
    if (type === "All") {
      setDataType([]);
      history.push("/home");
    } else if (type) {
      setIsLoading(true);
      axios
        .get(`https://pokeapi.co/api/v2/type/${type.toString().toLowerCase()}`)
        .then((response) => {
          setDataType(response.data.pokemon);
          history.push(`/home?type=${type}`);
          setIsLoading(false);
        });
    }
  }, [type, history]);

  const searchData = (search) => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${search}`)
      .then((response) => {
        setDataSearch(response.data);
        setIsLoading(false);
        history.push("/home");
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
        history.push("/home");
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
      setType("All");
      setIsLoading(true);
      debounceSearch(search);
    } else if (search === "") {
      setDataSearch(null);
    }
  }, [search, debounceSearch]);

  const handleSelected = (selectedPage) => {
    setPage(selectedPage);
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
        {!search ? (
          <Row>
            <Col xs="6" lg="3" xl="2" className="d-flex flex-row">
              <Label for="type" className="mx-3 mt-1">
                Type
              </Label>
              <Input
                bsSize="sm"
                type="select"
                id="type"
                name="type"
                value={type}
                onChange={(e) => setType(e.target.value)}
              >
                <option name="All">All</option>
                {types.map((type) => (
                  <option
                    key={type.name}
                    value={
                      type.name.charAt(0).toUpperCase() + type.name.slice(1)
                    }
                  >
                    {type.name.charAt(0).toUpperCase() + type.name.slice(1)}
                  </option>
                ))}
              </Input>
            </Col>
          </Row>
        ) : null}
      </Container>
      <Container fluid="xl">
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
          ) : dataType[0] ? (
            <Row>
              {dataType.map((type) => {
                return (
                  <Col
                    key={type.pokemon.name}
                    xs="6"
                    md="3"
                    onClick={() => history.push(`/detail/${type.pokemon.name}`)}
                  >
                    <Card name={type.pokemon.name} url={type.pokemon.url} />
                  </Col>
                );
              })}
            </Row>
          ) : !(type === undefined || type === "All") ? (
            <Row className="d-flex justify-content-center mt-5">
              <h4 className="not-found">Result not found</h4>
            </Row>
          ) : (
            <Row>
              {data.map((data) => {
                return (
                  <Col
                    key={data.name}
                    xs="6"
                    md="3"
                    onClick={() => history.push(`/detail/${data.name}`)}
                  >
                    <Card name={data.name} url={data.url} />
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
        <Row>
          {!search ? (
            !dataType[0] ? (
              type === undefined || type === "All" ? (
                <Col sm="12" className="d-flex justify-content-center">
                  <Pagination
                    totalItems={pageData.count}
                    pageSize={20}
                    onSelect={handleSelected}
                    defaultActivePage={page ? parseInt(page) : 1}
                    firstPageText="<<"
                    previousPageText="<"
                    nextPageText=">"
                    lastPageText=">>"
                  />
                </Col>
              ) : null
            ) : null
          ) : null}
        </Row>
      </Container>
    </>
  );
};

export default Home;
