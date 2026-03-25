import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import routes from "./routes.js";
import { errorMiddleware } from "./middleware/error.middleware.js";

const app = express();


app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is running 🚀",
  });
});

app.use("/api/v1", routes);


app.use(errorMiddleware);
export default app;