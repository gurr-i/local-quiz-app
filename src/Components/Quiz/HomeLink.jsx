import React from "react";
import { Link } from "react-router-dom";

function HomeLink() {
  return (
    <Link to="/" className="home-button">
      Home
    </Link>
  );
}

export default HomeLink;
