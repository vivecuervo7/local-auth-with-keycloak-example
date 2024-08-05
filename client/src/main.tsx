import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import {
  AuthenticationResult,
  EventMessage,
  EventType,
  ProtocolMode,
  PublicClientApplication,
} from "@azure/msal-browser";
import { MsalProvider } from "@azure/msal-react";

const msalConfig = {
  auth: {
    clientId: "local-dev-client",
    authority: "https://localhost:8443/realms/local-dev",
    knownAuthorities: ["https://localhost:8443/realms/local-dev"],
    redirectUri: "https://localhost:5173",
    postLogoutRedirectUri: "https://localhost:5173",
    protocolMode: ProtocolMode.OIDC,
    authorityMetadata: JSON.stringify({
      authorization_endpoint:
        "https://localhost:8443/realms/local-dev/protocol/openid-connect/auth",
      token_endpoint:
        "https://localhost:8443/realms/local-dev/protocol/openid-connect/token",
      issuer: "https://localhost:8443/realms/local-dev",
      userinfo_endpoint:
        "https://localhost:8443/realms/local-dev/protocol/openid-connect/userinfo",
      end_session_endpoint:
        "https://localhost:8443/realms/local-dev/protocol/openid-connect/logout",
    }),
  },
};

const msalInstance = new PublicClientApplication(msalConfig);

msalInstance.addEventCallback((event: EventMessage) => {
  if (event.eventType === EventType.LOGIN_SUCCESS && event.payload) {
    const authenticationResult = event.payload as AuthenticationResult;
    const account = authenticationResult.account;
    msalInstance.setActiveAccount(account);
  }
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <MsalProvider instance={msalInstance}>
      <App />
    </MsalProvider>
  </React.StrictMode>
);
