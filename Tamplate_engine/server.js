import express from 'express';
const app = express();

// ✅ Set EJS as the template engine
app.set('view engine', 'ejs');

// ✅ JSON data (your course list)
let products = [
  {
    id: 1,
    title: "Full Stack Web Development",
    instructor: "Rahul Mehta",
    duration: "6 months",
    price: 12999,
    rating: 4.8,
    studentsEnrolled: 1200
  },
  {
    id: 2,
    title: "React for Beginners",
    instructor: "Ankit Patel",
    duration: "3 months",
    price: 4999,
    rating: 4.6,
    studentsEnrolled: 800
  },
  {
    id: 3,
    title: "Data Structures & Algorithms in JavaScript",
    instructor: "Nisha Sharma",
    duration: "4 months",
    price: 7999,
    rating: 4.7,
    studentsEnrolled: 950
  },
  {
    id: 4,
    title: "Python for Machine Learning",
    instructor: "Dr. Amit Verma",
    duration: "5 months",
    price: 9999,
    rating: 4.9,
    studentsEnrolled: 1500
  },
  {
    id: 5,
    title: "Cloud Computing with AWS",
    instructor: "Ravi Singh",
    duration: "6 months",
    price: 10999,
    rating: 4.5,
    studentsEnrolled: 600
  }
];

// ✅ Route for homepage
app.get('/', (req, res) => {
  const name = 'Ram';
  res.render('index', { name, products });
});

// ✅ Start the server
const port = 1000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
