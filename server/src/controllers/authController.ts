import { Request, Response, NextFunction } from "express";
import { User } from "../models";
import { generateToken } from "../middleware/auth";
import { registerSchema, loginSchema, validate } from "../config/validation";

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const validation = validate(registerSchema, req.body);
    if (!validation.valid) {
      res.status(400).json({ 
        message: "Validation failed",
        errors: validation.errors 
      });
      return;
    }

    const { username, email, password } = validation.data!;

    const existingUser = await User.findOne({
      $or: [{ email: email.toLowerCase() }, { username }],
    });

    if (existingUser) {
      if (existingUser.email === email.toLowerCase()) {
        res.status(409).json({ message: "Email already registered" });
        return;
      }
      res.status(409).json({ message: "Username already taken" });
      return;
    }

    const user = await User.create({
      username,
      email: email.toLowerCase(),
      password,
    });

    const token = generateToken(
      user._id.toString(),
      user.username,
      user.email
    );

    res.status(201).json({
      message: "Registration successful",
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
      },
      token,
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const validation = validate(loginSchema, req.body);
    if (!validation.valid) {
      res.status(400).json({ 
        message: "Validation failed",
        errors: validation.errors 
      });
      return;
    }

    const { email, password } = validation.data!;

    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      res.status(401).json({ message: "Invalid email or password" });
      return;
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      res.status(401).json({ message: "Invalid email or password" });
      return;
    }

    const token = generateToken(
      user._id.toString(),
      user.username,
      user.email
    );

    res.json({
      message: "Login successful",
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
      },
      token,
    });
  } catch (error) {
    next(error);
  }
};

export const logout = async (
  _req: Request,
  res: Response,
  _next: NextFunction
): Promise<void> => {
  res.json({ message: "Logout successful" });
};

export const getMe = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authReq = req as any;
    const user = await User.findById(authReq.user._id).select("_id username email");

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.json({
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    next(error);
  }
};
