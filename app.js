const express = require('express'); //Import the Express.js framework.
const { nanoid } = require('nanoid'); // Import the nanoid function from the 'nanoid' module. nanoid is used to generate unique identifiers
const app = express(); //Create an instance of the Express application
const port = 3000;  //we could use any other port

const urlDatabase = {}; //empty Objects

app.use(express.json()); //Enable parsing of JSON data in the request body

// Endpoint to create a short URL
app.post('/shorten', (req, res) => { //handling HTTP POST requests to the '/shorten' endpoint who will be used to create a short URL.
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ error: 'URL is required' });
  }

  const id = nanoid(8); // Generate a unique short identifier (8 characters in this case)

  // Store the mapping in the database
  urlDatabase[id] = url;

  const shortUrl = `http://localhost:${port}/${id}`;
  res.json({ shortUrl });
});

// Endpoint to redirect to the original URL
app.get('/:id', (req, res) => { //handle the get request 
  const { id } = req.params;
  const originalUrl = urlDatabase[id];

  if (!originalUrl) {
    return res.status(404).json({ error: 'Short URL not found' });
  }

  res.redirect(originalUrl); //to redirect to the original url 
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
