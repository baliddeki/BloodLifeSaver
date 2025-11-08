import { Request, Response } from 'express';
import { supabase } from '../config/database';
import { Statistics } from '../types';
import { sendSuccess, sendError } from '../utils/response';

/**
 * Get dashboard statistics
 * GET /api/admin/stats
 */
export const getStatistics = async (req: Request, res: Response): Promise<Response> => {
  try {
    // Get total donors count
    const { count: totalDonors, error: donorsError } = await supabase
      .from('donors')
      .select('*', { count: 'exact', head: true });

    if (donorsError) {
      console.error('Error fetching donor count:', donorsError);
      return sendError(res, 'Failed to fetch statistics', 500, donorsError.message);
    }

    // Get unique hospitals count (active hospitals with at least one request)
    const { data: hospitalData, error: hospitalsError } = await supabase
      .from('blood_requests')
      .select('hospital_name');

    if (hospitalsError) {
      console.error('Error fetching hospitals:', hospitalsError);
      return sendError(res, 'Failed to fetch statistics', 500, hospitalsError.message);
    }

    const activeHospitals = new Set(hospitalData?.map(req => req.hospital_name)).size;

    // Get approved requests count
    const { count: approvedRequests, error: approvedError } = await supabase
      .from('blood_requests')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'Approved');

    if (approvedError) {
      console.error('Error fetching approved requests:', approvedError);
      return sendError(res, 'Failed to fetch statistics', 500, approvedError.message);
    }

    // Get pending requests count
    const { count: pendingRequests, error: pendingError } = await supabase
      .from('blood_requests')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'Pending');

    if (pendingError) {
      console.error('Error fetching pending requests:', pendingError);
      return sendError(res, 'Failed to fetch statistics', 500, pendingError.message);
    }

    const stats: Statistics = {
      total_donors: totalDonors || 0,
      active_hospitals: activeHospitals,
      approved_requests: approvedRequests || 0,
      pending_requests: pendingRequests || 0,
    };

    return sendSuccess(res, stats, 'Statistics fetched successfully');
  } catch (error) {
    console.error('Error fetching statistics:', error);
    return sendError(res, 'Internal server error', 500);
  }
};

/**
 * Get blood type distribution
 * GET /api/admin/blood-distribution
 */
export const getBloodTypeDistribution = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { data, error } = await supabase
      .from('donors')
      .select('blood_type');

    if (error) {
      console.error('Database error:', error);
      return sendError(res, 'Failed to fetch blood type distribution', 500, error.message);
    }

    // Count donors by blood type
    const distribution: { [key: string]: number } = {};
    data?.forEach((donor) => {
      distribution[donor.blood_type] = (distribution[donor.blood_type] || 0) + 1;
    });

    return sendSuccess(res, distribution, 'Blood type distribution fetched successfully');
  } catch (error) {
    console.error('Error fetching blood type distribution:', error);
    return sendError(res, 'Internal server error', 500);
  }
};

/**
 * Get recent activity (latest donors and requests)
 * GET /api/admin/recent-activity
 */
export const getRecentActivity = async (req: Request, res: Response): Promise<Response> => {
  try {
    const limit = parseInt(req.query.limit as string) || 10;

    // Get recent donors
    const { data: recentDonors, error: donorsError } = await supabase
      .from('donors')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(limit);

    if (donorsError) {
      console.error('Error fetching recent donors:', donorsError);
      return sendError(res, 'Failed to fetch recent activity', 500, donorsError.message);
    }

    // Get recent requests
    const { data: recentRequests, error: requestsError } = await supabase
      .from('blood_requests')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(limit);

    if (requestsError) {
      console.error('Error fetching recent requests:', requestsError);
      return sendError(res, 'Failed to fetch recent activity', 500, requestsError.message);
    }

    const activity = {
      recent_donors: recentDonors,
      recent_requests: recentRequests,
    };

    return sendSuccess(res, activity, 'Recent activity fetched successfully');
  } catch (error) {
    console.error('Error fetching recent activity:', error);
    return sendError(res, 'Internal server error', 500);
  }
};