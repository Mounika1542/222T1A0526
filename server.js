const express = require('express');
const app = express();
// using the shortid to install like npm install shortid
const shortid = require('shortid');

let urlDatabase = {};
// url which is store as database of an object 

app.use(express.json());

// creating the url of all 
app.post('/shorturls', (req, res) => {
  const originalUrl = req.body.originalUrl;
  const shortUrlCode = shortid.generate();
  urlDatabase[shortUrlCode] = {
    originalUrl,
    clicks: 0,
  };
  res.json({
    shortUrl: `http://localhost:3000/${shortUrlCode}`,
    originalUrl,
    clicks: 0,
  });
});

// response in foramt of  original URL and increment clicks
app.get('/:shortUrlCode', (req, res) => {
  const shortUrlCode = req.params.shortUrlCode;
  if (urlDatabase[shortUrlCode]) {
    urlDatabase[shortUrlCode].clicks++;
    res.redirect(urlDatabase[shortUrlCode].originalUrl);
  } else {
    res.status(404).json({ message: 'Short URL not found' });
  }
});

// total short links are store in the methods of all process 
app.get('/shorturls/:shortUrlCode', (req, res) => {
  const shortUrlCode = req.params.shortUrlCode;
  if (urlDatabase[shortUrlCode]) {
    res.json({
      shortUrl: `http://localhost:3000/${shortUrlCode}`,
      originalUrl: urlDatabase[shortUrlCode].originalUrl,
      clicks: urlDatabase[shortUrlCode].clicks, // here store the data how many time iu cilck the link so this is process
    });
  } else {
    res.status(404).json({ message: 'Short URL not found' });
  }
});

// Update shortened URL
app.put('/shorturls/:shortUrlCode', (req, res) => {
  const shortUrlCode = req.params.shortUrlCode;
  const newOriginalUrl = req.body.originalUrl;
  if (urlDatabase[shortUrlCode]) {
    urlDatabase[shortUrlCode].originalUrl = newOriginalUrl;
    res.json({
      message: 'Short URL updated successfully',
      newOriginalUrl,
    });
  } else {
    res.status(404).json({ message: 'Short URL not found' });
  }
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
