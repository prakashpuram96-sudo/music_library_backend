const Notification = require("../models/Notification");

const insertMany = (data) => Notification.insertMany(data);
const findByUser = (userId) =>
  Notification.find({ user: userId }).sort({ createdAt: -1 }).limit(20);
const countUnread = (userId) =>
  Notification.countDocuments({ user: userId, isRead: false });
const markOneAsRead = (id) =>
  Notification.findByIdAndUpdate(id, { isRead: true });
// const markAllAsRead = (userId) =>
//   Notification.updateMany({ user: userId }, { isRead: true });
const markAllAsRead = async (userId) => {
  console.log("repo markAllAsRead userId:", userId, "type:", typeof userId);
  const result = await Notification.updateMany(
    { user: userId },
    { isRead: true }
  );
  console.log("updateMany result:", result);
  return result;
};

module.exports = {
  insertMany,
  findByUser,
  countUnread,
  markOneAsRead,
  markAllAsRead,
};
