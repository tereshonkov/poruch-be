import express from 'express';
import cors from 'cors';
import { userRouter } from './routes/userRoutes';
import cookieParser from 'cookie-parser';
import requestRouter from './routes/requestRoutes';

const app = express();

app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:5173", "https://poruch.click"],
    credentials: true,
  })
);
app.use(express.json());
app.use(userRouter);
app.use(requestRouter);

app.get("/", (req, res) => {
  res.send("Server is alive!");
});

export default app;