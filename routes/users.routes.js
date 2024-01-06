const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');

/**
 * @swagger
 * /api/create:
 *   post:
 *     summary: Create a new profile
 *     tags:
 *       - Users
 *     parameters:
 *       - in: formData
 *         name: name
 *         type: string
 *         required: true
 *         description: Name of the name
 *     responses:
 *       '200':
 *         description: User created successfully
 *       '500':
 *         description: Internal Server Error
 */
router.post('/create', userController.createUser);

module.exports = router;
