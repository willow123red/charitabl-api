# Charitabl-api

Final project for Lighthouse Labs bootcamp. Not intended for production.

## Authors

- **John Webster** - _Front End, some Back End_ - [RandomHilarity](https://github.com/RandomHilarity)
- **Lucas Wilson** - _Back End_ - [willow123red](https://github.com/willow123red)

## Companion Repos

This app requires Charitabl for front-end operations.
See [https://github.com/RandomHilarity/charitabl](https://github.com/RandomHilarity/charitabl).

## Dependencies

1. body-parser: 1.19.0
2. cors: 2.8.5
3. dotenv: 8.1.0
4. express: 4.17.1
5. helmet: 3.21.1
6. nodemon: 1.19.3
7. pg: 7.12.1
8. stripe: 7.9.1

### Creating The DB

Use the psql -U development command to login to the PostgreSQL server with the username development and the password development.

Create a database with the command CREATE DATABASE charitabl;.

Copy the .env.example file to .env.development and fill in the necessary PostgreSQL configuration. The node-postgres library uses these environment variables by default.

PGHOST=localhost
PGUSER=development
PGDATABASE=scheduler_development
PGPASSWORD=development
PGPORT=5432

Seeding the database.
Run the development server with npm start.

Make a GET request to /api/debug/reset with curl http://localhost:8080/api/debug/reset.

Use the browser to navigate to http://localhost:8001/api/debug/reset.

### Using stripe to make a donation

You will need to obtain your own api keys from Stripe to make a donation in the development environment.

Visit https://stripe.com/docs/keys and sign up for your developer keys. You will need the both publishable and secret key. Use the .env.example file to update the .env.development file accordingly.

You can use credit card number 4242 4242 4242 4242 with any post dated expiry date and ccv combination to test.