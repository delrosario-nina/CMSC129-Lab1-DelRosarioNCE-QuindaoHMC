import mongoose, { Connection } from "mongoose";

export let primaryDB: Connection;
export let backupDB: Connection;

export const connectDB = async () => {
  const primaryURI = process.env.MONGODB_URI;
  const backupURI  = process.env.MONGODB_BACKUP_URI;

  if (!primaryURI) throw new Error("MONGODB_URI is not set");
  if (!backupURI)  throw new Error("MONGODB_BACKUP_URI is not set");

  // Primary connection
  const primaryConn = await mongoose.createConnection(primaryURI).asPromise();
  primaryDB = primaryConn;
  console.log("Primary DB connected");

  // Backup connection
  const backupConn = await mongoose.createConnection(backupURI).asPromise();
  backupDB = backupConn;
  console.log("Backup DB connected");
};