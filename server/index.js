const express = require('express');
const cors = require('cors');
const pool = require('./db');
const app = express();

app.use(cors());
app.use(express.json());

// routes

// create a todo
app.post('/todos', async (req, res) => {
  try {
    const {
      description
    } = req.body;
    const newTodo = await pool.query(
      "INSERT INTO todo (description) VALUES ($1) RETURNING *",
      [description]
    );
    res.status(201).json(newTodo.rows[0]);
  } catch (error) {
    console.log(error.message);
  };
});

// get all todos
app.get('/todos', async (req, res) => {
  try {
    const allTodos = await pool.query(
      "SELECT * FROM todo"
    );
    res.status(200).json(allTodos.rows);
  } catch (error) {
    console.log(error.message);
  };
});

// get a todo
app.get('/todos/:todo_id', async (req, res) => {
  try {
    const todo = await pool.query(
      "SELECT * FROM todo WHERE todo_id = $1",
      [req.params.todo_id]
    );
    const result = res.status(200).json(todo.rows[0]);
    // res.send(result);
  } catch (error) {
    res.status(400).json(error.message).send(error.message);
  };
});

// update a todo
app.put('/todos/:todo_id', async (req, res) => {
  try {
    const { todo_id } = req.params;
    const { description, name } = req.body;
    const updateTodo = await pool.query(
      "update todo set description = $1, name = $2 where todo_id = $3",
      [description, name, todo_id]
    );
    res.status(200).json("Todo has been updated ..");
  } catch (error) {
    console.error(error.message);
  }
});

// delete a todo
app.delete('/todos/:todo_id', async (req, res) => {
  try {
    const { todo_id } = req.params;
    const deleteTodo = await pool.query("delete from todo where todo_id = $1", [todo_id]);
    res.status(200).json(`Todo ${todo_id} has been deleted`);
  } catch (error) {
    
  }
});

// server up
app.listen(6001, () => {
  console.log('server strted ..')
});
