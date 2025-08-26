import app from './app';
import dotenv from 'dotenv';
dotenv.config();


const PORT = Number(process.env.PORT) || 4000;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
  console.log("🚀 DATABASE_URL in runtime:", process.env.DATABASE_URL);
}).on('error', (err) => {
  console.error('Server error:', err);
});
