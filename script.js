/*************************************************
 * ① 获取页面元素（HTML 里必须有这些 id）
 *************************************************/

// 倒计时显示
const cDays = document.getElementById("cDays");
const cHours = document.getElementById("cHours");
const cMinutes = document.getElementById("cMinutes");
const cSeconds = document.getElementById("cSeconds");
// 正计时显示
const pDays = document.getElementById("pDays");
const pHours = document.getElementById("pHours");
const pMinutes = document.getElementById("pMinutes");
const pSeconds = document.getElementById("pSeconds");
// 标题文字
const countdownTitle = document.getElementById("targetDate");
const passedTitle = document.getElementById("passedTitle");
// 输入框
const targetDateInput = document.getElementById("targetDate"); // 倒计时日期
const startDateInput = document.getElementById("startDate");   // 正计时日期
//背景图
const bgInput = document.getElementById("bgInput");

/*************************************************
 * ② 状态变量（用来存时间）
 *************************************************/

let targetTime = null;
let startTime = null;

/*************************************************
 * ③ 页面加载时：从 localStorage 读取之前保存的日期
 *************************************************/

// —— 倒计时 ——
const savedTargetDate = localStorage.getItem("targetDate");
if (savedTargetDate) {
    targetDateInput.value = savedTargetDate;
    targetTime = new Date(savedTargetDate).getTime();
}

// —— 正计时 ——
const savedStartDate = localStorage.getItem("startDate");
if (savedStartDate) {
    startDateInput.value = savedStartDate;
    startTime = new Date(savedStartDate).getTime();
}

// 背景图
const savedBg = localStorage.getItem("bgImage");
if (savedBg) {
    document.body.style.backgroundImage = `url(${savedBg})`;
}

/*************************************************
 * ④ 监听用户输入（当用户修改日期）
 *************************************************/

// 倒计时日期变化
targetDateInput.addEventListener("change", () => {
    targetTime = new Date(targetDateInput.value).getTime();
    localStorage.setItem("targetDate", targetDateInput.value);
});

// 正计时日期变化
startDateInput.addEventListener("change", () => {
    startTime = new Date(startDateInput.value).getTime();
    localStorage.setItem("startDate", startDateInput.value);
});

// 背景图上传
bgInput.addEventListener("change", () => {
    const file = bgInput.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
        document.body.style.backgroundImage = `url(${reader.result})`;
        localStorage.setItem("bgImage", reader.result);
    };
    reader.readAsDataURL(file);
});


/*************************************************
 * ⑤ 倒计时函数（距离未来还有多久）
 *************************************************/

function updateCountdown() {
    if (!targetTime) return;

    const nowDate = new Date();
    const isBirthday = 
        nowDate.getMonth() === 1 &&
        nowDate.getDate() === 7;

    if (isBirthday) {
        eventTitle.textContent = "宝宝生日快乐 🎂❤️";
    } else {
        eventTitle.textContent = "距离宝宝20岁还有";
    }

    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const m = Math.floor((diff / (1000 * 60)) % 60);
    const s = Math.floor((diff / 1000) % 60);

    flip(cDays, d);
    flip(cHours, h);
    flip(cMinutes, m);
    flip(cSeconds, s);
}


/*************************************************
 * ⑥ 正计时函数（已经过去多久）
 *************************************************/

function updatePassedTime() {
    if (!startTime) return;

    const now = Date.now();
    const diff = now - startTime;
    if (diff < 0) return;

    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const m = Math.floor((diff / 1000 * 60) % 60);
    const s = Math.floor((diff / 1000) % 60);

    passedTitle.textContent = "我们在一起已经";
    flip(pDays, d);
    flip(pHours, h);
    flip(pMinutes, m);
    flip(pSeconds, s);
}


/*************************************************
 * ⑦ 翻页动画函数（你原本的 flip 逻辑）
 *************************************************/

function flip(element, value) {
    const newValue = String(value).padStart(2, "0");
    if (element.textContent === newValue) return;

    element.textContent = newValue;
}

/*************************************************
 * ⑧ 定时器：每秒刷新一次
 *************************************************/

setInterval(() => {
    updateCountdown();
    updatePassedTime();
}, 1000);





