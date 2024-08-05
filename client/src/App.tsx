import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

import { useIsAuthenticated, useMsal } from "@azure/msal-react";

function App() {
  const isAuthenticated = useIsAuthenticated();
  const { instance } = useMsal();
  const [apiResult, setApiResult] = useState("");

  const handleLogin = async () => {
    await instance.loginRedirect();
  };

  const handleLogout = async () => {
    const response = await instance.acquireTokenSilent({
      scopes: ["openid", "email", "profile"],
    });

    await instance.logoutRedirect({
      idTokenHint: response.idToken,
    });
  };

  const callApi = () => {
    if (isAuthenticated) {
      callApiAuthenticated();
    } else {
      callApiUnauthenticated();
    }
  };

  const callApiAuthenticated = async () => {
    const response = await instance.acquireTokenSilent({
      scopes: ["openid", "email", "profile"],
    });

    const weather = await fetch("https://localhost:7276/weatherforecast", {
      headers: {
        Authorization: `Bearer ${response.accessToken}`,
      },
    });

    setApiResult(await weather.text());
  };

  const callApiUnauthenticated = async () => {
    try {
      const response = await fetch("https://localhost:7276/weatherforecast");

      if (response.status === 401) {
        setApiResult("Unauthorized");
      }
    } catch (e) {
      setApiResult((e as Error).message);
    }
  };

  return (
    <>
      <div>
        <img src={viteLogo} className="logo" alt="Vite logo" />
        <img src={reactLogo} className="logo react" alt="React logo" />
      </div>
      <h1>Vite + React</h1>
      {instance.getActiveAccount() && (
        <p>Logged in as {instance.getActiveAccount()?.name ?? ""}</p>
      )}
      <div style={{ display: "flex", justifyContent: "center", gap: 12 }}>
        <button onClick={callApi}>Call API</button>
        {isAuthenticated ? (
          <button onClick={handleLogout}>Logout</button>
        ) : (
          <button onClick={handleLogin}>Login</button>
        )}
      </div>
      <p>{apiResult}</p>
    </>
  );
}

export default App;
