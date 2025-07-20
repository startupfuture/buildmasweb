import { Request, Response, NextFunction } from 'express';

// Extendemos el objeto Request de Express para que coincida con el formato anterior
declare global {
  namespace Express {
    interface Request {
      user?: {
        uid: string;
        email: string;
        name: string;
      };
    }
  }
}

// Este es nuestro usuario hardcodeado/simulado
const mockUser = {
  uid: 'mock-user-123',
  email: 'testuser@example.com',
  name: 'Test User'
};

export const mockAuth = (req: Request, res: Response, next: NextFunction) => {
  req.user = mockUser;
  next();
};
