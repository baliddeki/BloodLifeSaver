import app from './app';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 3001;

// Start server
app.listen(PORT, () => {
  console.log('='.repeat(50));
  console.log(`🩸 BloodLifeSaver API Server`);
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🏥 Health check: http://localhost:${PORT}/health`);
  console.log('='.repeat(50));
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('SIGINT signal received: closing HTTP server');
  process.exit(0);
});