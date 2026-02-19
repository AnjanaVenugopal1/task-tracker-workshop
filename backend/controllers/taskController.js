const pool = require('../db');

const createTask = async (req, res) => {
    try {
      const { title, description, status, due_date } = req.body;
  
      let fileUrl = null;
  
      if (req.file) {
        fileUrl = `/uploads/${req.file.filename}`;
      }
  
      const newTask = await pool.query(
        `INSERT INTO tasks (title, description, status, due_date, assigned_to, file_url)
         VALUES ($1, $2, $3, $4, $5, $6)
         RETURNING *`,
        [title, description, status, due_date, req.user.id, fileUrl]
      );
  
      res.status(201).json(newTask.rows[0]);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error.message });
    }
  };
  

const getTasks = async (req, res) => {
  try {
    const tasks = await pool.query(
      'SELECT * FROM tasks WHERE assigned_to = $1',
      [req.user.id]
    );

    res.json(tasks.rows);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, status, due_date } = req.body;

    const updatedTask = await pool.query(
      `UPDATE tasks
       SET title=$1, description=$2, status=$3, due_date=$4
       WHERE id=$5 AND assigned_to=$6
       RETURNING *`,
      [title, description, status, due_date, id, req.user.id]
    );

    res.json(updatedTask.rows[0]);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    await pool.query(
      'DELETE FROM tasks WHERE id=$1 AND assigned_to=$2',
      [id, req.user.id]
    );

    res.json({ message: 'Task deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { createTask, getTasks, updateTask, deleteTask };
