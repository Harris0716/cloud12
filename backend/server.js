const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(cors({
  origin: ''
}));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const wishlistRoutes = require("./wishlist/route");
app.use(wishlistRoutes);
const resumeRoutes = require("./resume/route");
app.use(resumeRoutes);

const userRoutes = require("./user/route");
app.use(userRoutes);

const jobsRoutes = require("./jobs/route");
app.use(jobsRoutes);

const applicationRoutes = require("./application/route");
app.use(applicationRoutes);


const s3Routes = require("./s3/route");
app.use(s3Routes);
const landlordRoutes = require("./jobs/route");
app.use(landlordRoutes);


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

