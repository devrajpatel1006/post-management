const { getProfile, createProfile, getProfileById, renderCreateProfilePage } = require('../controllers/profile.controller');
const Profile = require('../models/Profile');

jest.mock('../models/Profile');

describe('Profile Controller', () => {
  let req, res;

  beforeEach(() => {
    req = {};
    res = {
      status: jest.fn(),
      render: jest.fn(),
      json: jest.fn(),
      send: jest.fn(),
    };
  });

  describe('getProfile', () => {
    it('should render the profile_template with the provided profile data', async () => {
      await getProfile(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.render).toHaveBeenCalledWith('profile_template', { profile: expect.objectContaining({}) });
    });

    it('should handle errors and respond with a 500 status code', async () => {
      // Mocking the render method to simulate an error
      res.render.mockImplementation(() => { throw new Error('Fake Internal Server Error'); });

      await getProfile(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalledWith('Internal Server Error');
    });
  });

  describe('createProfile', () => {
    it('should create a new profile and respond with a 200 status code and the created profile', async () => {
      req.body = {
        name: 'John Doe',
        age: '30',
        image: 'https://example.com/image.jpg',
      };

      // Mocking the save method to simulate a successful creation
      Profile.prototype.save.mockResolvedValue({ _id: 'mockProfileId', ...req.body });

      await createProfile(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ _id: 'mockProfileId', ...req.body }));
    });

    it('should handle errors during profile creation and respond with a 500 status code', async () => {
      req.body = {
        name: 'John Doe',
        age: '30',
        image: 'https://example.com/image.jpg',
      };

      // Mocking the save method to simulate an error
      Profile.prototype.save.mockRejectedValue(new Error('Fake Internal Server Error'));

      await createProfile(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalledWith('Internal Server Error');
    });
  });

  describe('getProfileById', () => {
    it('should retrieve a profile by ID and respond with a 200 status code and the profile data', async () => {
      const mockProfile = {
        _id: 'mockProfileId',
        name: 'John Doe',
        age: '30',
        image: 'https://example.com/image.jpg',
      };

      // Mocking the findById method to simulate a successful retrieval
      Profile.findById.mockResolvedValue(mockProfile);

      req.params = { id: 'mockProfileId' };

      await getProfileById(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining(mockProfile));
    });

    it('should handle errors during profile retrieval by ID and respond with a 500 status code', async () => {
      // Mocking the findById method to simulate an error
      Profile.findById.mockRejectedValue(new Error('Fake Internal Server Error'));

      req.params = { id: 'mockProfileId' };

      await getProfileById(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalledWith('Internal Server Error');
    });

    it('should respond with a 404 status code if the profile is not found by ID', async () => {
      // Mocking the findById method to simulate a non-existent profile
      Profile.findById.mockResolvedValue(null);

      req.params = { id: 'nonexistentProfileId' };

      await getProfileById(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.send).toHaveBeenCalledWith('Profile not found');
    });
  });

  describe('renderCreateProfilePage', () => {
    it('should render the createProfile page', async () => {
      await renderCreateProfilePage(req, res);

      expect(res.render).toHaveBeenCalledWith('createProfile');
    });

    it('should handle errors and respond with a 500 status code', async () => {
      // Mocking the render method to simulate an error
      res.render.mockImplementation(() => { throw new Error('Fake Internal Server Error'); });

      await renderCreateProfilePage(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalledWith('Internal Server Error');
    });
  });
});
