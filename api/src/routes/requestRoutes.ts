import { Router } from 'express';
import {
  createBloodRequest,
  getAllBloodRequests,
  getBloodRequestById,
  getBloodRequestsByHospital,
  updateBloodRequestStatus,
  deleteBloodRequest,
} from '../controllers/requestController';
import { authenticate, authorize } from '../middleware/auth';

const router = Router();

/**
 * @route   POST /api/requests
 * @desc    Create a new blood request
 * @access  Private (Hospital only)
 */
router.post('/', authenticate, authorize('hospital'), createBloodRequest);

/**
 * @route   GET /api/requests
 * @desc    Get all blood requests
 * @access  Private (All authenticated users)
 */
router.get('/', authenticate, getAllBloodRequests);

/**
 * @route   GET /api/requests/:id
 * @desc    Get blood request by ID
 * @access  Private (All authenticated users)
 */
router.get('/:id', authenticate, getBloodRequestById);

/**
 * @route   GET /api/requests/hospital/:hospitalName
 * @desc    Get blood requests by hospital name
 * @access  Private (Hospital, Admin)
 */
router.get('/hospital/:hospitalName', authenticate, authorize('hospital', 'admin'), getBloodRequestsByHospital);

/**
 * @route   PATCH /api/requests/:id/status
 * @desc    Update blood request status
 * @access  Private (Admin only)
 */
router.patch('/:id/status', authenticate, authorize('admin'), updateBloodRequestStatus);

/**
 * @route   DELETE /api/requests/:id
 * @desc    Delete a blood request
 * @access  Private (Admin only)
 */
router.delete('/:id', authenticate, authorize('admin'), deleteBloodRequest);

export default router;
