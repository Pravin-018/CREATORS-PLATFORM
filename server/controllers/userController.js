import bcrypt from 'bcrypt'
import User from '../models/User.js'

function isValidObjectId(id) {
  return /^[0-9a-fA-F]{24}$/.test(id)
}

export async function registerUser(req, res) {
  const { name, email, password } = req.body

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Name, email, and password are required' })
  }

  const existingUser = await User.findOne({ email })
  if (existingUser) {
    return res.status(400).json({ message: 'Email already registered' })
  }

  const hashedPassword = await bcrypt.hash(password, 10)
  const user = await User.create({ name, email, password: hashedPassword })
  user.password = undefined

  return res.status(201).json({
    success: true,
    message: 'User registered successfully',
    data: user,
  })
}

export async function getAllUsers(req, res) {
  const users = await User.find().select('-password')
  res.json(users)
}

export async function getUserById(req, res) {
  const { id } = req.params
  if (!isValidObjectId(id)) {
    return res.status(400).json({ message: 'Invalid user id' })
  }

  const user = await User.findById(id).select('-password')
  if (!user) {
    return res.status(404).json({ message: 'User not found' })
  }

  res.json(user)
}

export async function updateUser(req, res) {
  const { id } = req.params
  if (!isValidObjectId(id)) {
    return res.status(400).json({ message: 'Invalid user id' })
  }

  const { name, email, password } = req.body
  const updateData = {}

  if (name) updateData.name = name
  if (email) updateData.email = email
  if (password) updateData.password = await bcrypt.hash(password, 10)

  const user = await User.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
    context: 'query',
  }).select('-password')

  if (!user) {
    return res.status(404).json({ message: 'User not found' })
  }

  res.json(user)
}

export async function deleteUser(req, res) {
  const { id } = req.params
  if (!isValidObjectId(id)) {
    return res.status(400).json({ message: 'Invalid user id' })
  }

  const user = await User.findByIdAndDelete(id)
  if (!user) {
    return res.status(404).json({ message: 'User not found' })
  }

  res.json({ message: 'User deleted successfully' })
}
