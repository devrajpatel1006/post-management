const { createUser } = require('../controllers/user.controller');
const User = require('../models/User');

jest.mock('../models/User');

describe('createUser', () => {
  let req, res;

  beforeEach(() => {
    req = {
      body: {
        name: 'John Doe',
      },
    };

    res = {
      status: jest.fn(),
      json: jest.fn(),
    };
  });

  it('should create a user and return it with status 201', async () => {
    const mockUser = {
      _id: 'mockUserId',
      name: 'John Doe',
    };

    // Mock the User.create method to simulate creating a user
    User.create.mockResolvedValue(mockUser);

    await createUser(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(mockUser);

    // Reset the mock to ensure a clean slate for the next test
    jest.clearAllMocks();
  });

  it('should return an error with status 400 if name is not provided', async () => {
    req.body.name = undefined;

    await createUser(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'Name is required for creating a user account.' });

    jest.clearAllMocks();
  });

  it('should return an error with status 500 if an internal server error occurs', async () => {
    // Mock the User.create method to simulate an internal server error
    User.create.mockRejectedValue(new Error('Fake Internal Server Error'));

    await createUser(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Internal Server Error' });

    jest.clearAllMocks();
  });
});
