const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config({ path: '.env.example' });

const logger = require('./middleware/logger');

/**
 * Create Express server
 */
const app = express();

const PORT = process.env.PORT || 3000;
const DATABASEURL = process.env.DATABASEURL || 'mongodb://localhost:27017/todo_list';

/**
 * Controllers (route handlers)
 */
const taskRoutes = require('./routes/task');
const todoRoutes = require('./routes/todo');
const indexRoutes = require('./routes/index');

/**
 * Connect to MongoDB
 */
mongoose.connect(DATABASEURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  logger.debug('Database connected!');
}).catch((err) => {
  logger.fatal(err.message, 'DATABASE CONNECTION ERROR!');
});

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

// ROUTES
app.use('/', indexRoutes);
app.use('/todos', todoRoutes);
app.use('/todos/:todo_id/tasks', taskRoutes);

app.listen(PORT, () => {
  logger.debug(`Server has started on port ${PORT}!`);
});

// TODO Add eslint
// TODO Add Typescript
// TODO Add pino for logging
// TODO Add react
// TODO Extract envs to .env
// TODO Add async await for requests