const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema({
  id: String,
  task: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  status: {
    type: Boolean,
    default: false
  }
})

const Todo = mongoose.model('todos', TodoSchema);

module.exports = { Todo }