import React, { useState, useRef } from 'react';
import sendEmail from "../email/email";
import ReCAPTCHA from 'react-google-recaptcha';


const Contact = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [formSubmittedMessage, setFormSubmittedMessage] = useState("");
    const captchaRef = useRef(null);

    const handleFormInput = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = captchaRef.current.getValue();
        captchaRef.current.reset();
        setFormSubmitted(true);
        setFormSubmittedMessage("Loading...");
        try {
            const response = await sendEmail({
                ...formData,
                "g-recaptcha-response": token,
            });
            if (response.status === 200) {
                setFormSubmittedMessage("Your email was successfully sent!");
            } else {
                throw new Error();
            }
        } catch (error) {
            setFormSubmittedMessage("There was an error... Please contact me by phone or email directly.")
            console.error(error);
        }
    };

    return (
        <main className="bg-light">
            <div className="contact">
                <h1>Get in touch</h1>
                <p>Looking for collabs or having any questions?<br/>We would love to hear from you!</p>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Your Name"
                        value={formData.name}
                        onChange={handleFormInput}
                        required
                    />
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Your Email"
                        value={formData.email}
                        onChange={handleFormInput}
                        required
                    />
                    <input
                        type="text"
                        id="message"
                        name="message"
                        placeholder="Your Message"
                        value={formData.message}
                        onChange={handleFormInput}
                        required
                    />
                    <ReCAPTCHA
                        sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY}
                        ref={captchaRef}
                    />
                    {formSubmitted ? (
                        <p>{formSubmittedMessage}</p>
                    ) : (
                        <button type="submit" className="button-link" disabled={formSubmitted}>Send</button>
                    )}
                    </form>
            </div>
        </main>
    );
};

export default Contact;
