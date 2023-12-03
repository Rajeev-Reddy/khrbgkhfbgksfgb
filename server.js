const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to your MongoDB with your existing database name
mongoose.connect('mongodb://localhost:27017/project', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', (error) => {
  console.error('MongoDB Connection Error:', error);
});

db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Define a schema for your existing "Research" collection
const researchSchema = new mongoose.Schema({
  title: String,
  // Add more fields if needed
});

// Create a model based on the existing "Research" collection
// Create a model based on the existing "Research" collection
const Research = mongoose.model('Research', researchSchema, 'Research');

//publications
const publicationsSchema = new mongoose.Schema({
    title: String,
    // Add more fields if needed
  });

const publications = mongoose.model('selected publications', publicationsSchema, 'selected publications');
//end publications

//projects
const projectsSchema = new mongoose.Schema({
    title: String,
    // Add more fields if needed
  });

  const projects = mongoose.model('funded projects', projectsSchema, 'funded projects');
//end projects

//faculty
const facultySchema = new mongoose.Schema({
    image: Buffer,
    name: String,
    designation: String,
    interests: [String],
  });

const Faculty = mongoose.model('Faculty', facultySchema, 'faculty');
//end faculty

//courses
const coursesSchema = new mongoose.Schema({
  name: String,
  // Add more fields if needed
});

const courses = mongoose.model('courses offered', coursesSchema, 'courses offered');
//end courses

//students
const studentsSchema = new mongoose.Schema({
  image: Buffer,
  name: String,
  degree: String,
});

const Students = mongoose.model('students', studentsSchema, 'students');
//end students

//studentsStatistics
const studentsStatisticsSchema = new mongoose.Schema({
  degree: String,
  graduated: Number,
  inprogress: Number,
});

const StudentsStatistics = mongoose.model('studentsStatistics', studentsStatisticsSchema, 'studentsStatistics');
//end studentsStatistics

//alumni
const alumniSchema = new mongoose.Schema({
  name: String,
  designation: String,
});

const Alumni = mongoose.model('Alumni', alumniSchema, 'alumni');
//end alumni

app.use(express.static(__dirname));

// Serve HTML files from the main folder
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/researchworks.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'researchworks.html'));
});

app.get('/publication.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'publication.html'));
  });

  app.get('/project.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'project.html'));
  });

  app.get('/coursesoffered.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'coursesoffered.html'));
  });

  app.get('/Facultypage/Facultyinfo.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'Facultypage', 'Facultyinfo.html'));
  });

  app.get('/studentspage/studentindex.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'studentspage', 'studentindex.html'));
  });
// Add more routes for other HTML files if needed

app.get('/api/research', async (req, res) => {
    try {
      const collectionName = Research.collection.name;
      console.log('Querying Collection:', collectionName);
  
      const researchData = await Research.find();
      console.log('Research Data:', researchData);
      res.json(researchData);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  app.get('/api/publications', async (req, res) => {
    try {
      const collectionName = publications.collection.name;
      console.log('Querying Collection:', collectionName);
  
      const publicationsData = await publications.find();
      console.log('Publications Data:', publicationsData);
      res.json(publicationsData);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  app.get('/api/projects', async (req, res) => {
    try {
      const collectionName = projects.collection.name;
      console.log('Querying Collection:', collectionName);
  
      const projectsData = await projects.find();
      console.log('Projects Data:', projectsData);
      res.json(projectsData);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  app.get('/api/courses', async (req, res) => {
    try {
        const coursesData = await courses.find();
        console.log('Courses Data:', coursesData);
        res.json(coursesData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


app.get('/api/faculty', async (req, res) => {
    try {
      const facultyData = await Faculty.find();
      console.log('Faculty Data:', facultyData);
      res.json(facultyData);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  app.get('/api/students', async (req, res) => {
    try {
      const studentsData = await Students.find();
      console.log('Students Data:', studentsData);
      res.json(studentsData);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  app.get('/api/studentsStatistics', async (req, res) => {
    try {
        const studentsStatisticsData = await StudentsStatistics.find();
        console.log('Students Statistics Data:', studentsStatisticsData);
        res.json(studentsStatisticsData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/api/alumni', async (req, res) => {
  try {
    const alumniData = await Alumni.find();
    console.log('Alumni Data:', alumniData);
    res.json(alumniData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
