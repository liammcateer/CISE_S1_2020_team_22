"use strict";
const nodemailer = require("nodemailer");

const statuses = {
    ACCEPTED: 'Accepted',
    REJECTED: 'Rejected'
}

const sendEmail = async function (recipientEmailAddress, name, status, reason = "") {
    var transport = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD
        }
    });

    textContent = `
        Hello ${name},\n\n

        The status of your article submission has been updated.\n\n

        Your submission was: ${status}.\n\n

        ${status != statuses.ACCEPTED ? "Reason: " + reason: ""}\n\n

        Regards
        SEER Moderation team
    `;

    htmlContent = textContent.replace(/\n/g, "<br />");

    // send mail with defined transport object
    let info = await transport.sendMail({
        from: '"SEER moderation team" <moderation@seer.com>', // sender address
        to: recipientEmailAddress, // list of receivers
        subject: "Article submission Status", // Subject line
        text: textContent,
        html: htmlContent
    });
}

exports.statuses;
exports.sendEmail;