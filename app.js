const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const deptRoutes = require('./routes/deptRoutes');
const courseRoutes = require('./routes/courseRoutes');
const studentRoutes = require('./routes/studentRoutes');


const app = express();

app.use(bodyParser.json());
app.use(cors());

// Endpoint Here
app.get('/', function(req, res) {
  res.send("John Robert Olabiaga, MIT");
});

// Endpoint Here
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/dept', deptRoutes);
app.use('/api/course', courseRoutes);
app.use('/api/student', studentRoutes);

const PORT = 6000;

app.listen(PORT, () => {
  console.log('Server is running on port', PORT);
});