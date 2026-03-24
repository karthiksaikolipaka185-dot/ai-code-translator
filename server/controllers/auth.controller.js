import { registerService, loginService, googleLogin, getUserProfile } from '../services/authService.js';

// @desc    Register a new user
export const registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      res.status(400);
      throw new Error('Please provide all required fields');
    }

    const result = await registerService(name, email, password);

    return res.status(201).json({
      success: true,
      data: result,
    });
  } catch (error) {
    if (error.statusCode) {
      res.status(error.statusCode);
    } else if (res.statusCode === 200) {
      res.status(400);
    }
    next(error);
  }
};

// @desc    Login user via email/password
export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400);
      throw new Error('Please provide email and password');
    }

    const result = await loginService(email, password);

    return res.json({
      success: true,
      data: result,
    });
  } catch (error) {
    if (res.statusCode === 200) {
      res.status(401); // Unauthorized for login failures by default if not set
    }
    next(error);
  }
};

// @desc    Authenticate via Google Sign-In
export const googleAuthController = async (req, res, next) => {
  try {
    const { credential } = req.body;

    if (!credential) {
      res.status(400);
      throw new Error('Google credential is required');
    }

    const result = await googleLogin(credential);

    return res.json({
      success: true,
      data: result,
    });
  } catch (error) {
    if (res.statusCode === 200) {
      res.status(401);
    }
    next(error);
  }
};

// @desc    Get current logged in user profile
export const getMe = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const result = await getUserProfile(userId);

    return res.json({
      success: true,
      data: result,
    });
  } catch (error) {
    if (res.statusCode === 200) {
      res.status(404);
    }
    next(error);
  }
};

// @desc    Logout user
export const logoutUser = (req, res) => {
  return res.json({
    success: true,
    data: { message: 'Logged out successfully' },
  });
};
