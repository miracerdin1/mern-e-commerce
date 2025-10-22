import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth/auth-routes";

import adminProductsRouter from "./routes/admin/products-routes";
import shopProductsRouter from "./routes/shop/products-routes";
import shopCartRouter from "./routes/shop/cart-routes";

const app = express();
const PORT = process.env.PORT || 3000;

mongoose.connect('mongodb+srv://miracerdin:mirac@cluster0.q8qesc8.mongodb.net/')
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error(err));

app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization', "Cache-Control", "Expires", "Pragma"],
    credentials: true
}));

app.use(cookieParser());
app.use(express.json());

app.use('/api/auth', authRouter);
app.use("/api/admin/products", adminProductsRouter);
app.use("/api/shop/products", shopProductsRouter);
app.use("/api/shop/cart", shopCartRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
