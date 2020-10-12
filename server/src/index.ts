const express = require('express');

const app = express();
const Datastore = require('nedb');

const
  db = new Datastore({ filename: './src/cakes.json', autoload: true });
const helmet = require('helmet');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const main = require('./controllers/main');

const whitelist = ['http://localhost:3000'];
const corsOptions = {
  origin(origin: any, callback: any) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

app.use(helmet());
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(morgan('combined'));

app.get('/', (req: any, res: any) => res.send('hello world'));
app.get('/cake/:id', (req: any, res: any) => main.getCake(req, res, db));
app.get('/cakes', (req: any, res: any) => main.getCakes(req, res, db));
app.post('/cake', (req: any, res: any) => main.postCake(req, res, db));
app.put('/cake', (req: any, res: any) => main.putCake(req, res, db));
app.delete('/cake/:id', (req: any, res: any) => main.deleteCake(req, res, db));

app.listen(process.env.PORT || 3001, () => {
  console.log(`app is running on port ${process.env.PORT || 3001}`);
});
