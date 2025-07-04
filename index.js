import express from 'express';
import session from 'express-session';
import 'dotenv/config';
import router from './routes/urlRoutes.js';
import db from './database/db.js';
import path from 'path';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: `${process.env.EXPRESS_SECRET}`,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 900 * 1000 },
  })
);

app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'));

db();

app.use(`/api/url`, router);

app.listen(PORT, () => {
  console.log('Server started at PORT:', PORT);
});
