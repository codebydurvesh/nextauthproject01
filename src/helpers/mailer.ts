import nodemailer from "nodemailer";

export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {

    // TODO: configure mail for usage


    const transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 465,
      secure: true, // Use true for port 465, false for port 587
      auth: {
        user: "maddison53@ethereal.email",
        pass: "jn7jnAPss4f63QBp6D",
      },
    });

    const mailOptions = {
      from: "codebydurvesh.com@gmail.com",
      to: email,
      subject:
        emailType === "VERIFY" ? "Verift your email" : "Reset your password",
      html: "<b>Hello world?</b>", // HTML version of the message
    };

    const mailResponse = await transporter.sendMail(mailOptions);

    return mailResponse;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
