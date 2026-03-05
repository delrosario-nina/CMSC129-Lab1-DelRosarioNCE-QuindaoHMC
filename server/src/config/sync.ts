import { Document, Model } from "mongoose";

// mirrors document to backup db after every create/updated story
export const syncToBackup = async <T>(
  backupModel: Model<T>,
  doc: T & { _id: unknown; __v?: unknown }
) => {
  try {
    const plain = { ...doc } as Record<string, unknown>;
    const id = plain._id;
    delete plain.__v;

    await backupModel.findByIdAndUpdate(id, plain, {
      upsert: true,      // create if doesn't exist
      new: true,
      runValidators: false,
    });
  } catch (err) {
    // Log but never crash the request — backup failure is non-fatal
    console.error("Backup sync failed:", err);
  }
};

// mirror hard delete to backup db
export const syncDeleteToBackup = async <T>(
  backupModel: Model<T>,
  id: unknown
) => {
  try {
    await backupModel.findByIdAndDelete(id);
  } catch (err) {
    console.error("Backup delete sync failed:", err);
  }
};