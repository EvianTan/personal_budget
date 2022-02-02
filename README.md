# personal-budget

Simple Node/Express API to manage a portfolio budget using a budget envelope strategy. Users can create, read, update, and delete envelopes.

## Running the app
To run locally, run `node index.js`

Once the app is running locally, you can access the API at `http://localhost:3000/`

## Testing with Swagger
 - Retrieve envelopes using `GET http://localhost:3000/envelopes`
 - Retrieve a single envelope using `GET http://localhost:3000/envelopes/{id}`
 - Create an envelope using `POST http://localhost:3000/envelopes`
 - Update an envelope using `PUT http://localhost:3000/envelope/{id}`
 - Delete an envelope using `DELETE http://localhost:3000/envelope/{id}`
 - Transfer money between envelopes using `POST http://localhost:3000/envelope/{fromId}/transfer/{toId}`

## Resources
- [REST Architecture](https://auth0.com/blog/rest-architecture-part-1-building-api/)
- [Setting up Postman](https://author.codecademy.com/content-items/a5ed0fe82af00dcae4bb69e07d6b5fa8)
- [Debugging Javascript code](https://author.codecademy.com/content-items/e8a7f4f36eae1c4ee642af3cea4bfb4a)

## Options for extension
 - Create a frontend that displays envelopes and balances, and allows users to update each envelop balance
 - Add an API endpoint allowing user to add a single balance that’s distributed to multiple envelopes