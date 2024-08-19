import { SessionOptions } from "iron-session";

// add later
//const expires = new Date(Date.now() + 10 * 60 * 1000);

export const sessionOptions: SessionOptions = {
  password: process.env.SESSION_SECRET_KEY!,
  cookieName: "blog-session",
  cookieOptions: {
    // expires, // choose this one or
    // maxAge: undefined, // add later (this one)
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  },
};

export type Session = {
  name?: string;
  email?: string;
  isLoggedIn: boolean;
};

export const defaultSession: Session = {
  name: undefined,
  email: undefined,
  isLoggedIn: false,
};
