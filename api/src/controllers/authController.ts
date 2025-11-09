import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { supabase } from '../config/database';
import { sendSuccess, sendError } from '../utils/response';

/**
 * Register a new user
 * POST /api/auth/register
 */
export const register = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { email, password, role, name } = req.body;

    // Validation
    if (!email || !password || !role || !name) {
      return sendError(res, 'All fields are required', 400);
    }

    if (!['donor', 'hospital', 'admin'].includes(role)) {
      return sendError(res, 'Invalid role', 400);
    }

    if (password.length < 6) {
      return sendError(res, 'Password must be at least 6 characters', 400);
    }

    // Check if user exists
    const { data: existingUser } = await supabase
      .from('users')
      .select('id')
      .eq('email', email)
      .single();

    if (existingUser) {
      return sendError(res, 'Email already registered', 400);
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const { data: user, error } = await supabase
      .from('users')
      .insert([{
        email,
        password: hashedPassword,
        role,
        name,
      }])
      .select('id, email, role, name, created_at')
      .single();

    if (error) {
      console.error('Database error:', error);
      return sendError(res, 'Failed to create user', 500, error.message);
    }

    // Generate token
    const token = jwt.sign(
      { userId: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '7d' }
    );

    return sendSuccess(
      res,
      { user, token },
      'User registered successfully',
      201
    );
  } catch (error) {
    console.error('Error in register:', error);
    return sendError(res, 'Internal server error', 500);
  }
};

/**
 * Login user
 * POST /api/auth/login
 */
export const login = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return sendError(res, 'Email and password are required', 400);
    }

    // Get user
    const { data: user, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single();

    if (error || !user) {
      return sendError(res, 'Invalid email or password', 401);
    }

    // Check password
    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return sendError(res, 'Invalid email or password', 401);
    }

    // Generate token
    const token = jwt.sign(
      { userId: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '7d' }
    );

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user;

    return sendSuccess(
      res,
      { user: userWithoutPassword, token },
      'Login successful'
    );
  } catch (error) {
    console.error('Error in login:', error);
    return sendError(res, 'Internal server error', 500);
  }
};

/**
 * Get current user
 * GET /api/auth/me
 */
export const getCurrentUser = async (req: Request, res: Response): Promise<Response> => {
  try {
    if (!req.user) {
      return sendError(res, 'Not authenticated', 401);
    }

    const { data: user, error } = await supabase
      .from('users')
      .select('id, email, role, name, created_at')
      .eq('id', req.user.userId)
      .single();

    if (error || !user) {
      return sendError(res, 'User not found', 404);
    }

    return sendSuccess(res, user, 'User fetched successfully');
  } catch (error) {
    console.error('Error in getCurrentUser:', error);
    return sendError(res, 'Internal server error', 500);
  }
};
