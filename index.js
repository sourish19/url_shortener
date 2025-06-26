import express from 'express';
import 'dotenv/config';
import router from './routes/urlRoutes.js';
import db from './database/db.js';
import path from 'path';
import staticRouter from './routes/staticRoutes.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'));

db();

app.use(`/api/url`, router);
app.use(`/api/url`, staticRouter);

app.listen(PORT, () => {
  console.log('Server started at PORT:', PORT);
});
