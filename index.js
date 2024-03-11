const express = require('express');
const router = require('./routes/index');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use('/api', router);

app.listen(3000, () => console.log(`Server start on port ${3000}`));
