import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || '';

// Ne pas vérifier au build time, seulement au runtime
if (!MONGODB_URI && typeof window === 'undefined' && process.env.NODE_ENV !== 'production') {
  console.warn('MONGODB_URI is not defined. MongoDB connection will fail.');
}

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  var mongoose: MongooseCache | undefined;
}

let cached: MongooseCache = global.mongoose || { conn: null, promise: null };

if (!global.mongoose) {
  global.mongoose = cached;
}

async function connectDB(): Promise<typeof mongoose> {
  if (cached.conn) {
    return cached.conn;
  }

  if (!MONGODB_URI) {
    throw new Error('MONGODB_URI is not defined. Please check your environment variables.');
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      console.log('✅ MongoDB connected successfully');
      return mongoose;
    }).catch((error) => {
      console.error('❌ MongoDB connection error:', error.message);
      cached.promise = null;
      throw error;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e: any) {
    cached.promise = null;
    console.error('❌ MongoDB connection failed:', e.message);
    throw new Error(`MongoDB connection failed: ${e.message}`);
  }

  return cached.conn;
}

export default connectDB;

