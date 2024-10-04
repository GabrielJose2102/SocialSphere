/* const express = require('express');
const config = require('../src/server/config.js');
const app = config(express());
const router = require('../src/routes/index.js');
const request = require('supertest');

const mongoose = require('mongoose');
require('../src/server/database.js');
const { Users } = require('../src/models');

app.use('/', router);

beforeAll(async ()=> {
    const deleteObjects = await Users.deleteMany({});
});

describe("GET '/signup' render register", ()=> {
    test('Should render the register page', async ()=> {
        const response = await request(app)
        .get('/signup');
        expect(response.statusCode).toBe(200);
        expect(response.headers['content-type']).toMatch(/html/);
    });
});

describe("POST '/signup' request users register", ()=> {
    test('Should to show a error for password no equal', async ()=> {
        const response = await request(app)
        .post('/signup')
        .send({
            name: 'Test',
            last_name: 'Describe',
            user: 'User_test',
            password: '1234567891011',
            password2: '12345678',
            email: 'test@gmail.com',
            phone: '+5804246658877',
            country: 'Venezuela',
        });
        expect(response.statusCode).toBe(302);
        expect(response.headers['location']).toBe('/signup');
    });

    test('Should to show a error for password < 8', async ()=> {
        const response = await request(app)
        .post('/signup')
        .send({
            name: 'Test',
            last_name: 'Describe',
            user: 'User_test',
            password: '1234',
            password2: '1234',
            email: 'test@gmail.com',
            phone: '+5804246658877',
            country: 'Venezuela',
        });
        expect(response.statusCode).toBe(302);
        expect(response.headers['location']).toBe('/signup');
    });

    test('Should register a user and redirect to login', async ()=> {
        const response = await request(app)
        .post('/signup')
        .send({
            name: 'Gabriel Jose',
            last_name: 'Torrealba Luque',
            user: 'Gabo2102',
            password: '27479490',
            password2: '27479490',
            email: 'gabrieltorrealba.developer@gmail.com',
            phone: '+5804245785608',
            country: 'Venezuela',
        });
        expect(response.statusCode).toBe(302);
        expect(response.headers['location']).toBe('/');
    });
});

describe("GET '/recover' password recover", ()=> {
    test('Should render the recover password page for send email', async ()=> {
        const response = await request(app)
        .get('/recover');
        expect(response.statusCode).toBe(200);
        expect(response.headers['content-type']).toMatch(/html/);
    });
});

describe("POST '/recoverPass' request possword recover", ()=> {
    test('Should to send email with code for to reset password', async ()=> {
        const response = await request(app)
        .post('/recoverPass')
        .send({email: 'gabrieltorrealba.developer@gmail.com'});
        expect(response.statusCode).toBe(302);
        expect(response.headers['location']).toBe('/');
    });

    test('Should to show a message warnning that email not register', async ()=> {
        const response = await request(app)
        .post('/recoverPass')
        .send({email: 'gabrieltorrealba@gmail.com'});
        expect(response.headers['location']).toBe('/recover');
    });
});

describe("GET '/reset/:email/:token' reset password", ()=> {
    test('Should render the reset password page', async ()=> {
        const response = await request(app)
        //When the expire access code already don't can open the reset passwrod page, until generate a new
        .get('/reset/gabrieltorrealba.developer@gmail.com/c257648487a58e7b7927b0c833a3771d');
        expect(response.statusCode).toBe(200);
        expect(response.headers['content-type']).toMatch(/html/);
    });
});

describe("POST '/resetPassword' request reset password", ()=> {
    //Se necesita cambiar el correo en el codigo para que funciones correctamente esta funcion en el test solo
    test('Should to take data of fields to compare if are equals and at 8 chart', async ()=> {
        const response = await request(app)
        .post('/resetPassword')
        .send({password: '21022000', password2: '21022000'});
        expect(response.headers['location']).toBe('/reset/gabrieltorrealba.developer@gmail.com/c257648487a58e7b7927b0c833a3771d');
    });

    test('Should to change password of the user', async ()=> {
        const response = await request(app)
        .post('/resetPassword')
        .send({password: '21022000', password2: '21022000'});
        expect(response.statusCode).toBe(302);
        expect(response.headers['location']).toBe('/');
    });
});

describe("GET '/' render login", ()=> {
    test('Should render the login page', async ()=> {
        const response = await request(app)
        .get('/')
        .send();
        expect(response.statusCode).toBe(200);
        expect(response.headers['content-type']).toMatch(/html/);
    });
});

describe("POST '/signin' Login", ()=> {
    test('Should login successfully with valid credentials', async ()=> {
        const response = await request(app)
        .post('/signin')
        .send({user: 'Gabo2102', password: '1234'});
         expect(response.statusCode).toBe(302);
         expect(response.headers['location']).toBe('/main');
    });

    test('Should login fail with invalid credentials', async ()=> {
        const response = await request(app)
        .post('/signin')
        .send({user: 'pedro', password: '5555'});
        expect(response.headers['location']).toBe('/');
    });

    test('Should redirect to dashboard main if already logged in', async ()=> {
        const response = await request(app)
        .post('/signin')
        .send({user: 'Gabo2102', password: '1234'});
        expect(response.headers['location']).toBe('/main');
    });
});

describe("GET '/main dashboard", ()=> {
    test('Should render dashboard main if is Logged in', ()=> {

    });
});

//describer POST

afterAll(async () => {
    await mongoose.connection.close(true);
}); */