const notifRepo = require("../repositories/notificationRepository");
const userRepo = require("../repositories/userRepository");

const createNotificationsForAllUsers = async (song) => {
  const users = await userRepo.findAll();
  const notifications = users.map((user) => ({
    message: `New song added: "${song.title}" by ${song.singer}`,
    song: song._id,
    user: user._id,
    isRead: false,
  }));
  await notifRepo.insertMany(notifications);
};

const getMyNotifications = async (userId) => {
  const notifications = await notifRepo.findByUser(userId);
  const unreadCount = await notifRepo.countUnread(userId);
  return { notifications, unreadCount };
};

const markAsRead = async (id) => {
  await notifRepo.markOneAsRead(id);
  return { message: "Marked as read" };
};

// const markAllAsRead = async (userId) => {
//   await notifRepo.markAllAsRead(userId);
//   return { message: "All marked as read" };
// };
const markAllAsRead = async (userId) => {
  console.log("service markAllAsRead called with userId:", userId);
  const result = await notifRepo.markAllAsRead(userId);
  console.log("repo markAllAsRead result:", result);
  return { message: "All marked as read" };
};

module.exports = {
  createNotificationsForAllUsers,
  getMyNotifications,
  markAsRead,
  markAllAsRead,
};
