# PlanToGo
A single-page web app for creating travel itineraries.  Created using
React and Redux.  The app requires [PlanToGo-Server](https://github.com/muiradams/plantogo-server) -
a RESTful API server which handles creating and authenticating users,
and maintaining the database of travel itineraries.

This app is currently deployed on Heroku here: https://www.plantogo.co

Install dependencies: npm install
Start the server in development mode: npm run dev
Then open your browser to http://localhost:8080/

The app requires MongoDB and the PlanToGo-Server to be running in the background.

To deploy the app, the server needs to know the following config variable:
SERVER_URL: the url of the deployed plantogo-server
