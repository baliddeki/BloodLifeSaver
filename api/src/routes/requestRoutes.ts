import { Router } from 'express';
import {
  createBloodRequest,
  getAllBloodRequests,
  getBloodRequestById,
  getBloodRequestsByHospital,
  updateBloodRequestStatus,
  deleteBloodRequest,
} from '../controllers/requestController';

const router = Router();

/**
 * @route   POST /api/requests
 * @desc    Create a new blood request
 * @access  Public
 */
router.post('/', createBloodRequest);

/**
 * @route   GET /api/requests
 * @desc    Get all blood requests (optional status query param)
 * @access  Public
 */
router.get('/', getAllBloodRequests);

/**
 * @route   GET /api/requests/:id
 * @desc    Get blood request by ID
 * @access  Public
 */
router.get('/:id', getBloodRequestById);

/**
 * @route   GET /api/requests/hospital/:hospitalName
 * @desc    Get blood requests by hospital name
 * @access  Public
 */
router.get('/hospital/:hospitalName', getBloodRequestsByHospital);

/**
 * @route   PATCH /api/requests/:id/status
 * @desc    Update blood request status (Approve/Reject)
 * @access  Admin
 */
router.patch('/:id/status', updateBloodRequestStatus);

/**
 * @route   DELETE /api/requests/:id
 * @desc    Delete a blood request
 * @access  Admin
 */
router.delete('/:id', deleteBloodRequest);

export default router;