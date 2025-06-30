import express from "express";
import { registerUser, login, logoutUser, authMiddleware } from "../../controllers/auth/auth-controller";
import { Request } from "express";
const router = express.Router();

// Routes to controllers
router.post("/register", registerUser); // This route is linked to registerUser controller
router.post("/login", login);// This route is linked to login controller
router.post("/logout", logoutUser);
router.get("/check-auth", authMiddleware, (req: Request, res) => {
    const user = req.user;
    res.status(200).json({
        success: true,
        message: "Authenticated user",
        user
    });
})


export default router;
