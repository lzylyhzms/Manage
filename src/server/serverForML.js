import express from "express";
import mysql from "mysql2/promise";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

// 连接 MySQL
const pool = mysql.createPool({
    host: "localhost",
    user: "root",           // ⚠️ 修改为你的 MySQL 用户
    password: "Lzy877652", // ⚠️ 修改为你的 MySQL 密码
    database: "mydb",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});

// 注册接口
app.post("/register", async (req, res) => {
    const { username, password } = req.body;

    try {
        // 检查用户是否存在
        const [rows] = await pool.query("SELECT id FROM users WHERE username = ?", [username]);
        if (rows.length > 0) {
            return res.status(400).json({ message: "用户名已存在" });
        }

        // 密码加密
        const hashedPassword = await bcrypt.hash(password, 10);

        // 插入用户
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

        // 生成 token
        const token = jwt.sign(
            { id: user.id, username: user.username },
            "secret", // ✅ 建议换成 process.env.JWT_SECRET
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
