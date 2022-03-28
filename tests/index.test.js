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
  test('404 for GET /brand/:brandId', async () => {
    // Arrange + Act
    const brandDoesNotExist = `id-does-not-exist`;
    const response = await agent.get(`/brand/${brandDoesNotExist}`).set('Accept', 'application/json');
    // Assert
    expect(response.statusCode).toEqual(404);
    expect(response.body).toEqual(`Cannot find brand ${brandDoesNotExist}`);
  });
  test('200 for GET /brand/:brandId', async () => {
    // Arrange + Act
    const response = await agent.get('/brand/5a4e6d14-53d4-4583-bd6b-49f81b021d24').set('Accept', 'application/json');
    // Assert
    expect(response.statusCode).toEqual(200);

    // We could do a full equality check on an example but here we are just confirming
    // that the body contains some of the information we expect.
    expect(Object.keys(response.body)).toContain('id');
    expect(Object.keys(response.body)).toContain('products');
    expect(Object.keys(response.body)).toContain('stores');
  });
  test('200 for GET /brand/brandId/product', async () => {
    // Arrange + Act
    const response = await agent.get('/brand/5a4e6d14-53d4-4583-bd6b-49f81b021d24/product').set('Accept', 'application/json');
    // Assert
    expect(response.statusCode).toEqual(200);
  });
  test('200 for GET /brand/brandId/store', async () => {
    // Arrange + Act
    const response = await agent.get('/brand/5a4e6d14-53d4-4583-bd6b-49f81b021d24/store').set('Accept', 'application/json');
    // Assert
    expect(response.statusCode).toEqual(200);
  });
  test('404 for GET /product/productId/store', async () => {
    // Arrange + Act
    const response = await agent.get('/product/product-id-does-not-exist/store').set('Accept', 'application/json');
    // Assert
    expect(response.statusCode).toEqual(404);
  });
  test('200 for GET /product/productId/store', async () => {
    // Arrange + Act
    const response = await agent.get('/product/389327c1-8bf1-4030-a40e-0c1e4dae0b09/store').set('Accept', 'application/json');
    // Assert
    expect(response.statusCode).toEqual(200);
  });
});
