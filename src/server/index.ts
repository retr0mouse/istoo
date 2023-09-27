import bodyParser from 'body-parser'
import express from 'express'
import { getAllUsers } from './db/queries.js'


const app = express();
const port = 1234;

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
  
);

app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' });
});

app.get('/users', async (request, response) => {
  const users = await getAllUsers();
  // const users = "";
  response.json({ users: users ? users : 'not found' });
});

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
