const Comment = require('../models/Comment');
const User = require('../models/User');
const {
  postComment,
  getComments,
  unlikeComment,
  likeComment,
} = require('../controllers/post.controller');

jest.mock('../models/Comment');
jest.mock('../models/User');

describe('Comment Controller', () => {
  let req, res;

  beforeEach(() => {
    req = {};
    res = {
      status: jest.fn(),
      json: jest.fn(),
    };
  });

  describe('postComment', () => {
    it('should create a new comment and respond with a 201 status code and the created comment', async () => {
      req.body = {
        userId: 'mockUserId',
        text: 'This is a test comment.',
        personalitySystem: 'MBTI',
      };

      User.findById.mockResolvedValue({ _id: 'mockUserId' });
      Comment.create.mockResolvedValue({ _id: 'mockCommentId', ...req.body });

      await postComment(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ _id: 'mockCommentId', ...req.body }));
    });

    it('should handle errors during comment creation and respond with a 500 status code', async () => {
      req.body = {
        userId: 'mockUserId',
        text: 'This is a test comment.',
        personalitySystem: 'MBTI',
      };

      User.findById.mockResolvedValue({ _id: 'mockUserId' });
      Comment.create.mockRejectedValue(new Error('Fake Internal Server Error'));

      await postComment(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Internal Server Error' });
    });

    it('should respond with a 400 status code and an error message if required fields are missing', async () => {
      req.body = {};

      await postComment(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: 'UserId, Text, and Personality System are required for posting a comment.' });
    });

    it('should respond with a 404 status code if the specified user does not exist', async () => {
      req.body = {
        userId: 'nonexistentUserId',
        text: 'This is a test comment.',
        personalitySystem: 'MBTI',
      };

      User.findById.mockResolvedValue(null);

      await postComment(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'User not found.' });
    });
  });

  describe('getComments', () => {
    it('should fetch and respond with comments based on the specified sort order and filter criteria', async () => {
      req.query = {
        sort: 'best',
        personalitySystem: 'MBTI',
      };

      Comment.find.mockResolvedValue([{ _id: 'mockCommentId', text: 'Test Comment' }]);

      await getComments(req, res);

      expect(res.json).toHaveBeenCalledWith(expect.arrayContaining([{ _id: 'mockCommentId', text: 'Test Comment' }]));
    });

    it('should handle errors during comment retrieval and respond with a 500 status code', async () => {
      req.query = {
        sort: 'best',
        personalitySystem: 'MBTI',
      };

      Comment.find.mockRejectedValue(new Error('Fake Internal Server Error'));

      await getComments(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Internal Server Error' });
    });
  });

  describe('unlikeComment', () => {
    it('should decrement likes for a comment and respond with the updated comment', async () => {
      req.params = { commentId: 'mockCommentId' };

      Comment.findById.mockResolvedValue({ _id: 'mockCommentId', likes: 5 });
      Comment.prototype.save.mockResolvedValue({ _id: 'mockCommentId', likes: 4 });

      await unlikeComment(req, res);

      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ _id: 'mockCommentId', likes: 4 }));
    });

    it('should handle errors during unlike operation and respond with a 500 status code', async () => {
      req.params = { commentId: 'mockCommentId' };

      Comment.findById.mockResolvedValue({ _id: 'mockCommentId', likes: 5 });
      Comment.prototype.save.mockRejectedValue(new Error('Fake Internal Server Error'));

      await unlikeComment(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Internal Server Error' });
    });

    it('should respond with a 404 status code if the specified comment does not exist', async () => {
      req.params = { commentId: 'nonexistentCommentId' };

      Comment.findById.mockResolvedValue(null);

      await unlikeComment(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'Comment not found.' });
    });
  });

  describe('likeComment', () => {
    it('should increment likes for a comment and respond with the updated comment', async () => {
      req.params = { commentId: 'mockCommentId' };

      Comment.findById.mockResolvedValue({ _id: 'mockCommentId', likes: 5 });
      Comment.prototype.save.mockResolvedValue({ _id: 'mockCommentId', likes: 6 });

      await likeComment(req, res);

      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ _id: 'mockCommentId', likes: 6 }));
    });

    it('should handle errors during like operation and respond with a 500 status code', async () => {
      req.params = { commentId: 'mockCommentId' };

      Comment.findById.mockResolvedValue({ _id: 'mockCommentId', likes: 5 });
      Comment.prototype.save.mockRejectedValue(new Error('Fake Internal Server Error'));

      await likeComment(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Internal Server Error' });
    });

    it('should respond with a 404 status code if the specified comment does not exist', async () => {
      req.params = { commentId: 'nonexistentCommentId' };

      Comment.findById.mockResolvedValue(null);

      await likeComment(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'Comment not found.' });
    });
  });
});
