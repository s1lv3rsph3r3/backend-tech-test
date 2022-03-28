// A mock implementation of this module is in __mocks__
// Mocks are always hoisted by Jest
jest.mock('../utility/os-bind');

const request = require('supertest');
const app = require('../index');

describe('index.test.js', () => {
  /* Setup the supertest agent for the application */
  let agent;
  beforeEach(() => {
    agent = request(app);
  });
  test('200 for GET /', async () => {
    // Arrange + Act
    const response = await agent.get('/').set('Accept', 'application/json');
    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual('Welcome to the backend-tech-test API');
  });
  test('404 for GET /non-existent-endpoint', async () => {
    // Arrange + Act
    const response = await agent
      .get('/non-existent-endpoint')
      .set('Accept', 'application/json');
    // Assert
    expect(response.statusCode).toEqual(404);
    expect(response.body).toEqual('Unhappy Face :(');
  });
});
