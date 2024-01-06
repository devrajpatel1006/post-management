'use strict';

const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const profileRoutes = require('./routes/profile.routes');
const postRoutes = require('./routes/post.routes');
const usersRoutes = require('./routes/users.routes');
const app = express();
const port =  process.env.PORT || 3000;
const mongoose = require('mongoose');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');
const connectDB = require('./config/db');

// Connect Database
connectDB();

// set the view engine to ejs
app.set('view engine', 'ejs');

// routes
app.use('/api/', profileRoutes);
app.use('/api', postRoutes);
app.use('/api/', usersRoutes);


app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, { customCss: '.auth-wrapper { display: none !important; }' }));

// start server

async function startServer() {
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  }
  
  // Start the server
  startServer();