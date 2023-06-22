import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import userService from '../services/userService';
import departmentService from '../services/departmentService';
import roleService from '../services/roleService';
import { hashPassword } from '../utils/passwordUtils';

// CREATE
async function createUser(req:Request, res:Response) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const email = req.body.email;
    const check = await userService.getUserByEmail(email);
    if (check) {
      return res.status(401).json({ message: 'User already exists' });
    }

    const passwordHash = await hashPassword(req.body.password);
    const { department_id, role_id } = req.body;
    const userData = { ...req.body, password: passwordHash };
    const user = await userService.create(userData);
    await departmentService.assignDepartmentToUser(user.id, department_id);
    await roleService.assignRoleToUser(user.id, role_id);

    res.status(201).json({
      id: user.id,
      email: user.email,
      name: user.name,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function assignRoleToUser(req:Request, res:Response) {
  try {
    const userId = req.params.id;
    const roleId = req.body.roleId;

    await roleService.assignRoleToUser(userId, roleId);

    res.status(200).json({ message: 'Role assigned successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function removeRoleFromUser(req:Request, res:Response) {
  try {
    const userId = req.params.id;
    const roleId = req.body.roleId;

    await roleService.removeRoleFromUser(userId, roleId);

    res.status(200).json({ message: 'Role deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// get department by user_id
async function getDepartmentsByUserId(req:Request, res:Response) {
  try {
    const userId = req.params.userId;
    const departments = await departmentService.getDepartmentsByUserId(userId);

    res.json({ departments });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

// READ
async function getUserById(req:Request, res:Response) {
  try {
    const userId = req.params.id;
    const user = await userService.getById(userId);
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getAllUsers(req:Request, res:Response) {
  try {
    const users = await userService.getAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// UPDATE
async function updateUser(req:Request, res:Response) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const userId = req.params.id;
    const userData = req.body;
    const user = await userService.update(userId, userData);
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// DELETE
async function deleteUser(req:Request, res:Response) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const userId = req.params.id;
    const message = await userService.delete(userId);
    res.json({ message });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export {
  createUser,
  getUserById,
  getAllUsers,
  updateUser,
  deleteUser,
  assignRoleToUser,
  removeRoleFromUser,
  getDepartmentsByUserId,
};
