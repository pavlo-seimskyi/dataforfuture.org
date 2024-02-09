import emailJS from "@emailjs/browser";


emailJS.init(process.env.REACT_APP_EMAILJS_PUBLIC_KEY);

async function sendEmail(data) {
    return await emailJS.send(
        process.env.REACT_APP_EMAILJS_SERVICE_ID,
        process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
        data,
    );
}

export default sendEmail;
