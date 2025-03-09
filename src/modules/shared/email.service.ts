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
  userInformationEmail, userModifyProfile, userModifyPassword
 }
