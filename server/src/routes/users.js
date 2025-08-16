import express from 'express';
import { body, validationResult, param } from 'express-validator';
import { User } from '../models/index.js';
import { authMiddleware } from './auth.js';

const router = express.Router();

// List users with basic pagination & filtering
router.get('/', authMiddleware, async (req, res) => {
  try {
    const { page = 1, pageSize = 25, search = '', role, status } = req.query;
    const limit = Math.min(Number(pageSize) || 25, 100);
    const offset = (Number(page) - 1) * limit;

    const where = {};
    if (role) where.role = role;
    if (status) where.status = status;
    if (search) {
      where.$or = [
        { name: { $iLike: `%${search}%` } },
        { email: { $iLike: `%${search}%` } }
      ];
    }

    // Sequelize v6 doesn't support $iLike in plain object; use where + Op
    const { Op } = await import('sequelize');
    const dynamicWhere = { ...where };
    if (search) {
      dynamicWhere[Op.or] = [
        { name: { [Op.iLike]: `%${search}%` } },
        { email: { [Op.iLike]: `%${search}%` } }
      ];
    }

    const { rows, count } = await User.findAndCountAll({
      where: dynamicWhere,
      attributes: ['id','name','email','phone','role','status','createdAt','lastLoginAt','avatar','adminNotes','blockedAt'],
      order: [['createdAt','DESC']],
      limit,
      offset
    });

    const results = rows.map(u => ({
      id: u.id,
      name: u.name,
      email: u.email,
      phone: u.phone,
      role: u.role,
      status: u.status,
      createdAt: u.createdAt,
      lastLogin: u.lastLoginAt,
  avatar: u.avatar ? `/uploads/avatars/${u.avatar}` : null,
  adminNotes: u.adminNotes,
  blockedAt: u.blockedAt
    }));

    res.json({
      data: results,
      pagination: { page: Number(page), pageSize: limit, total: count, pages: Math.ceil(count / limit) }
    });
  } catch (err) {
    console.error('List users error', err);
    res.status(500).json({ message: 'Failed to list users' });
  }
});

// Create user
router.post('/', [
  authMiddleware,
  body('name').isString().isLength({ min: 2 }),
  body('email').isEmail(),
  body('password').isString().isLength({ min: 6 }),
  body('role').optional().isIn(['admin','user','moderator']),
  body('status').optional().isIn(['active','inactive','pending','blocked']),
  body('adminNotes').optional().isString().isLength({ max: 5000 })
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  try {
  let { name, email, password, role = 'user', status = 'active', adminNotes } = req.body;
  if (role === 'moderator') role = 'user'; // fallback until moderator role supported in model
    const existing = await User.findOne({ where: { email } });
    if (existing) return res.status(409).json({ message: 'Email already in use' });
    const bcrypt = (await import('bcrypt')).default;
    const config = (await import('../config.js')).default;
    const passwordHash = await bcrypt.hash(password, config.security.saltRounds);
    const blockFields = status === 'blocked' ? { blockedAt: new Date() } : {};
    const user = await User.create({ name, email, passwordHash, role, status, adminNotes, ...blockFields });
    res.status(201).json({ id: user.id });
  } catch (err) {
    console.error('Create user error', err);
    res.status(500).json({ message: 'Failed to create user' });
  }
});

// Update status / role
router.patch('/:id', [
  authMiddleware,
  param('id').isUUID(),
  body('role').optional().isIn(['admin','user','moderator']),
  body('status').optional().isIn(['active','inactive','pending','blocked']),
  body('adminNotes').optional().isString().isLength({ max: 5000 })
], async (req,res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    const newRole = req.body.role === 'moderator' ? 'user' : req.body.role;
    const updates = { };
    if (newRole) updates.role = newRole;
    if (req.body.status) {
      updates.status = req.body.status;
      if (req.body.status === 'blocked') {
        updates.blockedAt = user.blockedAt || new Date();
      } else if (user.blockedAt && user.status === 'blocked') {
        updates.blockedAt = null; // unblocking
      }
    }
    if (req.body.adminNotes !== undefined) updates.adminNotes = req.body.adminNotes;
    await user.update(updates);
    res.json({ message: 'Updated', id: user.id });
  } catch (err) {
    console.error('Update user error', err);
    res.status(500).json({ message: 'Failed to update user' });
  }
});

// Get single user detail
router.get('/:id', [authMiddleware, param('id').isUUID()], async (req,res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  try {
    const user = await User.findByPk(req.params.id, { attributes: { exclude: ['passwordHash'] } });
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        status: user.status,
        createdAt: user.createdAt,
        lastLoginAt: user.lastLoginAt,
        avatar: user.avatar ? `/uploads/avatars/${user.avatar}` : null,
        adminNotes: user.adminNotes,
        blockedAt: user.blockedAt
      }
    });
  } catch (err) {
    console.error('Get user detail error', err);
    res.status(500).json({ message: 'Failed to fetch user detail' });
  }
});

// Delete user
router.delete('/:id', [authMiddleware, param('id').isUUID()], async (req,res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    await user.destroy();
    res.json({ message: 'Deleted', id: user.id });
  } catch (err) {
    console.error('Delete user error', err);
    res.status(500).json({ message: 'Failed to delete user' });
  }
});

export default router;
