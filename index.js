const express = require("express");
const mongoose = require("mongoose");
const app = express();

const user = require("./routes/user");
const products = require("./routes/product");
const auth = require("./routes/auth");
app.use(express.json());
mongoose
  .connect("mongodb://localhost/ecommerce")
  .then(() => console.log("Database connected"))
  .catch((err) => console.log(err));

app.use("/ecommerce/api/user", user);
app.use("/ecommerce/api/product", products);
app.use("/ecommerce/api/auth", auth);

app.listen(3000, () => {
  console.log("listening on port 3000");
});
