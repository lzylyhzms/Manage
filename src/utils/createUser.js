// 运行一个脚本
import bcrypt from "bcrypt";
import mysql from "mysql2/promise";

const run = async () => {
    const pool = await mysql.createPool({
        host: "localhost",
        user: "root",
        password: "Lzy877652",
        database: "mydb",
    });

    const hash = await bcrypt.hash("123456", 10);  // 加密密码
    await pool.query("INSERT INTO users (username, password) VALUES (?, ?)", [
        "testuser",
        hash,
    ]);
    console.log("用户已插入");
};

run();
