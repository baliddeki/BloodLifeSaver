import { Router } from 'express';
import {
    getStatistics,
    getBloodTypeDistribution,
    getRecentActivity,
} from '../controllers/adminController';

const router = Router();

/**
 * @route   GET /api/admin/stats
 * @desc    Get dashboard statistics
 * @access  Admin
 */
router.get('/stats', getStatistics);

/**
 * @route   GET /api/admin/blood-distribution
 * @desc    Get blood type distribution
 * @access  Admin
 */
router.get('/blood-distribution', getBloodTypeDistribution);

/**
 * @route   GET /api/admin/recent-activity
 * @desc    Get recent activity (donors and requests)
 * @access  Admin
 */
router.get('/recent-activity', getRecentActivity);

export default router;