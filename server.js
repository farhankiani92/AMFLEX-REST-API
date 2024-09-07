const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Import routes
const routes = require('./routes');

// Use routes
app.use('/api', routes);

// Start server
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
