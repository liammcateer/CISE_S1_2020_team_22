"use strict";
const nodemailer = require("nodemailer");
const dotenv = require('dotenv');
dotenv.config({ path: 'config.env' });

const statuses = {
    RECIEVED: "Recieved",
    ACCEPTED: 'Accepted',
    REJECTED: 'Rejected'
}

const sendEmail = async function (article, status) {
    var transport = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD
        }
    });

    let textContent = `
        Hello ${article.name},

        The status of your article '${article.title}' submission has been updated.

        Your submission was ${status}.

        ${article.rejected ? "Reason: " + article.rejectMessage: ""}

        Regards
        SEER Moderation team
    `;

    let htmlContent = textContent.replace(/\n/g, "<br />");

    // send mail with defined transport object
    let info = await transport.sendMail({
        from: '"SEER moderation team" <moderation@seer.com>', // sender address
        to: article.email, // list of receivers
        subject: "Article submission Status", // Subject line
        text: textContent,
        html: htmlContent
    });

    console.log(info);
}

module.exports.sendEmail = sendEmail;
module.exports.statuses = statuses;