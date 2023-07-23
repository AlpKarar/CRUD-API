require('dotenv').config();

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3500;
const userRouter = require('./routers/userRouter');
const db = require('./middleware/connectToDB');

app.use(db);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(userRouter);

app.listen(PORT, () => console.log(`Server running on PORT ${ PORT }`));