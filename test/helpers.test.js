const express = require('express');
const config = require('../src/server/config.js');
const app = config(express());
const {bcrypt, nodemailer} = require('../src/helpers');

    test('Error of the encrypt password', async ()=> {
        const encrypt = await bcrypt.encryptPassword('27479490');
        const result = typeof encrypt === String
        expect(result).toBe(false);
    });

    test('Error of the encrypt password', async ()=> {
        const encrypt = await bcrypt.encryptPassword('27479490');
        const result = typeof encrypt === '27479490'
        expect(result).toBe(false);
    });

    test('Error of the encrypt password', async ()=> {
        const text = "";
        const encrypt = await bcrypt.encryptPassword('27479490');
        const result = typeof encrypt == typeof text;
        expect(result).toBe(true);
    });

    test('encrypt and compare password with hash encrypt', async ()=> {
        const encrypt = await bcrypt.encryptPassword('27479490');
        const result = await bcrypt.matchPassword('27479490', encrypt);
        expect(result).toBe(true);
    });
