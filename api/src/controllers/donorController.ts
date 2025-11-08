import { Request, Response } from 'express';
import { supabase } from '../config/database';
import { Donor } from '../types';
import { sendSuccess, sendError, isValidBloodType } from '../utils/response';

/**
 * Register a new donor
 * POST /api/donors
 */
export const registerDonor = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { name, age, blood_type, last_donation_date, phone, email } = req.body;

    // Validation
    if (!name || !age || !blood_type || !phone || !email) {
      return sendError(res, 'All required fields must be provided', 400);
    }

    if (age < 18 || age > 65) {
      return sendError(res, 'Age must be between 18 and 65', 400);
    }

    if (!isValidBloodType(blood_type)) {
      return sendError(res, 'Invalid blood type', 400);
    }

    const donorData: Omit<Donor, 'id' | 'created_at' | 'updated_at'> = {
      name,
      age: parseInt(age),
      blood_type,
      last_donation_date: last_donation_date || null,
      phone,
      email,
    };

    const { data, error } = await supabase
      .from('donors')
      .insert([donorData])
      .select()
      .single();

    if (error) {
      console.error('Database error:', error);
      return sendError(res, 'Failed to register donor', 500, error.message);
    }

    return sendSuccess(res, data, 'Donor registered successfully', 201);
  } catch (error) {
    console.error('Error registering donor:', error);
    return sendError(res, 'Internal server error', 500);
  }
};

/**
 * Get all donors
 * GET /api/donors
 */
export const getAllDonors = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { data, error } = await supabase
      .from('donors')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Database error:', error);
      return sendError(res, 'Failed to fetch donors', 500, error.message);
    }

    return sendSuccess(res, data, 'Donors fetched successfully');
  } catch (error) {
    console.error('Error fetching donors:', error);
    return sendError(res, 'Internal server error', 500);
  }
};

/**
 * Get donor by ID
 * GET /api/donors/:id
 */
export const getDonorById = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from('donors')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Database error:', error);
      return sendError(res, 'Donor not found', 404, error.message);
    }

    return sendSuccess(res, data, 'Donor fetched successfully');
  } catch (error) {
    console.error('Error fetching donor:', error);
    return sendError(res, 'Internal server error', 500);
  }
};

/**
 * Get donors by blood type
 * GET /api/donors/blood-type/:bloodType
 */
export const getDonorsByBloodType = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { bloodType } = req.params;

    if (!isValidBloodType(bloodType)) {
      return sendError(res, 'Invalid blood type', 400);
    }

    const { data, error } = await supabase
      .from('donors')
      .select('*')
      .eq('blood_type', bloodType)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Database error:', error);
      return sendError(res, 'Failed to fetch donors', 500, error.message);
    }

    return sendSuccess(res, data, 'Donors fetched successfully');
  } catch (error) {
    console.error('Error fetching donors:', error);
    return sendError(res, 'Internal server error', 500);
  }
};

/**
 * Delete a donor
 * DELETE /api/donors/:id
 */
export const deleteDonor = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.params;

    const { error } = await supabase
      .from('donors')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Database error:', error);
      return sendError(res, 'Failed to delete donor', 500, error.message);
    }

    return sendSuccess(res, null, 'Donor deleted successfully');
  } catch (error) {
    console.error('Error deleting donor:', error);
    return sendError(res, 'Internal server error', 500);
  }
};