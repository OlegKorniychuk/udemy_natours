const app = require('./app');

const port = 3000;

app.listen(port, () => {
  console.log(`Server up and running at port ${port}`)
});