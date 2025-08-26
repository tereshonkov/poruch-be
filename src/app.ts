import express from 'express';
import cors from 'cors';
import { userRouter } from './routes/userRoutes.ts';

const app = express();

  cors({
    origin: ["http://localhost:5173", "https://poruch.click/"],
  })
app.use(express.json());
app.use(userRouter);

app.get("/", (req, res) => {
  res.send("Server is alive!");
});

export default app;