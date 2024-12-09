const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!");
});


const wishlistRoutes = require("./wishlist/route")
app.use(wishlistRoutes);
const resumeRoutes = require("./resume/route")
app.use(resumeRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

<<<<<<< HEAD
=======
const userRoutes = require("./user/route");
app.use(userRoutes);

const jobsRoutes = require("./jobs/route");
app.use(jobsRoutes);
>>>>>>> 5966ab072dff06e099f7342166e1a7629843a371
