const express = require('express');

const app = express();
const port = 3000;

const usersRouter = require('./routes/users');

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/users', usersRouter);

const ordersRouter = require('./routes/orders');
app.use('/orders', ordersRouter);

if (require.main === module) {
  app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
  });
}

module.exports = app;
