import nextAuth from "next-auth";
import { nextAuthOptions } from "./options";

const handler = nextAuth(nextAuthOptions);

export { handler as GET, handler as POST };
