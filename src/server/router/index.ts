import bodyParser from 'body-parser';
import express from 'express';
import cors from 'cors';
import { addUserDB, getAllUsersDB, getUserByNameDB } from '../db/queries.js';
import { loginUser } from '../middleware/account/login.js';
import { deleteUser } from '../middleware/account/modify.js';
import { registerUser } from '../middleware/account/registration.js';
import { authenticate } from '../middleware/auth.js';

const app = express();
const port = 1234;
app.use(cors());

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
  const result = await getUserByNameDB(parsedUsername);
  if (result.success) { // TODO: this will be true even if user was not found
    response.status(200);
    response.json({ data: result.data });
    return;
  }
  response.status(500);
  response.json({ error: result.error?.message });
});

// GET all users
app.get('/users', async (request, response) => {
  const result = await getAllUsersDB();
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
  const result = await addUserDB(request.body);
  if (result.success) {
    response.status(200);
    response.json();
    return;
  }
  response.status(500);
  response.json({ error: result.error?.message });
});

// Register a new account 
app.post('/register', async (request, response) => {
  const result = await registerUser(request.body);
  if (result.success) {
    response.status(200);
    response.json();
    return;
  }
  response.status(500);
  response.json({ error: result.error?.message });
});

// Login an existing user
app.post('/login', async (request, response) => {
  const result = await loginUser(request.body.login, request.body.password);
  if (result.success) {
    response.status(200);
    response.json({token: result.data});
    return;
  }
  response.status(500);
  response.json({ error: result.error?.message });
});

interface User {
  id: string;
  username: string;
}

app.post('/auth', authenticate, (req, res, next) => {
  // Access user info from req.user
  const userInfo = (req as any).user as User;

  if (userInfo) {
    res.status(200).json({ user: userInfo }); // Return user info as JSON
  } else {
    res.status(401).json({ error: "Unauthorized" });
  }
});

// DELETE user by id
app.delete('/users/:userEmail', async (request, response) => {
  const parsedUserEmail = String(request.params.userEmail);
  if (!parsedUserEmail) {
    const err = new Error("The email is invalid");
    // console.error(err);
    response.status(400);
    response.json({ error: err.message });
    return;
  }
  const result = await deleteUser(parsedUserEmail);
  if (result.success) {
    response.status(200);
    response.json();
    return;
  }
  response.status(500);
  response.json({ error: result.error?.message });
});

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
