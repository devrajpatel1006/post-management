const express = require('express');
const router = express.Router();
const commentController = require('../controllers/post.controller');

/**
 * @swagger
 * /api/comments:
 *   post:
 *     summary: Post a comment.
 *     tags:
 *       - Comments
 *     parameters:
 *       - in: formData
 *         name: userId
 *         type: string
 *         required: true
 *         description: The ID of the user posting the comment.
 *       - in: formData
 *         name: text
 *         type: string
 *         required: true
 *         description: The text of the comment.
 *       - in: formData
 *         name: personalitySystem
 *         type: string
 *         required: true
 *         enum: [MBTI, Enneagram, Zodiac]
 *         description: The personality system associated with the comment.
 *     responses:
 *       '201':
 *         description: Comment successfully posted.
 *         content:
 *           application/json:
 *             example:
 *               _id: 123
 *               userId: 'user123'
 *               text: 'This is a comment.'
 *               personalitySystem: 'MBTI'
 *               createdAt: '2022-01-01T12:00:00.000Z'
 *               updatedAt: '2022-01-01T12:00:00.000Z'
 *               likes: 0
 *       '400':
 *         description: Bad request. Check the request body.
 *       '404':
 *         description: User not found.
 *       '500':
 *         description: Internal Server Error.
 */
router.post('/comments', commentController.postComment);

/**
 * @swagger
 * /api/comments:
 *   get:
 *     summary: Get/sort/filter comments.
 *     tags:
 *       - Comments
 *     parameters:
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *           enum: [best]
 *         description: Sort order for comments. Use 'recent' for most recent and 'best' for most likes.
 *       - in: query
 *         name: personalitySystem
 *         schema:
 *           type: string
 *           enum: [MBTI, Enneagram, Zodiac]
 *         description: Filter comments by personality system [MBTI, Enneagram, Zodiac].
 *     responses:
 *       '200':
 *         description: List of comments.
 *         content:
 *           application/json:
 *             example:
 *               - _id: 123
 *                 userId: 'user123'
 *                 text: 'This is a comment.'
 *                 personalitySystem: 'MBTI'
 *                 createdAt: '2022-01-01T12:00:00.000Z'
 *                 updatedAt: '2022-01-01T12:00:00.000Z'
 *                 likes: 0
 *       '500':
 *         description: Internal Server Error.
 */
router.get('/comments', commentController.getComments);

/**
 * @swagger
 * /api/comments/{commentId}/unlike:
 *   post:
 *     summary: Unlike a comment.
 *     tags:
 *       - Comments
 *     parameters:
 *       - in: path
 *         name: commentId
 *         schema:
 *           type: string
 *         description: ID of the comment to unlike.
 *     responses:
 *       '200':
 *         description: Comment successfully unliked.
 *         content:
 *           application/json:
 *             example:
 *               _id: 123
 *               userId: 'user123'
 *               text: 'This is a comment.'
 *               personalitySystem: 'MBTI'
 *               createdAt: '2022-01-01T12:00:00.000Z'
 *               updatedAt: '2022-01-01T12:00:00.000Z'
 *               likes: 0
 *       '404':
 *         description: Comment not found.
 *       '500':
 *         description: Internal Server Error.
 */
router.post('/comments/:commentId/unlike', commentController.unlikeComment);

/**
 * @swagger
 * /api/comments/{commentId}/like:
 *   post:
 *     summary: Like a comment.
 *     tags:
 *       - Comments
 *     parameters:
 *       - in: path
 *         name: commentId
 *         schema:
 *           type: string
 *         description: ID of the comment to like.
 *     responses:
 *       '200':
 *         description: Comment successfully liked.
 *         content:
 *           application/json:
 *             example:
 *               _id: 123
 *               userId: 'user123'
 *               text: 'This is a comment.'
 *               personalitySystem: 'MBTI'
 *               createdAt: '2022-01-01T12:00:00.000Z'
 *               updatedAt: '2022-01-01T12:00:00.000Z'
 *               likes: 0
 *       '404':
 *         description: Comment not found.
 *       '500':
 *         description: Internal Server Error.
 */
router.post('/comments/:commentId/like', commentController.likeComment);

module.exports = router;
