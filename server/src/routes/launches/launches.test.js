const request = require('supertest');
const app = require('../../app')
const { mongoConnect, mongoDisconnect } = require('../../services/mongo');

describe('Launches API', () => {
  beforeAll(async () => {
    await mongoConnect();
  });

  afterAll(async () => {
    await mongoDisconnect();
  });

  describe('Test GET /launches',() => {
    test('should respond with 200 success', async () => {
      const response = await request(app)
      .get('/launches')
      .expect('Content-Type', /json/)
      .expect(200);
    });
  });
  
  
  describe('Test POST /launches', () => {
    const FullLaunchData = {
      mission: "Brian Enter",
      rocket: "Cimpo",
      target: "Kepler-442 b",
      launchDate: "December 24, 2044"
    };
    
    const LaunchDataWOLdate = {
      mission: "Brian Enter",
      rocket: "Cimpo",
      target: "Kepler-442 b"
    };
    
    const LaunchDataInvalidDate = {
      mission: "Brian Enter",
      rocket: "Cimpo",
      target: "Kepler-442 b",
      launchDate: "kunKra"
    };
    
    
    test('should respond with 201 created', async () => {
      const response = await request(app)
      .post('/launches')
      .send(FullLaunchData)
      .expect('Content-Type', /json/)
      .expect(201);
      
      const responseDate = new Date(response.body.launchDate.valueOf());
      const requestDate = new Date(FullLaunchData.launchDate).valueOf();
      
      expect(requestDate).toBe(requestDate);
      
      expect(response.body).toMatchObject(LaunchDataWOLdate)
    });
    
    test('should catch missing required property', async () => {
      const response = await request(app)
      .post('/launches')
      .send(LaunchDataWOLdate)
      .expect('Content-Type', /json/)
      .expect(400);
      
      expect(response.body).toStrictEqual({
        error: "Missing required launch property"
      })
    });
    
    test('should catch invalid dates', async () => {
      const response = await request(app)
      .post('/launches')
      .send(LaunchDataInvalidDate)
      .expect('Content-Type', /json/)
      .expect(400);
      
      expect(response.body).toStrictEqual({
        error: "Invalid launch date"
      });
    });
  });
  
});