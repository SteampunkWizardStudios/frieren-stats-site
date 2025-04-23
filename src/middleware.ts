export { auth as middleware } from "@/lib/auth";

export const config = { matcher: ["/rank", "/list"] }

// Middleware to keep the session alive, this will update the session expiry every time its called.
