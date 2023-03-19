import React from "react";
import { Helmet } from "react-helmet";

function Meta({ title, description, keyword }) {
  return (
    <div>
      <Helmet>
        <title> {title} </title>
        <meta name="description" content={description} />
        <meta name="keyword" content={keyword} />
      </Helmet>
    </div>
  );
}

Meta.defaultProps = {
  title: "Welcome to shoppy-Games",
  description:
    "Shoppy Games est la premiere marketplace au Maroc pour les gamers Products",
  keyword:
    "Gamers,PlayStations , PlayStation 4, PlayStation 5, Keyboards, Mouses, Chairs Gamers, keyboard gamers,Headphones for Gamers",
};

export default Meta;
