const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.post('/register', (req, res) => {
  // console.log(req.body.email, req.body.password);
  res.send(`hello user: ${req.body.email}`);
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));
