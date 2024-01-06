// models/Comment.js
const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  text: { type: String, required: true },
  likes: { type: Number, default: 0 },
  personalitySystem: { type: String, enum: ['MBTI', 'Enneagram', 'Zodiac'] },
}, { timestamps: true }); // Add timestamps for createdAt and updatedAt

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
