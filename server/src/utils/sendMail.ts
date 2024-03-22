import nodemailer, { SendMailOptions } from "nodemailer";
import bcrypt from "bcrypt";
import { env } from "../conf/env";
import { ObjectId } from "mongoose";
import { User } from "../models/user.model";
import path from "path";
import ejs from "ejs";

export const sendMail = async (
  email: string,
  type: "verify" | "reset",
  id: ObjectId
) => {
  const subject =
    type === "verify" ? "Verify your account" : "Reset your password";

  let username = "User";

  const mailOptions: SendMailOptions = {
    from: env.from,
    to: email,
    subject,
  };

  const transporter = nodemailer.createTransport({
    service: "google",
    host: "smtp.gmail.com",
    auth: {
      user: env.user,
      pass: env.pass,
    },
  });

  try {
    const salt = await bcrypt.genSalt(10);
    const hasedToken = await bcrypt.hash(String(id), salt);

    if (type === "verify") {
      const user = await User.findByIdAndUpdate(id, {
        emailVerificationToken: hasedToken,
        emailVerificationTokenExpiry: Date.now() + 3600000,
      });

      username = user?.firstName + " " + user?.lastName;

      ejs.renderFile(
        path.join(__dirname, "../views/welcomeMessage.ejs"),
        { username, domain: env.domain, hasedToken },

        function (err, data) {
          if (err) console.log(`ejs error: ${err}`);
          else mailOptions.html = data;
        }
      );
    }

    if (type === "reset") {
      const user = await User.findByIdAndUpdate(id, {
        passwordResetToken: hasedToken,
        passwordResetTokenExpiry: Date.now() + 3600000,
      });

      username = user?.firstName + " " + user?.lastName;
    }

    const res = await transporter.sendMail(mailOptions);
    return res;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};
