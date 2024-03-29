const { User } = require("../schema/usersS");
const { Todo } = require("../schema/todosS");
const jwt = require("jsonwebtoken");
const zod = require("zod");
const bcrypt = require('bcrypt');
const mongoose = require("mongoose");
require('dotenv').config();
const { SECRET_KEY, SALT_ROUNDS } = process.env;

const ValidateEmail = zod.string().email();
const ValidatePassword = zod.string()


const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).send({ message: "Email not registered!" });
    };
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).send({ message: 'Invalid password' })
    }
    const token = jwt.sign({ id: user._id }, SECRET_KEY, { expiresIn: "7d" });
    res.status(200).json({ status: true, message: 'Login Successfull', token });
  } catch (error) {
    return res.status(500).send({ message: "Internal Server Error" });
  }
}

const signup = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (user) {
      return res.status(403).json({ message: 'User already exists' });
    }
    const check = ValidateEmail.safeParse(email);
    if (check.success) {
      // const salt = await bcrypt.genSalt(Number(SALT));
      const hashedPassword = await bcrypt.hash(password, Number(SALT_ROUNDS));
      const newUser = await new User({ ...req.body, password: hashedPassword }).save();

      const token = jwt.sign({ id: newUser._id }, SECRET_KEY, { expiresIn: '7d' });
      res.status(201).json({ success: true, message: "Signed Up successfully. Please Log In now!!", user: newUser, token });
    }
    else {
      res.status(400).json({
        message: "Invalid email format",
        details: {
          email: "Email address is not valid",
        },
      });
    }
  } catch (error) {
    console.log(error)
    return res.status(500).send({ message: 'Internal Server Error' });
  }
};

function authenticateJWT(req, res, next) {
  const token = req.headers.authorization;
  // console.log(token)

  if (!token) {
    return res.status(401).json({ message: 'Authentication failed: No token provided.' });
  }

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Authentication failed: Invalid token.' });
    }
    console.log(decoded)
    User.findOne({ _id: decoded.id })
      .then(user => {
        req.id = decoded.id;

        next();
      })
      .catch(() => {
        return res.status(500).json({ message: 'Internal Server Error', status: false });
      });
    // User.findById({id: decoded.id})

  });
}

const addTodo = async (req, res) => {
  console.log(req.body)
  const id = req.id;
  console.log(req.body)
  const { task, description, status } = req.body;
  const newTodo = await new Todo({ id: id, ...req.body }).save();
  res.status(200).json({ message: "Todo added successfully", status: true });
}

const deleteTodo = async (req, res) => {

  try {
    const { taskId } = req.body;
    console.log(req.body)
    Todo.findOneAndDelete({ _id: taskId })
      .then((task) => {
        console.log("Task completed successfully!")
        res.status(200).json({message: "Task completed successfully!", status: true})
      })
      .catch((error) => {
        console.error("Error finding task:", error);
        res.json({ message: "Internal Server Error",status: false});
      });

  }
  catch (error) {
    console.log(error)
  }

}


const userTodos = async (req, res) => {
  const id = req.id;
  console.log(id)
  const todoList = await Todo.find({ id: id });
  res.status(200).send(todoList)
};

module.exports = {
  login,
  signup,
  userTodos,
  authenticateJWT,
  addTodo,
  deleteTodo
};