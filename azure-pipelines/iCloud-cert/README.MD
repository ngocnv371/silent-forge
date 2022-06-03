# How to make keys

## get openssl

You can download one, or use built-in from GIT

## create keys

Create key pair : `openssl genrsa -out aps_development.key 2048`

Create CSR : `openssl req -new -sha256 -key aps_development.key -out aps_development.csr`

When prompted for csr info, use the data in `csr-info.txt`

Upload the CSR to developer portal to get the certificate `aps_development.cer`

Convert the certificate: `openssl x509 -inform DER -outform PEM -in aps_development.cer -out aps_development.pem`

Do it again for `distribution`: `openssl x509 -inform DER -outform PEM -in aps_distribution.cer -out aps_distribution.pem`

Build the PKCS#12: `winpty openssl pkcs12 -inkey aps_distribution.key -in aps_distribution.pem -export -out aps_distribution.p12`

We included `winpty` in the script above because if you're running on Windows you will need it.

Do it again for `distribution`: `winpty openssl pkcs12 -inkey aps_development.key -in aps_distribution.pem -export -out aps_distribution.p12`
