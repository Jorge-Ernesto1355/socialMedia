const webPush = require("web-push");
const publicKey =
  "BAXDDlGfnQAbgREOLlk543Q5qlb4lw4Cv467DRCnmHQYjIHYwsdak23VMvmb45oKp1nsrEHdylKpZz1e-YqYpmk";
const privateKey = "o-q_UCq_WoK-Zna-tXUSY5lhPhx4QZayqMlulluozMk";
webPush.setVapidDetails("mailto:lower.joerge@gmail.com", publicKey, privateKey);

module.exports = webPush;
