import { Router } from 'express';
import {
    registerDonor,
    getAllDonors,
    getDonorById,
    getDonorsByBloodType,
    deleteDonor,
} from '../controllers/donorController';
import { authenticate, authorize } from '../middleware/auth';

const router = Router();

/**
 * @route   POST /api/donors
 * @desc    Register a new donor
 * @access  Private (Donor only)
 */
router.post('/', authenticate, authorize('donor'), registerDonor);

/**
 * @route   GET /api/donors
 * @desc    Get all donors
 * @access  Private (Hospital, Admin)
 */
router.get('/', authenticate, authorize('hospital', 'admin'), getAllDonors);

/**
 * @route   GET /api/donors/:id
 * @desc    Get donor by ID
 * @access  Private (Hospital, Admin)
 */
router.get('/:id', authenticate, authorize('hospital', 'admin'), getDonorById);

/**
 * @route   GET /api/donors/blood-type/:bloodType
 * @desc    Get donors by blood type
 * @access  Private (Hospital, Admin)
 */
router.get('/blood-type/:bloodType', authenticate, authorize('hospital', 'admin'), getDonorsByBloodType);

/**
 * @route   DELETE /api/donors/:id
 * @desc    Delete a donor
 * @access  Private (Admin only)
 */
router.delete('/:id', authenticate, authorize('admin'), deleteDonor);

export default router;
