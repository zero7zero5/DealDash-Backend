const express = require("express");
const mongoose = require("mongoose");
const app = express();

const user = require("./routes/user");
const products = require("./routes/product");
const auth = require("./routes/auth");
app.use(express.json());
mongoose
  .connect(
    "mongodb+srv://saber_basha:1234567890@cluster0.aga7wy0.mongodb.net/ecommerce?retryWrites=true&w=majority"
  )
  .then(() => console.log("Database connected"))
  .catch((err) => console.log(err));

app.use("/ecommerce/api/user", user);
app.use("/ecommerce/api/product", products);
app.use("/ecommerce/api/auth", auth);

app.listen(3000, () => {
  console.log("listening on port 3000");
});
