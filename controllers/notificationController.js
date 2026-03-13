const notifService = require("../services/notificationService");

const getMyNotifications = async (req, res) => {
  try {
    const result = await notifService.getMyNotifications(req.user._id);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const markAsRead = async (req, res) => {
  try {
    const result = await notifService.markAsRead(req.params.id);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// const markAllAsRead = async (req, res) => {
//   try {
//     const result = await notifService.markAllAsRead(req.user._id);
//     res.json(result);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };
const markAllAsRead = async (req, res) => {
  try {
    console.log("markAllAsRead called for user:", req.user._id);
    const result = await notifService.markAllAsRead(req.user._id);
    console.log("markAllAsRead result:", result);
    res.json(result);
  } catch (error) {
    console.error("ERROR in markAllAsRead:", error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getMyNotifications, markAsRead, markAllAsRead };
