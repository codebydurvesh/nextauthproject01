import { User } from "@/models/userModel";
import nodemailer from "nodemailer";
import bcryptjs from "bcryptjs";

const USER = process.env.MAILTRAP_USER;
const PASSWORD = process.env.MAILTRAP_PASSWORD;

export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);

    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000,
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 3600000,
      });
    }

    var transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: USER,
        pass: PASSWORD,
      },
    });

    const mailOptions = {
      from: "noreply@yourdomain.com",
      to: email,
      subject:
        emailType === "VERIFY" ? "Verift your email" : "Reset your password",
      html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to
       ${emailType === "VERIFY" ? "verify your email" : "reset your password"} 
       or copy and paste the link below in your browser <br>
       ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
       </p>`, // HTML version of the message
    };

    const mailResponse = await transport.sendMail(mailOptions);

    return mailResponse;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
