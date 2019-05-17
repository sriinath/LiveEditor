# Live Editor
A simple Live editor form fields

# Technology Stack

    - React.js
    - Typecript
    - GraphQL
    - Redux
    - Styled Components

# Folder Structure

Server Side (i.e) Middleware between API and Client Code (server):
    - Requests - To interact with the API (all API requests are made from here)
    - Resolvers - For both query and mutation, resolvers interact with Requests and returns the data to the queries / muatation from here
    - Schema - ALL the queries and mutation (data to be retuned to client) is declared here

Client Side (src):
    - Components - Contains all the reusable and simple components, which can be further broke down to Atoms Molecules and Organisms
    - Containers - Containers are the parent / top level heirarchy component containing all the data related to the functionality. It interacts with MiddleWare GraphQL and queries data, and provides the value fro the consumers. It also interacts with store for the data updation and retreival
    - Contexts - Contains all the context Providers
    - Layouts - Main component as well as the page level components which interacts with different components from containers as well as components to build the layout for a particular page
    - Store - Contains all the redux actions, reducers and the store
    - Typings - Typings for all the pages

# Installing dependencies

    Use either ``` npm i ``` or ```yarn``` to install all the dependecenies.

# Running the Application

    User either ``` npm start ``` for running locally as dev environment or ``` npm build ``` for the production mode  

# Hosted Link:

``` https://liveeditor.herokuapp.com/ ```