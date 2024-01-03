import React, { useState, useEffect } from "react";
import { NavbarDP } from "../../components/NavbarDP";
import { Footer } from "../../components/Footer";
import axios from "axios";
export const DashboardDP = () => {
  const [delivery_persons, setDeliveryPersons] = useState([]);
  const [isAvailable, setIsAvailable] = useState(true);

  const fetchAllDeliveryPersons = async (req, res) => {
    let response = await axios.get(
      "http://localhost:4010/api/deliveryperson/dashboard"
    );
    setDeliveryPersons(response.data);
  };

  //currently jesob dp logged in tader current active status set korbe
  //if they were offine then set offline and vice versa
  delivery_persons.map((singleDP) => {
    if (singleDP._id === localStorage.getItem("deliveryperson_id")) {
      setIsAvailable(singleDP.is_available);
    }
  });

  const handleIsAvailableToggle = async () => {
    try {
      const response =
        await axios.put(`http://localhost:4010/api/deliveryperson/isavailable/
        ${localStorage.getItem("deliveryperson_id")}`);

      if (response.status === 200) {
        setIsAvailable(!isAvailable);
        console.log("is available updated ok");
      }
    } catch (error) {
      console.log("error is available updating");
    }
  };

  useEffect(() => {
    fetchAllDeliveryPersons();
  }, []);

  return (
  <div>
        hello
  </div>
  )

};
