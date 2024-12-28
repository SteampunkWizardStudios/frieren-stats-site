export { auth as middleware } from "@/lib/auth";

// Middleware to keep the session alive, this will update the session expiry every time its called.
