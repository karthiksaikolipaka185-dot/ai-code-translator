import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import { generateToken } from '../utils/jwt.js';
import { verifyGoogleToken } from '../config/google.config.js';

const registerService = async (name, email, password) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error('User already exists with this email');
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  const token = generateToken(user);

  return {
    token,
    user: {
      id: user._id,
      email: user.email,
      name: user.name,
      picture: user.picture,
    },
  };
};

const loginService = async (email, password) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error('Invalid credentials');
  }

  if (!user.password) {
    throw new Error('Use Google Sign-In');
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error('Invalid credentials');
  }

  const token = generateToken(user);

  return {
    token,
    user: {
      id: user._id,
      email: user.email,
      name: user.name,
      picture: user.picture,
    },
  };
};

const googleLogin = async (credential) => {
  const googleUser = await verifyGoogleToken(credential);

  const user = await User.findOneAndUpdate(
    { googleId: googleUser.googleId },
    {
      googleId: googleUser.googleId,
      email: googleUser.email,
      name: googleUser.name,
      picture: googleUser.picture,
      lastLogin: new Date(),
    },
    {
      upsert: true,
      new: true,
    }
  );

  const token = generateToken(user);

  return {
    token,
    user: {
      id: user._id,
      email: user.email,
      name: user.name,
      picture: user.picture,
    },
  };
};

const getUserProfile = async (userId) => {
  const user = await User.findById(userId).select('-__v -googleId -password');
  
  if (!user) {
    throw new Error('User not found');
  }

  return {
    id: user._id,
    email: user.email,
    name: user.name,
    picture: user.picture,
  };
};

export { registerService, loginService, googleLogin, getUserProfile };
