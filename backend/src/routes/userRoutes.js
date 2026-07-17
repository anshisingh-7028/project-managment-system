import express from "express";

import {
  getUsers,
  createUser,
  getProfile,
  updateUser,
  deleteUser,
  updateProfile,
   updateUserRole,
   updateNotificationSettings,
   changePassword,
   getManagerTeam,
    
} from "../controllers/userController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";

const router = express.Router();


// ================= PROFILE =================
router.get(
"/profile",
authMiddleware,
getProfile
);

router.put(
  "/profile",
  authMiddleware,
  updateProfile
);
router.put(
"/notification-settings",
authMiddleware,
updateNotificationSettings
);

router.put(
"/change-password",
authMiddleware,
changePassword
);



// ================= ADMIN ONLY =================

router.get(
  "/",
  authMiddleware,
  roleMiddleware("admin","manager"),
  getUsers
);

router.post(
  "/",
  authMiddleware,
  roleMiddleware("admin"),
  createUser
);

router.put(
  "/:id",
  authMiddleware,
  roleMiddleware("admin"),
  updateUser
);

router.put(
"/role/:id",
authMiddleware,
roleMiddleware("admin"),
updateUserRole
);

router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("admin"),
  deleteUser
);

router.get(
"/manager/team",
authMiddleware,
roleMiddleware("manager"),
getManagerTeam          
);




export default router;