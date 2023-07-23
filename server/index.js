import express from 'express';


const app = express();


app.get('/', (req, res) => {
  console.log('Hello World!');
  res.send('Hello World!');
});

const PORT = 5500;

app.listen(5500, () => {
  console.log('Example app listening on port 5500!');
});
