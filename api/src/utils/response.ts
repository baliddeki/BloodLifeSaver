import { Response } from 'express';
import { ApiResponse } from '../types';

/**
 * Send success response
 */
export const sendSuccess = <T>(
    res: Response,
    data: T,
    message: string = 'Success',
    statusCode: number = 200
): Response => {
    const response: ApiResponse<T> = {
        success: true,
        message,
        data,
    };
    return res.status(statusCode).json(response);
};

/**
 * Send error response
 */
export const sendError = (
    res: Response,
    message: string = 'An error occurred',
    statusCode: number = 500,
    error?: string
): Response => {
    const response: ApiResponse = {
        success: false,
        message,
        error: error || message,
    };
    return res.status(statusCode).json(response);
};

/**
 * Validate blood type
 */
export const isValidBloodType = (bloodType: string): boolean => {
    const validTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
    return validTypes.includes(bloodType);
};

/**
 * Validate urgency level
 */
export const isValidUrgency = (urgency: string): boolean => {
    const validLevels = ['Low', 'Medium', 'High', 'Critical'];
    return validLevels.includes(urgency);
};

/**
 * Validate request status
 */
export const isValidStatus = (status: string): boolean => {
    const validStatuses = ['Pending', 'Approved', 'Rejected'];
    return validStatuses.includes(status);
};