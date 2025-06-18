import express from 'express';
import 'dotenv/config';
import router from './routes/urlRoutes.js';
import db from './database/db.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

db();

app.use(`/api/url`, router);

app.listen(PORT, () => {
  console.log('Server started at PORT:', PORT);
});
