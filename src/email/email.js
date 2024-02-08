import emailJS from "@emailjs/browser";


emailJS.init(process.env.REACT_APP_EMAILJS_PUBLIC_KEY);

async function sendEmail(data) {
    try {
        const response = await emailJS.send(
            process.env.REACT_APP_EMAILJS_SERVICE_ID,
            process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
            data,
        );
        console.log("Sucess! Email sent.", response.status, response.text);
    } catch (error) {
        console.error("Email sending failed...", error);
    }
}

export default sendEmail;
