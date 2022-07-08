const express = require('express');
require('dotenv').config({ path: './config/.env' });
require('./config/dbConfig');
const path = require('path');
const cors = require('cors');

const userRoutes = require('./routes/user.routes');
const postRoutes = require('./routes/post.routes');
const likeRoutes = require('./routes/like.routes');

const app = express();
app.use(express.json());

app.use(cors(
    {
        credentials: true,
        origin: true,
    }
));



// Routes
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/user', userRoutes);
app.use('/api/post', postRoutes);
app.use('/api/like', likeRoutes);

module.exports = app;