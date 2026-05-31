// ==========================================
// RESEND EMAIL CONFIGURATION
//
// Creates a Resend client using
// the API key stored in environment
// variables.
// ==========================================

const { Resend } = require("resend");

//  Put your API key here
const resend = new Resend(process.env.RESEND_API_KEY);


// ==========================================
// SEND WELCOME EMAIL
//
// Sends a welcome email when a user
// successfully creates an account.
// ==========================================

const sendWelcomeEmail = async (email, firstName) => {
  try {

    // Send email to the newly registered user
    const data =  await resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject: "Welcome to DevTinder 🎉",
      html: `
        <h2>Hello ${firstName}</h2>
        <p>Your DevTinder account has been successfully created.</p>
        <p>You can now login and start connecting with developers.</p>
      `,
    });

    // Log email response
    console.log("Email Sent",data);

  } catch (err) {

    // Log email errors
    console.log(err);

  }
};

module.exports = sendWelcomeEmail;


/*
==========================================
EMAIL FLOW

1. User signs up

2. Account is created

3. sendWelcomeEmail() is called

4. Resend sends email

5. Success or error is logged

==========================================
*/