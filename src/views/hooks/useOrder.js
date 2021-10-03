/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import fetch from "../../fetch";

export default function useOrder() {
  const history = useHistory();
  const wallet = useSelector((s) => s.wallet);
  const { walletConfiguration } = wallet;
  const [error, setError] = useState("");
  const [configureStatus, setConfigureStatus] = useState(false);
  const [orders, setOrders] = useState({});
  const [controlledOrders, setControlledOrders] = useState({});

  const getAllOrders = async () => {
    const response = await fetch(
      "http://192.168.100.75:8091/api/order/" + walletConfiguration.address,
      {
        method: "GET",
      }
    );

    const data = await response.json();
    if (response.ok) {
      setOrders(data);
    }
  };

  const getControlledOrders = async () => {
    const response = await fetch(
      "http://192.168.100.75:8091/api/order/" +
        walletConfiguration.address +
        "/controlled ",
      {
        method: "GET",
      }
    );

    const data = await response.json();
    if (response.ok) {
      setControlledOrders(data);
    }
  };

  const assignControlOrders = async (id) => {
    console.log("Ass", id);

    const response = await fetch(
      "http://192.168.100.75:8091/api/order/" +
        walletConfiguration.address +
        "?orderId=" +
        id +
        "&control=true",
      {
        method: "PUT",
      }
    );

    const data = await response.json();
    console.log("Assign", data);
    if (response.ok) {
      setControlledOrders(data);
    }
  };

  return [
    { orders, controlledOrders },
    { getAllOrders, getControlledOrders, assignControlOrders },
  ];
}
