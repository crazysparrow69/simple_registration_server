const express = require('express');
const app = express();

// Global variables
const PORT = process.env.PORT || 3500;

// Middleware for json
app.use(express.json());

// Routes
app.use('/registration', require('./routes/registrationRoute'));
app.use('/auth', require('./routes/authRoute'));

app.all('*', (req, res) => {
  res.status(404);

  if (req.accepts('json')) {
      res.json({ "error": "404 Not Found" });
  } else {
      res.type('txt').send("404 Not Found");
  }
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));