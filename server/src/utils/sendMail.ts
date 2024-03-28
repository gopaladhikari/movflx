import nodemailer, { SendMailOptions } from "nodemailer";
import bcrypt from "bcrypt";
import { env } from "../conf/env";
import { ObjectId } from "mongoose";
import { User } from "../models/user.model";

export const sendMail = async (
  email: string,
  type: "verify" | "reset",
  id: ObjectId
) => {
  const subject =
    type === "verify" ? "Verify your account" : "Reset your password";

  try {
    const salt = await bcrypt.genSalt(10);
    const hasedToken = await bcrypt.hash(String(id), salt);

    if (type === "verify") {
      await User.findByIdAndUpdate(id, {
        emailVerificationToken: hasedToken,
        emailVerificationTokenExpiry: Date.now() + 3600000,
      });
    }

    if (type === "reset") {
      await User.findByIdAndUpdate(id, {
        passwordResetToken: hasedToken,
        passwordResetTokenExpiry: Date.now() + 3600000,
      });
    }

    const mailOptions: SendMailOptions = {
      from: env.from,
      to: email,
      subject,
      html: `<p> Click on the link to ${type} your account: <a href="${env.domain}/auth/${type}?token=${hasedToken}"> ${env.domain}/auth/${type}?token=${hasedToken}</a> </p>`,
    };

    const transporter = nodemailer.createTransport({
      service: "google",
      host: "smtp.gmail.com",
      auth: {
        user: env.user,
        pass: env.pass,
      },
    });

    const res = await transporter.sendMail(mailOptions);
    return res;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};
