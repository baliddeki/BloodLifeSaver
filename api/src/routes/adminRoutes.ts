import { Router } from 'express';
import {
    getStatistics,
    getBloodTypeDistribution,
    getRecentActivity,
} from '../controllers/adminController';
import { authenticate, authorize } from '../middleware/auth';

const router = Router();

/**
 * @route   GET /api/admin/stats
 * @desc    Get dashboard statistics
 * @access  Private (Admin only)
 */
router.get('/stats', authenticate, authorize('admin'), getStatistics);

/**
 * @route   GET /api/admin/blood-distribution
 * @desc    Get blood type distribution
 * @access  Private (Admin only)
 */
router.get('/blood-distribution', authenticate, authorize('admin'), getBloodTypeDistribution);

/**
 * @route   GET /api/admin/recent-activity
 * @desc    Get recent activity
 * @access  Private (Admin only)
 */
router.get('/recent-activity', authenticate, authorize('admin'), getRecentActivity);

export default router;
