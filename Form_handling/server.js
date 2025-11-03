
import express from 'express';
const app = express();

// ✅ Set EJS as the view engine
app.set('view engine', 'ejs');

// ✅ Define route
app.get('/', (req, res) => {
  res.render('index'); // do not write 'index.ejs'
});

// ✅ Start server
const port = 2000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
