
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service:'gmail',
    secure:false,
    auth:{
        user:'josuetest98@gmail.com',
        pass:'354918276'
    },
    tls: {
        rejectUnauthorized: false
    }
});
module.exports = transporter;
