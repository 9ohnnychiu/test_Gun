const express = require('express');
const app = express();
const Gun = require('gun');

app.use(express.static('.'));

const server = app.listen(3000, () => {
  console.log('App listening on port 3000 with local Gun relay!');
});

// Initialize Gun and disable multicast to prevent EADDRINUSE crashes on Windows
Gun({ web: server, multicast: false });
