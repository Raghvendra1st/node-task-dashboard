const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4']); 

require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// Connect to Cloud MongoDB Atlas
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('🔌 Success: Connected to MongoDB!'))
  .catch((err) => console.error('❌ MongoDB Connection Error:', err));

// Mount Task Endpoints
const taskRoutes = require('./routes/taskRoutes');
app.use('/api', taskRoutes);

app.listen(3000, () => {
  console.log('🚀 Server running live on port 3000!');
});
