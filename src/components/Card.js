import React, { useState, useEffect } from "react";
import { Card, CardImg, CardTitle } from "reactstrap";
import axios from "axios";
import loading from "../assets/loading.gif";

const Cards = ({ name, url }) => {
  const [data, setData] = useState(null);
  const [otherData, setOtherData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(url ? url : `${process.env.REACT_APP_URL}${name}`)
      .then((response) => {
        setData(response.data.sprites.other.dream_world.front_default);
        setOtherData(response.data.sprites.front_default);
        setIsLoading(false);
      });
  }, [url, name]);

  return (
    <div>
      <Card className="card my-3">
        {isLoading ? (
          <img src={loading} alt={loading} />
        ) : (
          <CardImg
            top
            src={data || otherData}
            alt={name}
            className="img-card"
          />
        )}
        <CardTitle className="text-center">{name}</CardTitle>
      </Card>
    </div>
  );
};

export default Cards;
