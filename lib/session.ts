// import { cookies } from 'next/headers'
// import { getIronSession } from 'iron-session'

// export interface SessionData {
//   userId?: string
//   isLoggedIn: boolean
// }

// export const defaultSession: SessionData = {
//   isLoggedIn: false
// }

// export const sessionOptions = {
//   password: process.env.SESSION_SECRET as string,
//   cookieName: 'next-app-session',
//   cookieOptions: {
//     httpOnly: true,
//     secure: process.env.NODE_ENV === 'production',
//     maxAge: 60 * 60 * 24 * 7, // 1 week
//     path: '/',
//   },
// }

// export async function getSession() {
//   const session = await getIronSession<SessionData>(
//     cookies(),
//     sessionOptions
//   )
  
//   // Initialize session if empty
//   if (!session.isLoggedIn) {
//     session.isLoggedIn = defaultSession.isLoggedIn
//   }
  
//   return session
// }