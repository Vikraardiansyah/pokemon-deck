import React, { useState, useEffect } from "react";
import { Card, CardImg, CardTitle } from "reactstrap";
import axios from "axios";

const Cards = ({ name }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${name}`)
      .then((response) =>
        setData(response.data.sprites.other.dream_world.front_default)
      );
  }, [name]);

  return (
    <div>
      <Card className="card my-3">
        <CardImg top src={data} alt={name} className="img-card" />
        <CardTitle className="text-center">{name}</CardTitle>
      </Card>
    </div>
  );
};

export default Cards;
