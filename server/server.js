const path = require("path");
const express = require("express");
const app = express();

// use local host or heroku specified port
const port = process.env.PORT || 5000;
const buildPath = path.join(__dirname, "..", "build");
app.use(express.static(buildPath));
app.use(require("./routes/shared"));
app.use(require("./routes/overview"));
app.use(require("./routes/headtohead"));
app.use(require("./routes/standings"));
app.use(require("./routes/records"));
app.use(require("./routes/drafts"));
app.use(require("./routes/admin"));

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true
  })
  );
  app.get("/", (req, res) => {
    res.json({ message: "ok" });
});

/* Error handler middleware */
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ message: err.message });
  return;
});

app.listen(port, () => {
  console.log(`App server now listening to port ${port}`);
});
