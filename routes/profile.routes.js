const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profile.controller');


router.get('/', profileController.getProfile);

/**
 * @swagger
 * /api/profiles:
 *   post:
 *     summary: Create a new profile
 *     tags:
 *       - Profiles
 *     parameters:
 *       - in: formData
 *         name: name
 *         type: string
 *         required: true
 *         description: Name of the profile
 *       - in: formData
 *         name: age
 *         type: string
 *         required: true
 *         description: Age of the profile
 *       - in: formData
 *         name: image
 *         type: string
 *         required: true
 *         description: Image URL of the profile
 *     responses:
 *       '200':
 *         description: Profile created successfully
 *       '500':
 *         description: Internal Server Error
 */
router.post('/profiles', profileController.createProfile);

/**
 * @swagger
 * /api/profiles/{id}:
 *   get:
 *     summary: Get profile by ID
 *     tags:
 *       - Profiles
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the profile
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Profile retrieved successfully
 *       '404':
 *         description: Profile not found
 *       '500':
 *         description: Internal Server Error
 */
router.get('/profiles/:id', profileController.getProfileById);

// Route to render the create profile page
router.get('/create-profile', profileController.renderCreateProfilePage);

module.exports = router;
