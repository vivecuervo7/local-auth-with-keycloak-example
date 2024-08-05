docker compose -f "docker-compose.yml" -f "docker-compose.export.yml" up --exit-code-from keycloak
rsync -a ./keycloak-export/ ./keycloak-import/ --remove-source-files