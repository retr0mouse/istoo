import bodyParser from 'body-parser'
import express from 'express'
import { addUser, deleteUser, getAllUsers, getUserByName } from './db/queries.js'
import { registerUser } from './auth/registration.js';

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
  const parsedUsername = String(request.params.username);
  if (!parsedUsername || parsedUsername.length == 0) {
    const err = new Error("The username is invalid");
    console.error(err);
    response.status(400);
    response.json({ error: err.message });
    return;
  }
  const result = await getUserByName(parsedUsername);
  if (result.success) {
    response.status(200);
    response.json({ data: result.data });
    return;
  }
  response.status(500);
  response.json({ error: result.error?.message });
});

// GET all users
app.get('/users', async (request, response) => {
  const result = await getAllUsers();
  if (result.success) {
    response.status(200);
    response.json({ data: result.data });
    return;
  }
  response.status(500);
  response.json({ error: result.error?.message });
});

// POST new user
app.post('/users', async (request, response) => {
  const parsedPassword = String(request.body.password);
  if (!parsedPassword || parsedPassword.length == 0) {
    const err = new Error("The password is invalid");
    console.error(err);
    response.status(400);
    response.json({ error: err.message });
    return;
  }
  request.body.password = parsedPassword;
  const result = await addUser(request.body);
  if (result.success) {
    response.status(200);
    response.json();
    return;
  }
  response.status(500);
  response.json({ error: result.error?.message });
})

app.post('/register', async (request, response) => {
  const result = await registerUser(request.body);
  if (result.success) {
    response.status(200);
    response.json();
    return;
  }
  response.status(500);
  response.json({ error: result.error?.message });
})

// DELETE user by id
app.delete('/users/:userId', async (request, response) => {
  const parsedUserId = Number(request.params.userId);
  if (!parsedUserId) {
    const err = new Error("The userId is invalid");
    // console.error(err);
    response.status(400);
    response.json({ error: err.message });
    return;
  }
  const result = await deleteUser(parsedUserId);
  if (result.success) {
    response.status(200);
    response.json();
    return;
  }
  response.status(500);
  response.json({ error: result.error?.message });
})

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
