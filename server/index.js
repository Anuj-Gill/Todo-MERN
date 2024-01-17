const express = require("express");
const cors = require("cors");
const connectDb = require("./utils/DBconnection");
const { login, signup, authenticateJWT, userTodos, addTodo } = require('./controllers/usersC')

connectDb();

const app = express();

app.use(cors());
app.use(express.json());

app.post('/todoG/login', login);
app.post('/todoG/signup', signup);
app.post('/todoG/home', authenticateJWT, addTodo)
app.get('/todoG/home',authenticateJWT,userTodos )

app.listen(3000)
