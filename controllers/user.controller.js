const User = require('../models/User');

exports.createUser = async (req, res) => {
  try {
    const { name } = req.body;

    // Validation: Check if 'name' is provided
    if (!name) {
      return res.status(400).json({ error: 'Name is required for creating a user account.' });
    }

    // Create user and store in the database
    const user = await User.create({ name });

    res.status(201).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
