const nodemailer = require('nodemailer');
const sendPass = {};

// configuration of transport for to send
const transport = nodemailer.createTransport({
    service: 'gmail',
    secure: false,
    auth: {
        user: 'gabrieltorrealba.developer@gmail.com',
        pass: 'paok fzaj rlxh obje'
    }
});

// mail sending
sendPass.sendMail = async (email, password)=> {
    const info = await transport.sendMail({
        from: 'gabrieltorrealba.developer@gmail.com',
        to: email,
        subject: 'SocialSphere recuperación de constraseña',
        text: password
    });
};


module.exports = sendPass;