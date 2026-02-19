import axios from "axios";
import React from "react";
import { BASE_URL } from "../utils/constants";

const Connections = () => {
  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/connections", {
        withCredentials: true,
      });
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };
  return <div></div>;
};

export default Connections;
