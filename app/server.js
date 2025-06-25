const app = require('./app.js');

const PORT = 3131;

app.listen(PORT, () => {
  console.log(`Todo app listening on port ${PORT}`);
});
