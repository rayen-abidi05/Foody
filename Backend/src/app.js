require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser")

const authRouter = require("./routes/authRoutes");
const recipeRouter = require ("./routes/recipeRoutes")

const app = express();
app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
    }));

app.use(cookieParser());

const {checkGlobal} = require('./middleware/checkGlobal')

app.use("/api/auth",authRouter);
app.use("/api/recipe",recipeRouter);
app.use(checkGlobal);





module.exports = app;