import app from './src/app.js';
import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}).on('error', (err) => {
  console.error('Server error:', err);
});
