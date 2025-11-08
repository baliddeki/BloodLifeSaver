import { Request, Response } from 'express';
import { supabase } from '../config/database';
import { BloodRequest } from '../types';
import { sendSuccess, sendError, isValidBloodType, isValidUrgency } from '../utils/response';

/**
 * Create a new blood request
 * POST /api/requests
 */
export const createBloodRequest = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { hospital_name, blood_type, units, urgency, reason, contact_person, phone } = req.body;

        // Validation
        if (!hospital_name || !blood_type || !units || !urgency || !contact_person || !phone) {
            return sendError(res, 'All required fields must be provided', 400);
        }

        if (units < 1) {
            return sendError(res, 'Units must be at least 1', 400);
        }

        if (!isValidBloodType(blood_type)) {
            return sendError(res, 'Invalid blood type', 400);
        }

        if (!isValidUrgency(urgency)) {
            return sendError(res, 'Invalid urgency level', 400);
        }

        const requestData: Omit<BloodRequest, 'id' | 'created_at' | 'updated_at'> = {
            hospital_name,
            blood_type,
            units: parseInt(units),
            urgency,
            reason: reason || '',
            contact_person,
            phone,
            status: 'Pending',
        };

        const { data, error } = await supabase
            .from('blood_requests')
            .insert([requestData])
            .select()
            .single();

        if (error) {
            console.error('Database error:', error);
            return sendError(res, 'Failed to create blood request', 500, error.message);
        }

        return sendSuccess(res, data, 'Blood request created successfully', 201);
    } catch (error) {
        console.error('Error creating blood request:', error);
        return sendError(res, 'Internal server error', 500);
    }
};

/**
 * Get all blood requests
 * GET /api/requests
 */
export const getAllBloodRequests = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { status } = req.query;

        let query = supabase
            .from('blood_requests')
            .select('*')
            .order('created_at', { ascending: false });

        // Filter by status if provided
        if (status) {
            query = query.eq('status', status);
        }

        const { data, error } = await query;

        if (error) {
            console.error('Database error:', error);
            return sendError(res, 'Failed to fetch blood requests', 500, error.message);
        }

        return sendSuccess(res, data, 'Blood requests fetched successfully');
    } catch (error) {
        console.error('Error fetching blood requests:', error);
        return sendError(res, 'Internal server error', 500);
    }
};

/**
 * Get blood request by ID
 * GET /api/requests/:id
 */
export const getBloodRequestById = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { id } = req.params;

        const { data, error } = await supabase
            .from('blood_requests')
            .select('*')
            .eq('id', id)
            .single();

        if (error) {
            console.error('Database error:', error);
            return sendError(res, 'Blood request not found', 404, error.message);
        }

        return sendSuccess(res, data, 'Blood request fetched successfully');
    } catch (error) {
        console.error('Error fetching blood request:', error);
        return sendError(res, 'Internal server error', 500);
    }
};

/**
 * Get blood requests by hospital name
 * GET /api/requests/hospital/:hospitalName
 */
export const getBloodRequestsByHospital = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { hospitalName } = req.params;

        const { data, error } = await supabase
            .from('blood_requests')
            .select('*')
            .eq('hospital_name', hospitalName)
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Database error:', error);
            return sendError(res, 'Failed to fetch blood requests', 500, error.message);
        }

        return sendSuccess(res, data, 'Blood requests fetched successfully');
    } catch (error) {
        console.error('Error fetching blood requests:', error);
        return sendError(res, 'Internal server error', 500);
    }
};

/**
 * Update blood request status (Approve/Reject)
 * PATCH /api/requests/:id/status
 */
export const updateBloodRequestStatus = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        if (!status || (status !== 'Approved' && status !== 'Rejected')) {
            return sendError(res, 'Status must be either "Approved" or "Rejected"', 400);
        }

        const { data, error } = await supabase
            .from('blood_requests')
            .update({ status, updated_at: new Date().toISOString() })
            .eq('id', id)
            .select()
            .single();

        if (error) {
            console.error('Database error:', error);
            return sendError(res, 'Failed to update blood request status', 500, error.message);
        }

        return sendSuccess(res, data, `Blood request ${status.toLowerCase()} successfully`);
    } catch (error) {
        console.error('Error updating blood request status:', error);
        return sendError(res, 'Internal server error', 500);
    }
};

/**
 * Delete a blood request
 * DELETE /api/requests/:id
 */
export const deleteBloodRequest = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { id } = req.params;

        const { error } = await supabase
            .from('blood_requests')
            .delete()
            .eq('id', id);

        if (error) {
            console.error('Database error:', error);
            return sendError(res, 'Failed to delete blood request', 500, error.message);
        }

        return sendSuccess(res, null, 'Blood request deleted successfully');
    } catch (error) {
        console.error('Error deleting blood request:', error);
        return sendError(res, 'Internal server error', 500);
    }
};