const express = require("express");

const bodyParser = require("body-parser");

const app = express();

// body parser middlewear
app.use(bodyParser.json());

// products routes
require("./routes/productRoutes")(app);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("LISTENING ON PORT 5000 at http://localhost:5000");
});
