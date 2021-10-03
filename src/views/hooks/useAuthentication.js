/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useHistory } from "react-router-dom";
import fetch from "../../fetch";

export default function useAuthentication() {
  const history = useHistory();
  const [error, setError] = useState("");
  const [loginConfiguration, setLoginConfiguration] = useState({
    walletAddress: "",
    passPharse: "",
  });

  const setFieldValue = (key, value) => {
    setLoginConfiguration((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const login = async () => {
    setError("");
    const response = await fetch("http://192.168.100.75:8091/api/public/auth", {
      method: "POST",
      body: JSON.stringify({
        walletAddress: loginConfiguration.walletAddress || "",
        passPharse: loginConfiguration.passPharse || "",
      }),
    });

    const data = await response.json();
    localStorage.setItem("user", JSON.stringify(data));
    if (response.ok) {
      history.push("/landing-page");
    } else if (response.status !== 200) {
      setError(data.message || "");
    }
  };

  return [loginConfiguration, error, { setFieldValue, login }];
}
