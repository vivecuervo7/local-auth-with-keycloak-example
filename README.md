# Local auth with Keycloak example

An example project running Keycloak in Docker alongside a .NET Core API + React application with MSAL.

## Running the solution

### Certificates

Run `./local-dev/generate-certificates.sh` to generate certificates using dotnet dev-certs for both Keycloak and the React application.

### Keycloak

Navigate to `./local-dev/` and run `docker-compose up -d` to start the Keycloak server. There is already a realm configured for Keycloak which should be imported on first run.

### API

Navigate to `./api/` and run `dotnet run --project KeycloakExample.Api` to start the backend API.

### React application

Navigate to `./client/` and run `pnpm i` to install node dependencies, then run `pnpm dev` to start the React application.
