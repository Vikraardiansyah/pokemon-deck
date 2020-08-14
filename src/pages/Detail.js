import React from "react";
import Navbars from "../components/Navbar";
import { Container, Row, Col } from "reactstrap";

const Detail = () => {
  return (
    <>
      <Navbars isToggle={false} />
      <Container fluid="xl" className="mt-3">
        <Row>
          <Col xs="12" sm="4" md="4">
            <img
              src="https://ui-avatars.com/api/?background=0D8ABC&color=fff"
              alt="img"
              className="card-img"
            />
          </Col>
          <Col xs="12" sm="8" md="8">
            <dl class="row">
              <dt class="col-sm-3">Description lists</dt>
              <dd class="col-sm-9">
                A description list is perfect for defining terms.
              </dd>

              <dt class="col-sm-3">Euismod</dt>
              <dd class="col-sm-9">
                <p>
                  Vestibulum id ligula porta felis euismod semper eget lacinia
                  odio sem nec elit.
                </p>
                <p>Donec id elit non mi porta gravida at eget metus.</p>
              </dd>

              <dt class="col-sm-3">Malesuada porta</dt>
              <dd class="col-sm-9">
                Etiam porta sem malesuada magna mollis euismod.
              </dd>

              <dt class="col-sm-3 text-truncate">
                Truncated term is truncated
              </dt>
              <dd class="col-sm-9">
                Fusce dapibus, tellus ac cursus commodo, tortor mauris
                condimentum nibh, ut fermentum massa justo sit amet risus.
              </dd>

              <dt class="col-sm-3">Nesting</dt>
              <dd class="col-sm-9">
                <dl class="row">
                  <dt class="col-sm-4">Nested definition list</dt>
                  <dd class="col-sm-8">
                    Aenean posuere, tortor sed cursus feugiat, nunc augue
                    blandit nunc.
                  </dd>
                </dl>
              </dd>
            </dl>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Detail;
