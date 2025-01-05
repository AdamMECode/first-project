const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, '.')));

const jackalApiUrl = 'https://rest.cosmos.directory/jackal'; // Replace with the actual Jackal Protocol API URL
const jackalApiDenom = 'ujkl'; // Replace with the actual denom for the token you want to query

app.get('/balance', async (req, res) => {
  const address = req.query.address;
  if (!address) {
    return res.status(400).send({ error: 'Address is required' });
  }

  try {
    const response = await axios.get(`${jackalApiUrl}/bank/balances/${address}`);
    const {amount} = response.data.result[0];
    res.send({ balance: amount });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Failed to retrieve balance' });
  }
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});