/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import fetch from "../../fetch";

export default function useNiceHashAuthentication() {
  const history = useHistory();
  const wallet = useSelector((s) => s.wallet);
  const { walletConfiguration } = wallet;
  const [error, setError] = useState("");
  const [configureStatus, setConfigureStatus] = useState(false);
  const [niceHashConfiguration, setNiceHashConfiguration] = useState({
    orgId: "",
    key: "",
    secret: "",
  });

  const setFieldValue = (key, value) => {
    setNiceHashConfiguration((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const check = async () => {
    setError("");
    const response = await fetch(
      "http://192.168.100.75:8091/api/credential/" +
        walletConfiguration.address,
      {
        method: "GET",
      }
    );

    const data = await response.json();
    if (response.ok) {
      setConfigureStatus(true);
    } else if (response.status !== 200) {
      setError(data.message || "");
      setConfigureStatus(false);
    }
  };

  const configure = async () => {
    setError("");
    const response = await fetch(
      "http://192.168.100.75:8091/api/credential/" +
        walletConfiguration.address,
      {
        method: "POST",
        body: JSON.stringify({
          address: walletConfiguration.address || "",
          orgid: niceHashConfiguration.orgId || "",
          key: niceHashConfiguration.key || "",
          secret: niceHashConfiguration.secret || "",
        }),
      }
    );

    const data = await response.json();
    if (response.ok) {
      console.log("sucess");
    } else if (response.status !== 200) {
      setError(data.message || "");
    }
  };

  return [
    { niceHashConfiguration, configureStatus, error },
    { setFieldValue, configure, check },
  ];
}
