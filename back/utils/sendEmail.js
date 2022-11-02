const { SchemaTypeOptions } = require('mongoose');
const nodemailer = require('nodemailer');

const sendEmail = async options =>{
    const transport = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "8afd7026ab61a1",
          pass: "12b3f6ed6be297"
        }
      });
    const mensaje={
        from: "VetyShop Store <noreply@vetyshop.com>",
        to: options.email,
        subject: options.subject,
        text: options.mensaje
    }

    await transport.sendMail(mensaje)
}

module.exports= sendEmail;