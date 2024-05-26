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

### Register

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

### Authenticate

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

### _Events_

### Create Event

- Method: **POST**
- URL: {{URL}}/events
- Data:
```bash
{
    "name": "Interesting Party",
    "description": "That is a crazy event, must go there!",
    "address": "Local St 101",
    "when": "2023-08-16 21:00:00"
}
```
- Requires Auth: **YES**
- Description: This endpoint allows authenticated users to create a new event with filled following fields: name, description, address, and when.

### Get All Events

- Method: **GET**
- URL: {{URL}}/events
- Requires Auth: **NO**
- Description: This endpoint allows both authenticated and unauthenticated users to retrieve all events.

### Get Single Event

- Method: **GET**
- URL: {{URL}}/events/:id
- Requires Auth: **NO**
- Description: This endpoint allows both authenticated and unauthenticated users to retrieve information about a specific event with ID.

### Delete Event

- Method: **DELETE**
- URL: {{URL}}/events/:id
- Requires Auth: **YES**
- Description: This endpoint allows authenticated users to delete an event with ID.

### Get Events Organized By User

- Method: **GET**
- URL: {{URL}}/events-organized-by-user/:id
- Requires Auth: **NO**
- Description: This endpoint allows both authenticated and unauthenticated users to retrieve a list of events organized by the user with ID.

### _Event Attendance_

### Get Event Attendees

- Method: **GET**
- URL: {{URL}}/events/:id/attendees
- Requires Auth: **NO**
- Description: This endpoint allows both authenticated and unauthenticated users to retrieve the list of attendees for a specific event with ID.

### Attend Event

- Method: **PUT**
- URL: {{URL}}/current-user-event-attendance/:id
- Data:
```bash
{
    "answer": 1
}
```
- Requires Auth: **YES**
- Description: This endpoint enables authenticated users to indicate their attendance at a specific event.

### Get Specific Event Attendance By Current User

- Method: **GET**
- URL: {{URL}}/current-user-event-attendance/:id
- Requires Auth: **YES**
- Description: This endpoint allows authenticated users to retrieve their attendance status for a specific event with ID.
