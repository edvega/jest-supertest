import app from '../src/app';
import request from 'supertest';

describe('GET /tasks', () => {
    test('Should response with 200 status code', async () => {
        const response = await request(app).get('/tasks').send();
        expect(response.statusCode).toBe(200);
    });

    test('Should response with an array', async () => {
        const response = await request(app).get('/tasks').send();
        expect(response.body).toBeInstanceOf(Array);
    });
});

describe('POST /tasks', () => {

    describe('Given a title and description', () => {
        const newTask = {
            title: "Test task",
            description: "Test description"
        };

        test('Should response with 200 status code', async () => {
            const response = await request(app).post('/tasks').send(newTask);
            expect(response.statusCode).toBe(200);
        });

        test('Should have header content-type: application/json', async () => {
            const response = await request(app).post('/tasks').send(newTask);
            expect(response.headers['content-type']).toEqual(expect.stringContaining('json'));
        });

        test('Should return a task ID', async () => {
            const response = await request(app).post('/tasks').send(newTask);
            expect(response.body.id).toBeDefined();
        });
    });

    describe('When title and description are missing', () => {
        test('Should return 400 status code', async () => {
            const fields = [
                {},
                {title: "Test task"},
                {description: "Test description"}
            ];
            for (const body of fields) {
                const response = await request(app).post('/tasks').send(body);
                expect(response.statusCode).toBe(400);
            }
        });
    });
});