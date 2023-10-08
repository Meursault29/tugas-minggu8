const express = require("express");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const app = express();

app.use(express.json());
app.use("/auth", authRoute);
app.use("/users", userRoute);

const port = 1945;

app.listen(port, () => {
    console.log(`run on http://localhost:${port}`);
  });  