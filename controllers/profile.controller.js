const mongoose = require('mongoose');

const Profile = require('../models/Profile');

exports.getProfile = async (req, res) => {
  try {
    const profiles = [
      {
        "id": 1,
        "name": "A Martinez",
        "description": "Adolph Larrue Martinez III.",
        "mbti": "ISFJ",
        "enneagram": "9w3",
        "variant": "sp/so",
        "tritype": 725,
        "socionics": "SEE",
        "sloan": "RCOEN",
        "psyche": "FEVL",
        "image": "https://soulverse.boo.world/images/1.png",
      }
    ];

    res.render('profile_template', {
      profile: profiles[0],
    });
  } catch (error) {
    console.error('Error getting profile:', error);
    res.status(500).send('Internal Server Error');
  }
};

exports.createProfile = async (req, res) => {
  try {
    const { name, age, image } = req.body;

    // Create a new profile
    const profile = new Profile({ name, age, image });
    await profile.save();

    // res.render('profile', { profile });
    res.status(200).json(profile);

  } catch (error) {
    console.error('Error creating a new profile:', error);
    res.status(500).send('Internal Server Error');
  }
};

exports.getProfileById = async (req, res) => {
  try {
    const profile = await Profile.findById(req.params.id);

    if (!profile) {
      return res.status(404).send('Profile not found');
    }

    // Render the profile using an EJS template
    // res.render('profile', { profile });
    res.status(200).json(profile);

  } catch (error) {
    console.error('Error retrieving profile by ID:', error);
    res.status(500).send('Internal Server Error');
  }
};

exports.renderCreateProfilePage = async (req, res) => {
  res.render('createProfile');
};
