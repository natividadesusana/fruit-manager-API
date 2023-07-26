# Fruit Manager API

This repository contains a Node.js project that implements an API for managing fruits. It provides endpoints to create fruits, retrieve all fruits, and get a specific fruit by its ID. The project uses the Express.js framework for building the API and Prisma as the ORM (Object-Relational Mapping) to interact with the database.

## Table of Contents

- [Endpoints](#endpoints)
- [Setup](#setup)
- [Usage](#usage)
- [Error Handling](#error-handling)
- [Tests](#tests)

<a name="endpoints"></a>
## Endpoints 
The API provides the following endpoints:

1. POST /fruits: Creates a new fruit.
2. GET /fruits: Returns all fruits.
3. GET /fruits/:id: Returns a specific fruit based on its ID.

<a name="setup"></a>
## Setup 
1. Clone the repository:

        git clone <repository_url>
        cd <repository_name>
      
2. Install the dependencies:

        npm install

3. Set up your database configuration in the .env file. Ensure you have a running database instance (compatible with Prisma) with the correct credentials.

<a name="usage"></a>
## Usage 
To start the server, run:

    npm start
    
By default, the server will listen on port 3000. You can modify this in the index.ts file if needed.

<a name="error-handling"></a>
## Error Handling
The API handles errors for various scenarios:

- httpStatus.BAD_REQUEST: This status is returned when an invalid fruit ID is provided.
- httpStatus.NOT_FOUND: This status is returned when a requested fruit is not found.
- httpStatus.CONFLICT: This status is returned when trying to create a fruit that is already registered.

<a name="tests"></a>
## Tests 
The project includes a set of test cases to ensure the API endpoints function correctly. The testing framework used is not specified in the provided code. The tests cover the following scenarios:

- POST /fruits:
  - Should return 201 when inserting a fruit.
  - Should return 409 when inserting a fruit that is already registered.
  - Should return 422 when inserting a fruit with missing data.
- GET /fruits:
  - Should return 404 when trying to get a fruit that doesn't exist.
  - Should return 400 when an invalid ID parameter is provided.
  - Should return a fruit given an ID.
  - Should return all fruits.
  - 
To run the tests, use the following command:

        npm test
    
Ensure you have the appropriate testing framework and environment set up to execute the tests successfully.

That's it! You now have an overview of the fruit management API project and how to set it up and run it. Happy fruit management!
