dotnet dev-certs https -ep ./certificates/certificate.crt -p password --trust --format PEM
openssl rsa -in ./certificates/certificate.key  -out ./certificates/certificate.key -passin pass:password
mv ./certificates/certificate.crt ./certificates/cert.pem
mv ./certificates/certificate.key ./certificates/key.pem
