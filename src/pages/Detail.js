import React, { useState, useEffect } from "react";
import Navbars from "../components/Navbar";
import { Container, Row, Col, Progress } from "reactstrap";
import axios from "axios";

const Detail = ({ match }) => {
  const [data, setData] = useState(null);
  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${match.params.name}`)
      .then((response) => setData(response.data));
  });

  return (
    <>
      <Navbars isToggle={false} />
      {data ? (
        <Container fluid="xl" className="mt-3">
          <Row>
            <Col xs="12" sm="4">
              <img
                src={data.sprites.other.dream_world.front_default}
                alt="img"
                className="card-img"
              />
            </Col>
            <Col xs="12" sm="8">
              <dl className="row">
                <dt className="col-sm-2">Name</dt>
                <dd className="col-sm-9">
                  {data.name.charAt(0).toUpperCase() + data.name.slice(1)}
                </dd>

                <dt className="col-sm-2">Height</dt>
                <dd className="col-sm-9">
                  {data.height} dm ({data.height * 10} cm)
                </dd>

                <dt className="col-sm-2">Weight</dt>
                <dd className="col-sm-9">
                  {data.weight} hg ({data.weight / 10} kg)
                </dd>

                <dt className="col-sm-2">Type</dt>
                <dd className="col-sm-9">
                  {data.types.map(
                    (type) =>
                      `${
                        type.type.name.charAt(0).toUpperCase() +
                        type.type.name.slice(1)
                      } `
                  )}
                </dd>

                <dt className="col-sm-2">Abilities</dt>
                <dd className="col-sm-9">
                  {data.abilities.map((abilities) => (
                    <dl className="row mb-n1">
                      <dt className="col-sm-3">
                        {abilities.ability.name.charAt(0).toUpperCase() +
                          abilities.ability.name.slice(1)}
                      </dt>
                      <dd className="col-sm-6">
                        Doubles Speed during strong sunlight.
                      </dd>
                    </dl>
                  ))}
                </dd>

                <dt className="col-sm-2">Status</dt>
                <dd className="col-sm-9">
                  {data.stats.map((stats) => (
                    <dl className="row">
                      <dt className="col-sm-4">
                        {stats.stat.name.charAt(0).toUpperCase() +
                          stats.stat.name.slice(1)}
                      </dt>
                      <dd className="col-sm-6 mb-n1">
                        <Progress value={stats.base_stat} className="mt-1">
                          {stats.base_stat}
                        </Progress>
                      </dd>
                    </dl>
                  ))}
                </dd>
              </dl>
            </Col>
          </Row>
        </Container>
      ) : null}
    </>
  );
};

export default Detail;
