import mongoose from "mongoose";

// Augment Node.js global to cache the connection across Next.js hot-reloads.
// Renamed to `mongooseCache` to avoid colliding with the mongoose library import.
declare global {
  var mongooseCache: {
    conn: mongoose.Connection | null;
    promise: Promise<mongoose.Connection> | null;
  };
}

const cached =
  global.mongooseCache ??
  (global.mongooseCache = { conn: null, promise: null });

/**
 * Returns a cached Mongoose connection, creating one if necessary.
 *
 * Calling this at the top of every Server Action or Route Handler is safe —
 * it's a no-op when the connection is already live.
 */
export async function connectDB(): Promise<mongoose.Connection> {
  // Return existing connection immediately.
  if (cached.conn) return cached.conn;

  if (!process.env.MONGODB_URI) {
    throw new Error("MONGODB_URI is not defined. Add it to .env.local.");
  }

  // Kick off the connection only once; subsequent calls wait on the same promise.
  if (!cached.promise) {
    cached.promise = mongoose.connect(process.env.MONGODB_URI).then((m) => {
      console.log("✅ MongoDB connected");
      return m.connection;
    });
  }

  // Cache-poisoning prevention: if the connection attempt fails, reset the
  // promise so the next call can retry from scratch instead of re-awaiting
  // a permanently rejected promise.
  try {
    cached.conn = await cached.promise;
  } catch (err) {
    cached.promise = null;
    throw err;
  }

  return cached.conn;
}
