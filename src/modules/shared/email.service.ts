import nodemailer from 'nodemailer';
import { IUser } from "../user/user.interface";




// const client = new MailtrapClient({ token: envConfig.EMAIL_TOKEN, testInboxId: 3426625, accountId: 2195013 });



const userInformationEmail = async (user: Partial<IUser>) => {

  // console.log(user)

  const transporter = nodemailer.createTransport({
    service: 'gmail', // Use Gmail as the email service
    auth: {
      user: 'bookletsenior@gmail.com', // Your Gmail address
      pass: 'waly zjom hanf ulpo', // Your Gmail password or app-specific password
    },
  });

  const mailOptions = {
    from: 'your-email@gmail.com', // Sender address
    to: user.email, // Recipient address
    subject: "Museo Rizal credentials!", // Email subject
    html: `
      <p>Hello ${user.firstName} ${user.lastName},</p>
      <p>Your temporary password is: <strong>${user.password}</strong></p>
      <p>Please log in using this password and change it immediately.</p>
      <p>If you did not request this, please contact support.</p>
  `,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Error sending email:', error);
  }



  // const info = await client.send({
  //   from: { name: "Museo Rizal", email: "hello@mailtrap.com" },
  //   to: [{ email: user.email as string }],
  //   template_uuid: "56768d8f-7f8c-4aca-a987-9296730a0e23",
  //   template_variables: {
  //     firstName: user.firstName as string,
  //     lastName: user.lastName as string,
  //     password: user.password as string,

  //   }
  // })


  // if (!info.success) {
  //   throw Error(info.message_ids[0])
  // }

  // console.log(info)
  
}

// const userInformationEmail(user: IVisitor): Promise<void> {
 

//   try {
//     await transporter.sendMail(messageOptions);
//     console.log(`Registration confirmation email sent to ${user.email}`);
//   } catch (error) {
//     console.error('Failed to send registration email:', error);
//     // Don't throw the error to prevent breaking the registration process
//   }
// }


const accountRegisterInformation = async (user: Partial<IUser>) => {

  // console.log(user)

  const transporter = nodemailer.createTransport({
    service: 'gmail', // Use Gmail as the email service
    auth: {
      user: 'bookletsenior@gmail.com', // Your Gmail address
      pass: 'waly zjom hanf ulpo', // Your Gmail password or app-specific password
    },
  });

  const messageOptions = {
    from: process.env.EMAIL_FROM || 'museo@example.com',
    to: user.email,
    subject: 'Welcome to Museo - Registration Received',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>Welcome to Museo, ${user.firstName}!</h2>
        <p>Thank you for registering with us. Your account is currently pending approval by our administrators.</p>
        <p>Once your account is approved, you will receive another email with instructions on how to login and start using our services.</p>
        <p>Here's a summary of your registration information:</p>
        <ul>
          <li><strong>Name:</strong> ${user.firstName} ${user.lastName}</li>
          <li><strong>Email:</strong> ${user.email}</li>
        </ul>
        <p>If you have any questions, please reply to this email or contact our support team.</p>
        <p>Best regards,<br>The Museo Team</p>
      </div>
    `
  };
  try {
    await transporter.sendMail(messageOptions);
  } catch (error) {
    console.error('Error sending email:', error);
  }
}

  
const accountApprovedEmail = async (user: Partial<IUser>) => {

  // console.log(user)

  const transporter = nodemailer.createTransport({
    service: 'gmail', // Use Gmail as the email service
    auth: {
      user: 'bookletsenior@gmail.com', // Your Gmail address
      pass: 'waly zjom hanf ulpo', // Your Gmail password or app-specific password
    },
  });

  const messageOptions = {
    from: process.env.EMAIL_FROM || 'museo@example.com',
    to: user.email,
    subject: 'Museo - Your Account is Approved!',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>Good news, ${user.firstName}!</h2>
        <p>Your Museo account has been approved.</p>
        <p>You can now login to our platform using your registered email and password.</p>
        <div style="margin: 20px 0; text-align: center;">
          <a href="${process.env.WEBSITE_URL || 'https://museorizal.vercel.app'}/login" 
             style="background-color: #0B0400; color: white; padding: 10px 20px; text-decoration: none; border-radius: 4px;">
            Login to Museo
          </a>
        </div>
        <p>If you have any questions or need assistance, please don't hesitate to contact our support team.</p>
        <p>Best regards,<br>The Museo Team</p>
      </div>
    `
  };

  try {
    await transporter.sendMail(messageOptions);
  } catch (error) {
    console.error('Error sending email:', error);
  }

  


  // const info = await client.send({
  //   from: { name: "Museo Rizal", email: "hello@mailtrap.com" },
  //   to: [{ email: user.email as string }],
  //   template_uuid: "56768d8f-7f8c-4aca-a987-9296730a0e23",
  //   template_variables: {
  //     firstName: user.firstName as string,
  //     lastName: user.lastName as string,
  //     password: user.password as string,

  //   }
  // })


  // if (!info.success) {
  //   throw Error(info.message_ids[0])
  // }

  // console.log(info)
  
} 

const userModifyProfile = async (user: Partial<IUser>) => {

  // console.log(user)

  const transporter = nodemailer.createTransport({
    service: 'gmail', // Use Gmail as the email service
    auth: {
      user: 'bookletsenior@gmail.com', // Your Gmail address
      pass: 'waly zjom hanf ulpo', // Your Gmail password or app-specific password
    },
  });

  const mailOptions = {
    from: 'your-email@gmail.com', // Sender address
    to: user.email, // Recipient address
    subject: "You updated your profile on Museo Rizal", // Email subject
    html: `
      <p>Hello ${user.firstName} ${user.lastName},</p>
      <p>You've updated your profile on ${new Date().toDateString()}.</p>
      <p>If you did not request this, please contact support.</p>
  `,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Error sending email:', error);
  }

  


  // const info = await client.send({
  //   from: { name: "Museo Rizal", email: "hello@mailtrap.com" },
  //   to: [{ email: user.email as string }],
  //   template_uuid: "56768d8f-7f8c-4aca-a987-9296730a0e23",
  //   template_variables: {
  //     firstName: user.firstName as string,
  //     lastName: user.lastName as string,
  //     password: user.password as string,

  //   }
  // })


  // if (!info.success) {
  //   throw Error(info.message_ids[0])
  // }

  // console.log(info)
  
}

const userModifyPassword = async (user: Partial<IUser>) => {

  // console.log(user)

  const transporter = nodemailer.createTransport({
    service: 'gmail', // Use Gmail as the email service
    auth: {
      user: 'bookletsenior@gmail.com', // Your Gmail address
      pass: 'waly zjom hanf ulpo', // Your Gmail password or app-specific password
    },
  });

  const mailOptions = {
    from: 'your-email@gmail.com', // Sender address
    to: user.email, // Recipient address
    subject: "You updated your password on Museo Rizal", // Email subject
    html: `
      <p>Hello ${user.firstName} ${user.lastName},</p>
      <p>You've updated your profile on ${new Date().toDateString()}.</p>
      <p>You're new password: ${user.password}</p>
      <p>If you did not request this, please contact support.</p>
  `,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Error sending email:', error);
  }
}

export const EmailService = { 
  userInformationEmail, userModifyProfile, userModifyPassword, accountRegisterInformation, accountApprovedEmail
 }
