//server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

//Middleware
app.use(bodyParser.urlencoded({ extended: true }));

//Connect to MongoDB Atlas
mongoose.connect('mongodb+srv://pranita:pranita123@mongoyt.cnzb5du.mongodb.net/eventDB?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log(' MongoDB connected successfully'))
.catch(err => console.log(' MongoDB connection error:', err));

//  Schema
const registrationSchema = new mongoose.Schema({
  name: String,
  email: String,
  mobile: String,
  event: String,
  date: { type: Date, default: Date.now }
});

// Model
const Registration = mongoose.model('Registration', registrationSchema);

//  Serve static HTML files (place your events.html inside "public" folder)
app.use(express.static('public'));

//  Handle form POST request
app.post('/register', async (req, res) => {
  try {
    const { name, email, mobile, event } = req.body;
    const newReg = new Registration({ name, email, mobile, event });
    await newReg.save();
    res.send('<h2>🎉 Registration Successful!</h2><a href="events.html">Back</a>');
  } catch (err) {
    console.error(err);
    res.send('<h3>❌ Error saving registration. Please try again.</h3>');
  }
});

app.listen(port, () => console.log(`🚀 Server running at http://localhost:${port}`));
