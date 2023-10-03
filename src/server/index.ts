import bodyParser from 'body-parser'
import express from 'express'
import { addUser, getAllUsers, getUserByName } from './db/queries.js'


const app = express();
const port = 1234;

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })

);

// GET user by name
app.get('/users/:username', async (request, response) => {
  const result = await getUserByName(request.params.username);
  if (result.success) {
    response.status(200);
    response.json({data: result.data});
    return;
  }
  response.status(500);
  response.json({ error: result.error});
});

// GET all users
app.get('/users', async (request, response) => {
  const result = await getAllUsers();
  if (result.success) {
    response.status(200);
    response.json({data: result.data});
    return;
  }
  response.status(500);
  response.json({ error: result.error});
});

// POST new user
app.post('/users', async (request, response) => {
  if (request) {
    const result = await addUser(request.body);
    if (result.success) {
      response.status(200);
      response.json();
      return;
    }
    response.status(500);
    response.json({error: result.error});
  }
})

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
