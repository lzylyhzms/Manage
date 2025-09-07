import express from "express";
import mysql from "mysql2/promise";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cors from "cors";
import dotenv from "dotenv";

// 加载 .env 配置
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// 连接 MySQL
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});

// 注册接口
app.post("/register", async (req, res) => {
    const { username, password } = req.body;

    try {
        const [rows] = await pool.query("SELECT id FROM users WHERE username = ?", [username]);
        if (rows.length > 0) {
            return res.status(400).json({ message: "用户名已存在" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        await pool.query("INSERT INTO users (username, password) VALUES (?, ?)", [
            username,
            hashedPassword,
        ]);

        res.json({ message: "注册成功" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "服务器错误" });
    }
});

// 登录接口
app.post("/login", async (req, res) => {
    const { username, password } = req.body;

    try {
        const [rows] = await pool.query("SELECT * FROM users WHERE username = ?", [username]);
        if (rows.length === 0) {
            return res.status(401).json({ message: "用户不存在" });
        }

        const user = rows[0];
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(401).json({ message: "密码错误" });
        }

        // 使用 .env 里的秘钥
        const token = jwt.sign(
            { id: user.id, username: user.username },
            process.env.JWT_SECRET,
            { expiresIn: "2h" }
        );

        res.json({ message: "登录成功", token });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "服务器错误" });
    }
});

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});
