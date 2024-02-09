const express = require("express");
const cors = require("cors");
const connectDb = require("./utils/DBconnection");
const { login, signup, authenticateJWT, userTodos, addTodo, deleteTodo, TaddTodo } = require('./controllers/usersC')

connectDb();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/todoG/login', login);
app.post('/todoG/signup', signup);
app.post('/todoG/home', authenticateJWT, addTodo)
app.get('/todoG/home', authenticateJWT, userTodos)
app.post('/todoG/home/done', authenticateJWT, deleteTodo, userTodos)

app.listen(3000)
