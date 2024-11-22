const fs = require("fs");
const { exec } = require("child_process");

exec("ngrok http 3005", (err, stdout) => {
    if (err) {
        console.error("Error starting ngrok:", err);
        return;
    }
    const url = stdout.match(/https:\/\/[^\s]+/)[0];
    if (url) {
        const envContent = fs.readFileSync(".env", "utf8");
        const updatedContent = envContent.replace(/FRONTEND_URL=.*/, `FRONTEND_URL=${url}`);
        fs.writeFileSync(".env", updatedContent);
        console.log(`Updated FRONTEND_URL in .env: ${url}`);
    }
});
