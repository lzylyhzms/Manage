import express from "express";
import pkg from "pg";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cors from "cors";

const { Pool } = pkg;
const app = express();
app.use(express.json());
app.use(cors());

// 连接 PostgreSQL
const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "mydb",
    password: "yourpassword",
    port: 5432,
});

// 登录接口
app.post("/login", async (req, res) => {
    const { username, password } = req.body;

    try {
        const result = await pool.query(
            "SELECT * FROM users WHERE username=$1",
            [username]
        );

        if (result.rows.length === 0) {
            return res.status(401).json({ message: "用户不存在" });
        }

        const user = result.rows[0];
        const match = await bcrypt.compare(password, user.password);

        if (!match) {
            return res.status(401).json({ message: "密码错误" });
        }

        // 生成 token
        const token = jwt.sign({ id: user.id, username: user.username }, "secret", {
            expiresIn: "2h",
        });

        res.json({ message: "登录成功", token });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "服务器错误" });
    }
});

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});
