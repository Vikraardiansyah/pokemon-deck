import React, { useState, useEffect } from "react";
import axios from "axios";

const Ability = ({ url }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios
      .get(url)
      .then((response) =>
        setData(
          response.data.effect_entries.filter(
            (effect) => effect.language.name === "en"
          )[0]
        )
      );
  }, [url]);
  return <>{data ? data.effect : null}</>;
};

export default Ability;
