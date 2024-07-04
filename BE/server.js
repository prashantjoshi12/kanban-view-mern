const express = require('express');
const cors = require('cors');
const mongooseConnection = require('./db-connection');
const taskRoute = require('./routes/task.route');

const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());

mongooseConnection()

app.use('/api/tasks', taskRoute )

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});