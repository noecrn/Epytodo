require('dotenv').config();

const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Middleware
const notFound = require('./middleware/notFound');
const auth = require('./middleware/auth');

// Routes
const authRoutes = require('./routes/auth/auth');
const userRoutes = require('./routes/user/user');
// const todosRoutes = require('./routes/todos/todos');

// Use Middleware
app.use(express.json());

// Use Routes
app.use('/auth', authRoutes);
app.use('/user', auth, userRoutes);
// app.use('/todos', auth, todosRoutes);

app.use(notFound);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});