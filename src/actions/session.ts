"use server";

import { Session, sessionOptions, defaultSession } from "@/types/session";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";

export async function getSession() {
  const session = await getIronSession<Session>(cookies(), sessionOptions);

  if (!session.isLoggedIn) {
    session.name = defaultSession.name;
    session.email = defaultSession.email;
    session.isLoggedIn = defaultSession.isLoggedIn;
  }

  return session;
}

export async function createSession(name: string, email: string) {
  const session = await getSession();

  session.name = name;
  session.email = email;
  session.isLoggedIn = true;

  await session.save();
}

export async function destroySession() {
  const session = await getSession();

  session.destroy();
}
