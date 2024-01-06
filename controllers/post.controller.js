const Comment = require('../models/Comment');
const User = require('../models/User');

exports.postComment = async (req, res) => {
  try {
    const { userId, text, personalitySystem } = req.body;

    // Validation: Check if 'userId', 'text', and 'personalitySystem' are provided
    if (!userId || !text || !personalitySystem) {
      return res.status(400).json({ error: 'UserId, Text, and Personality System are required for posting a comment.' });
    }

    // Check if the user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    // Create comment and store in the database
    const comment = await Comment.create({ userId, text, personalitySystem });

    res.status(201).json(comment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// exports.getComments = async (req, res) => {
//   try {
//     const { sort, userId, minLikes, personalitySystem } = req.query;

//     // Your existing logic for getting/sorting/filtering comments goes here

//     res.json(filteredComments);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// };

exports.getComments = async (req, res) => {
  try {
    const { sort, personalitySystem } = req.query;

    // Define the default sort order (most recent)
    let sortOrder = { createdAt: -1 };

    // Change the sort order based on the 'sort' query parameter
    if (sort === 'best') {
      sortOrder = { likes: -1, createdAt: -1 };
    }

    // Define the default filter criteria
    let filterCriteria = {};

    // Add filter criteria based on query parameters
    
    if (personalitySystem) {
      filterCriteria.personalitySystem = personalitySystem;
    }

    // Fetch and sort comments based on the specified order and filter criteria
    const filteredComments = await Comment.find(filterCriteria).sort(sortOrder);

    res.json(filteredComments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.unlikeComment = async (req, res) => {
  try {
    const { commentId } = req.params;

    // Check if the comment exists
    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({ error: 'Comment not found.' });
    }

    // Decrement likes for the comment (prevent negative likes)
    comment.likes = Math.max(comment.likes - 1, 0);
    await comment.save();

    res.json(comment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};



exports.likeComment = async (req, res) => {
  try {
    const { commentId } = req.params;

    // Check if the comment exists
    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({ error: 'Comment not found.' });
    }

    // Increase likes for the comment (prevent negative likes)
    comment.likes = Math.max(comment.likes + 1, 0);
    await comment.save();

    res.json(comment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
