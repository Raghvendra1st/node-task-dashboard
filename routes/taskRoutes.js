const express = require('express');
const router = express.Router();

// This local array will behave exactly like our database storage container
let dynamicTasks = [
  { id: 1, title: 'Learn Node.js Prerequisites', completed: true },
  { id: 2, title: 'Configure Modular Express Server', completed: true },
  { id: 3, title: 'Master full-stack CRUD Connections', completed: false }
];

// 1. READ ALL TASKS (GET)
router.get('/tasks', async (req, res) => {
  res.json(dynamicTasks);
});

// 2. CREATE A NEW TASK (POST)
router.post('/tasks', async (req, res) => {
  const newTaskTitle = req.body.title;
  if (!newTaskTitle) {
    return res.status(400).json({ error: 'Title field cannot be empty' });
  }

  const generatedTask = {
    id: dynamicTasks.length + 1,
    title: newTaskTitle,
    completed: false
  };

  dynamicTasks.push(generatedTask);
  res.status(201).json(generatedTask);
});

// 3. DELETE A TASK BY ID (DELETE)
router.delete('/tasks/:id', async (req, res) => {
  const targetId = Number(req.params.id);
  dynamicTasks = dynamicTasks.filter(item => item.id !== targetId);
  res.json({ message: 'Task removed successfully' });
});

module.exports = router;
