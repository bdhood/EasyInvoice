# EasyInvoice
Simple react bootstrap web app for creating invoices

## setup

```
npm install
npm run build
```

## run site
```
docker-compose up --build
```
you can then visit http://localhost:8080

## run tests local
```
docker-compose -f docker-compose.yml -f docker-compose.acceptance.yml up --build
cd tests/acceptance
pipenv install # one time only
pipenv run test
```
use vnc://localhost:6900 to view tests.

## run tests in docker
```
docker-compose -f docker-compose.yml -f docker-compose.acceptance.yml -f docker-compose.acceptance.tests.yml up --build
```
