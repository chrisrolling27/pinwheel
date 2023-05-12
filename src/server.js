require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sdk = require('@pinwheelapi/v2023-04-18#3v1kr14lhf8a9nx');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

sdk.auth(process.env.PINWHEEL_API_SECRET);

app.post('/pinwheel/link_tokens', (req, res) => {
  sdk.post_v1_link_tokens___post({
    user: {
      client_user_id: req.body.client_user_id,
    },
    institution: req.body.institution,
    products: req.body.products,
    allocation: {type: 'amount'},
    disable_direct_deposit_splitting: false,
    language: 'en',
    skip_intro_screen: false
  }, {'pinwheel-version': '2023-04-18'})
    .then(({ data }) => res.json(data))
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'Failed to create link token' });
    });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});