import { saveMessage } from './contact.mock.service.js';

document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const fullName = document.getElementById('fullName').value.trim();
        const contactNumber = document.getElementById('contactNumber').value.trim();
        const emailAddress = document.getElementById('emailAddress').value.trim();
        const messageText = document.getElementById('message').value.trim();


        // Log the form values to the console and Print in the console 
        console.log('Full Name:', fullName);
        console.log('Contact Number:', contactNumber);
        console.log('Email Address:', emailAddress);
        console.log('Message:', messageText);

        // Construct message object
        const message = {
            fullName,
            contactNumber,
            emailAddress,
            message: messageText,

        };

        // Confirmation the message has been sent to the local storage 
        if (saveMessage(message)) {
            alert('Your message has been sent successfully!');
            contactForm.reset();
        } else {
            alert('This message has already been sent.');
        }
    });
});
