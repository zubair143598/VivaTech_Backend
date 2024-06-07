const express = require('express');
const { check, validationResult } = require('express-validator');
const User = require('../models/User');

const router = express.Router();

const validateUser = [
    check('name').not().isEmpty().withMessage('Name is required'),
    check('email').isEmail().withMessage('Enter a valid email address'),
    check('message').not().isEmpty().withMessage('Message is required'),
  ];

  router.post('/', validateUser, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  
    const { name, email, phone, message } = req.body;
  
    try {
      const newUser = new User({ name, email, phone, message });
      await newUser.save();
      res.status(201).json({ message: 'User saved successfully' });
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
    }
  });
  
  module.exports = router;
  