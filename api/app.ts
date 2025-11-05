import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';

// Import routes
import donorRoutes from './src/routes/donorRoutes';
import requestRoutes from './src/routes/requestRoutes';
import adminRoutes from './src/routes/adminRoutes';

// Load environment variables
dotenv.config();

// Create Express app
const app: Application = express();

// Middleware
app.use(helmet()); // Security headers
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true,
}));
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Request logging middleware
app.use((req: Request, res: Response, next: NextFunction) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
    next();
});

// Health check endpoint
app.get('/health', (req: Request, res: Response) => {
    res.status(200).json({
        success: true,
        message: 'BloodLifeSaver API is running',
        timestamp: new Date().toISOString(),
    });
});

// API Routes
app.use('/api/donors', donorRoutes);
app.use('/api/requests', requestRoutes);
app.use('/api/admin', adminRoutes);

// 404 Handler
app.use((req: Request, res: Response) => {
    res.status(404).json({
        success: false,
        message: 'Route not found',
        path: req.path,
    });
});

// Global Error Handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error('Error:', err);
    res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: process.env.NODE_ENV === 'development' ? err.message : undefined,
    });
});

export default app;