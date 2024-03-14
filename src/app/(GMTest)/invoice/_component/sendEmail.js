import React from 'react';
import emailjs from 'smtp.js';

const sendEmail = () => {
  const emailData = {
    to: 'recipient@example.com',
    from: 'yourhotmail@example.com',
    subject: 'Test Email',
    body: 'This is a test email sent from SMTPJS.',
  };

  emailjs
    .send('your_smtp_service_id', emailData)
    .then((response) => {
      console.log('Email sent successfully:', response);
    })
    .catch((error) => {
      console.error('Email sending failed:', error);
    });
};

const EmailSender = () => {
  return (
    <div>
      <button onClick={sendEmail}>Send Email</button>
    </div>
  );
};

export default EmailSender;
