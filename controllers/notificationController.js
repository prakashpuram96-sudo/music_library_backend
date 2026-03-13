const Notification = require("../models/Notification");
const User = require("../models/User");

const createNotificationsForAllUsers = async (song) => {
  try {
    const users = await User.find({});
    const notifications = users.map((user) => ({
      message: `New song added: "${song.title}" by ${song.singer}`,
      song: song._id,
      user: user._id,
      isRead: false,
    }));
    await Notification.insertMany(notifications);
  } catch (error) {
    console.error("Notification error:", error);
  }
};

const getMyNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ user: req.user._id })
      .sort({ createdAt: -1 })
      .limit(20);
    const unreadCount = await Notification.countDocuments({
      user: req.user._id,
      isRead: false,
    });
    res.json({ notifications, unreadCount });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const markAsRead = async (req, res) => {
  try {
    await Notification.findByIdAndUpdate(req.params.id, { isRead: true });
    res.json({ message: "Marked as read" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const markAllAsRead = async (req, res) => {
  try {
    await Notification.updateMany({ user: req.user._id }, { isRead: true });
    res.json({ message: "All marked as read" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createNotificationsForAllUsers,
  getMyNotifications,
  markAsRead,
  markAllAsRead,
};
