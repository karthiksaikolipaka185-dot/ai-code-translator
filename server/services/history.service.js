import History from "../models/History.js";

export const createHistoryEntry = async (data) => {
  const entry = await History.create(data);
  return entry;
};

export const getUserHistory = async (userId, page = 1, limit = 10) => {
  const skip = (page - 1) * limit;

  const [entries, total] = await Promise.all([
    History.find({ userId })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit),
    History.countDocuments({ userId }),
  ]);

  return {
    entries,
    total,
    page: Number(page),
    pages: Math.ceil(total / limit),
  };
};

export const getHistoryById = async (entryId, userId) => {
  const entry = await History.findOne({ _id: entryId, userId });
  if (!entry) throw new Error("History entry not found");
  return entry;
};

export const deleteHistoryEntry = async (entryId, userId) => {
  const entry = await History.findOneAndDelete({ _id: entryId, userId });
  if (!entry) throw new Error("History entry not found");
  return entry;
};

export const clearUserHistory = async (userId) => {
  const result = await History.deleteMany({ userId });
  return { deletedCount: result.deletedCount };
};
