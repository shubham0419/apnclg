const express = require('express');
require('dotenv').config();
const cors = require('cors');
const connectDB = require('./db/connect');
const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000', 
  credentials: true
}));


app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/topics', require('./routes/topics.route'));


connectDB().then(() => {
  app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
}).catch(err => {
  console.error('Database connection failed', err);
  process.exit(1);
});


