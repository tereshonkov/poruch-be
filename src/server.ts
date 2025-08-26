import app from './app';
import dotenv from 'dotenv';
dotenv.config();


const PORT = Number(process.env.PORT);

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
}).on('error', (err) => {
  console.error('Server error:', err);
});
