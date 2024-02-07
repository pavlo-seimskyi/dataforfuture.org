import React, { useState } from 'react';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: ""
    });
    const [isSent, setIsSent] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        // Add your logic for handling the form submission here
        setIsSent(true);
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
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Your Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="text"
                        id="message"
                        name="message"
                        placeholder="Your Message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                    />
                    <button type="submit" className="button-link" disabled={isSent}>Send</button>
                    </form>
                {isSent && <p>Your email was sent! We'll be right on it!</p>}
            </div>
        </main>
    );
};

export default Contact;
