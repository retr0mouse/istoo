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
    const err = new Error("The username is invalid or empty");
    console.error(err);
    response.status(400).json({ error: err.message });
    return;
  }
  const requestResult = await getUserByNameDB(parsedUsername);
  if (requestResult.success) {
    response.status(200).json({ data: requestResult.data });
    return;
  }
  console.error(requestResult.error);
  response.status(requestResult.error?.errorCode || 500).json({ error: requestResult.error?.message });
});

// GET all users
app.get('/users', async (request, response) => {
  const resultRequest = await getAllUsersDB();
  if (resultRequest.success) {
    response.status(200).json({ data: resultRequest.data });
    return;
  }
  console.error(resultRequest.error);
  response.status(resultRequest.error?.errorCode || 500).json({ error: resultRequest.error?.message });
});

// Register a new account 
app.post('/register', async (request, response) => {
  const resultRequest = await registerUser(request.body);
  if (resultRequest.success) {
    response.status(200).json();
    return;
  } else if (!resultRequest.success) {
    console.error(resultRequest.error);
    response.status(resultRequest.error?.errorCode || 500).json({ error: resultRequest.error?.message });
  }
});

// Login an existing user
app.post('/login', async (request, response) => {
  const resultRequest = await loginUser(request.body.login, request.body.password);
  if (resultRequest.success) {
    response.status(200).json({ token: resultRequest.data });
    return;
  }
  console.error(resultRequest.error);
  response.status(resultRequest.error?.errorCode || 500).json({ error: resultRequest.error?.message });
});

app.post('/auth', authenticate, (req, res, next) => {
  // Access user info from req.user
  const userInfo = (req as any).user;

  if (userInfo) {
    res.status(200).json({ user: userInfo }); // Return user info as JSON
  } else {
    console.error("Unauthorized");
    res.status(401).json({ error: "Unauthorized" });
  }
});

// DELETE user by id
app.delete('/users/:userEmail', async (request, response) => {
  const parsedUserEmail = String(request.params.userEmail);
  if (!parsedUserEmail) {
    const err = new Error("The email is invalid");
    console.error(err);
    response.status(400).json({ error: err.message });
    return;
  }
  const requestResult = await deleteUser(parsedUserEmail);
  if (requestResult.success) {
    response.status(200).json();
    return;
  }
  console.error(requestResult.error);
  response.status(requestResult.error?.errorCode || 500).json({ error: requestResult.error?.message });
});

app.listen(port, () => {
  console.log(`Backend running on http://localhost:${port}.
Do not forget to run the watch task to compile the TypeScript files you dumbass.`);
});
