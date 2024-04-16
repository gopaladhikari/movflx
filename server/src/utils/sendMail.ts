import nodemailer, { SendMailOptions } from "nodemailer";
import bcrypt from "bcrypt";
import { env } from "../conf/env";
import { ObjectId } from "mongoose";
import { User } from "../models/user.model";
import { getForgotPasswordTemplate } from "../templates/forgotPasswordTemplate";

export const sendMail = async (
	email: string,
	type: "verify" | "reset",
	id: ObjectId
) => {
	const subject =
		type === "verify" ? "Verify your account" : "Reset your password";

	const mailOptions: SendMailOptions = {
		from: {
			name: "Movflx",
			address: env.from,
		},
		to: email,
		subject,
	};

	try {
		const salt = await bcrypt.genSalt(10);
		const hasedToken = await bcrypt.hash(String(id), salt);

		if (type === "verify") {
			await User.findByIdAndUpdate(id, {
				emailVerificationToken: hasedToken,
				emailVerificationTokenExpiry: Date.now() + 3600000,
			});

			mailOptions.html = `<p> Click on the link to ${type} your account: <a href="${env.domain}/auth/${type}?token=${hasedToken}"> ${env.domain}/auth/${type}?token=${hasedToken}</a> </p>`;
		}

		if (type === "reset") {
			const user = await User.findByIdAndUpdate(id, {
				forgotPasswordToken: hasedToken,
				forgotPasswordTokenExpiry: Date.now() + 3600000,
			});

			const username = `${user?.firstName} ${user?.lastName}`;

			mailOptions.html = getForgotPasswordTemplate(username, hasedToken);
		}

		const transporter = nodemailer.createTransport({
			host: "smtp.ethereal.email",
			port: 587,
			secure: false,
			auth: {
				user: "maddison53@ethereal.email",
				pass: "jn7jnAPss4f63QBp6D",
			},
		});

		const res = await transporter.sendMail(mailOptions);
		return res;
	} catch (error) {
		console.log(error);
		throw new Error((error as Error).message);
	}
};
