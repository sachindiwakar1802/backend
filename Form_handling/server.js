import express from 'express';
const app = express();

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Define your route
app.get('/', (req, res) => {
  res.render('index'); // No need to write 'index.ejs'
});

// Define the port
const port = 2000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
