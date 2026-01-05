import express, { Request } from "express";
import {
  authMiddleware,
  login,
  logoutUser,
  registerUser,
} from "../../controllers/auth/auth-controller";
const router = express.Router();

// Routes to controllers
router.post("/register", registerUser); // This route is linked to registerUser controller
router.post("/login", login); // This route is linked to login controller
router.post("/logout", logoutUser);
router.get("/check-auth", authMiddleware, (req: Request, res) => {
  const user = req.user as any;
  res.status(200).json({
    success: true,
    message: "Authenticated user",
    user: {
      id: user?.userId,
      email: user?.email,
      role: user?.role,
      userName: user?.userName,
    },
  });
});

export default router;
