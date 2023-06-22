import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User, Role } from '../models/relations';
import { Model, FindOptions } from 'sequelize';
import BaseService from './baseService';

require('dotenv').config();

class UserService extends BaseService<any> {
  constructor() {
    super(User);
  }

  async getUserByEmail(email: string): Promise<any | null> {
    try {
      const options: FindOptions = {
        where: { email },
        include: {
          model: Role,
          through: { attributes: [] },
        },
      };

      const user = await User.findOne(options);
      return user;
    } catch (error) {
      throw new Error;
    }
  }

  async validatePassword(password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(password, hash);
  }

  async generateToken(userId: number): Promise<string> {
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      throw new Error('JWT secret is not defined');
    }
    const token = await jwt.sign({ userId }, jwtSecret, { expiresIn: '1h' });
    return token;
  }
}

export default new UserService();
