import { Router } from 'express';
import {
    registerDonor,
    getAllDonors,
    getDonorById,
    getDonorsByBloodType,
    deleteDonor,
} from '../controllers/donorController';

const router = Router();

/**
 * @route   POST /api/donors
 * @desc    Register a new donor
 * @access  Public
 */
router.post('/', registerDonor);

/**
 * @route   GET /api/donors
 * @desc    Get all donors
 * @access  Public
 */
router.get('/', getAllDonors);

/**
 * @route   GET /api/donors/:id
 * @desc    Get donor by ID
 * @access  Public
 */
router.get('/:id', getDonorById);

/**
 * @route   GET /api/donors/blood-type/:bloodType
 * @desc    Get donors by blood type
 * @access  Public
 */
router.get('/blood-type/:bloodType', getDonorsByBloodType);

/**
 * @route   DELETE /api/donors/:id
 * @desc    Delete a donor
 * @access  Admin
 */
router.delete('/:id', deleteDonor);

export default router;