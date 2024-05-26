# Used Cars Pricing API

## About

This API is designed for user registration and authentication, allowing users to create, update, delete, and view used cars reports alongside with admin approval of each report.

## Features

- User authentication and registration using cockie session, with user-specific data retrieval.
- Full CRUD operations on reports managed by users (creation, deletion, modification, and retrieval).
- Approval feature of each report (admin functionality).

## Technologies

- **Nest.js:** a framework for building efficient, scalable Node.js web applications.
- **TypeORM:** an Object-Relational Mapping (ORM) library for TypeScript and JavaScript that simplifies database interaction by allowing to work with relational databases using object-oriented paradigms.
- **SQLite:** an in-process library that implements a self-contained, serverless, zero-configuration, transactional SQL database engine.
- **Jest:** a popular JavaScript testing framework, designed to make testing easy, fast, and enjoyable by providing a simple and intuitive API for writing unit tests, as well as built-in support for features like mocking, snapshot testing, and code coverage analysis.

## Getting Started

1. Clone the repository to your local machine.
   
2. Install dependencies using
```bash
npm install
```

3. Create and fill `.env.development` file. Here is an example:
```bash
DB_NAME=db.sqlite
COOKIE_KEY=secret_cookie_key
APP_PORT=3000
```

Example for `.env.test` file that is used for Test Environment:
```bash
DB_NAME=test.sqlite
COOKIE_KEY=secret_cookie_key
APP_PORT=3000
```
   
4. Launch the local server using
```bash
npm run start:dev
```

5. Run the migration to execute initial schema:
```bash
npm run typeorm migration:run -- -d ./ormconfigWrapper.js
```

## Test the App

```bash
# unit tests
npm run test

# e2e tests
npm run test:e2e

# test coverage
npm run test:cov
```

## API Endpoints
Here are the routes that can be used for routing in the app.

### _User_

### Sign Up

- Method: **POST**
- URL: {{URL}}/auth/signup
- Data:
```bash
{
    "email": "test@test.com",
    "password": "password"
}
```
- Requires Auth: **NO**
- Description: This endpoint enables users to register by sending a POST request containing their chosen email and password.

### Sign In

- Method: **POST**
- URL: {{URL}}/auth/signin
- Data:
```bash
{
    "email": "test@test.com",
    "password": "password"
}
```
- Requires Auth: **NO**
- Description: This endpoint enables users authenticate by sending a POST request with their email and password; upon successful authentication, userId is added in session object for further private routing.

### Sign Out

- Method: **POST**
- URL: {{URL}}/auth/signout
- Requires Auth: **YES**
- Description: This endpoint enables users log out and remove userId from session object.

### Get Current User Profile

- Method: **GET**
- URL: {{URL}}/auth/profile
- Requires Auth: **YES**
- Description: This endpoint retrieves the profile information of the currently authenticated user.

### Find One User By ID

- Method: **GET**
- URL: {{URL}}/auth/:id
- Requires Auth: **NO**
- Description: This endpoint retrieves brief profile information of the another user.

### Update User By ID

- Method: **PATCH**
- URL: {{URL}}/auth/:id
- Data:
```bash
{
    "email": "test111@test.com",
    "password": "password111"
}
```
- Requires Auth: **YES**
- Description: This endpoint allows to update user info by ID.

### Delete User By ID

- Method: **DELETE**
- URL: {{URL}}/auth/:id
- Requires Auth: **YES**
- Description: This endpoint allows to delete user info by ID.

### _Reports_

### Create Report

- Method: **POST**
- URL: {{URL}}/reports
- Data:
```bash
{
    "year": 1981,
    "price": 15000,
    "mileage": 50000,
    "lng": 45,
    "lat": 45,
    "model": "mustang",
    "make": "ford"
}
```
- Requires Auth: **YES**
- Description: This endpoint allows authenticated users to create a new used car report with filled following fields: year, price, mileage, lng, lat, model, and make.

### Approve The Report

- Method: **PATCH**
- URL: {{URL}}/reports/:id
- Requires Auth: **YES (Admin Only Feature)**
- Description: This endpoint allows admin to approve report os the user.

### Get An Estimate For Existing Vehicle

- Method: **GET**
- URL: {{URL}}/reports/?make=ford&model=mustang&lng=45&lat=45&mileage=50000&year=1981
- Requires Auth: **YES**
- Description: This endpoint allows authenticated user to get estimate for existing vehicle based on parameters that user applied for search. As a result average price of vehicles is appeared. Be aware that only approved reports appear in search.
