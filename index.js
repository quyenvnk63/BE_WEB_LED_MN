// Import Express module
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const sequelize = require('./config/database');
// const { createExampleDepartments } = require('./config/seeders/createData');

//routers 
const authRouter = require('./routes/auth');
const userRouter = require('./routes/user');
const departmentRouter = require('./routes/department');
const roleRouter = require('./routes/role');
const ledPanelRouter = require('./routes/ledPanel');
const displayContentRouter = require('./routes/displayContent');



require('dotenv').config();





// Create Express app
const app = express();

//middlewares
app.use(cors());
app.use(cookieParser());
app.use(express.json());

//seeder 
// createExampleDepartments();

app.use('/api/auth', authRouter);
app.use('/api/users', userRouter);
app.use('/api/departments',departmentRouter); 
app.use('/api/roles',roleRouter);
app.use('/api/led-panels',ledPanelRouter);
app.use('/api/display-content',displayContentRouter);

// Set up a basic route
// Start the server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});
