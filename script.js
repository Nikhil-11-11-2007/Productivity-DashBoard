function openFeatures() {
    let allElems = document.querySelectorAll(".elem")
    let fullElemPage = document.querySelectorAll(".fullElem")
    let fullElemPageBackBtn = document.querySelectorAll(".fullElem .back")

    allElems.forEach(function (elem) {
        elem.addEventListener("click", function () {
            fullElemPage[elem.id].style.display = "block"
        })
    })

    fullElemPageBackBtn.forEach(function (back) {
        back.addEventListener("click", function () {
            fullElemPage[back.id].style.display = "none"
        })

    })
}

openFeatures()

function todoList() {
    let form = document.querySelector(".addTask form")
    let taskInput = document.querySelector(".addTask form #task-input")
    let taskDetailsInput = document.querySelector(".addTask form textarea")
    let taskCheckbox = document.querySelector(".addTask form #check")

    var currentTask = []

    if (localStorage.getItem("CurrentTask")) {
        currentTask = JSON.parse(localStorage.getItem("CurrentTask"))
    } else {
        console.log("task list is Empty");
    }

    function renderTask() {
        var allTask = document.querySelector(".allTask")

        let sum = ""
        currentTask.forEach(function (elem, idx) {
            sum += `<div class="task">
                        <details>
                        <summary>${elem.task} <span class="${elem.imp}">imp</span></summary>
                        <p>${elem.details} </p>
                        </details>
                        
                        <button id="${idx}">Mark as Completed</button>
                    </div>`
        })

        allTask.innerHTML = sum
        localStorage.setItem("CurrentTask", JSON.stringify(currentTask))

        document.querySelectorAll(".task button").forEach(function (btn) {
            btn.addEventListener("click", function () {
                currentTask.splice(btn.id, 1)
                renderTask()
            })
        })
    }

    renderTask()

    form.addEventListener("submit", function (e) {
        e.preventDefault()
        currentTask.push(
            {
                task: taskInput.value,
                details: taskDetailsInput.value,
                imp: taskCheckbox.checked
            }
        )
        renderTask()
        taskCheckbox.checked = false
        taskInput.value = ""
        taskDetailsInput.value = ""

    })

}

todoList()

function dailyPlanner() {
    let dayPlanner = document.querySelector(".day-planner")

    let dayPlaneData = JSON.parse(localStorage.getItem("dayPlaneData")) || {}

    var hours = Array.from({ length: 18 }, (_, idx) => `${6 + idx} : 00 - ${7 + idx} : 00`)

    let wholeDaySome = ''

    hours.forEach(function (elem, idx) {
        let savedData = dayPlaneData[idx] || ""

        wholeDaySome += `<div class="day-planner-time">
                    <p>${elem}</p>
                    <input id="${idx}" type="text" placeholder="..." value="${savedData}">
                </div>`
    })

    dayPlanner.innerHTML = wholeDaySome

    var dayPlannerInput = document.querySelectorAll(".day-planner input")

    dayPlannerInput.forEach(function (elem) {
        elem.addEventListener("input", function () {
            dayPlaneData[elem.id] = elem.value
            localStorage.setItem("dayPlaneData", JSON.stringify(dayPlaneData))

        })
    })
}
dailyPlanner()

function motivationalQuotes() {
    let motivationQuote = document.querySelector(".motivation-2 h1")
    let motivationAuthor = document.querySelector(".motivation-3 h2")

    async function fetchQuote() {
        let res = await fetch(
            "https://dummyjson.com/quotes/random?tag=motivational"
        );
        let data = await res.json();
        motivationQuote.innerHTML = data.quote
        motivationAuthor.innerHTML = '-' + data.author
    }

    fetchQuote();
}

motivationalQuotes()

function pomodoroTimer() {
    let timer = document.querySelector(".pomo-timer h1")
    let startBtn = document.querySelector(".pomo-timer .start-timer")
    let pauseBtn = document.querySelector(".pomo-timer .pause-timer")
    let resetBtn = document.querySelector(".pomo-timer .reset-timer")
    let session = document.querySelector(".session")

    let isWorkSession = true

    let timerInterval = null

    let totalSeconds = 25 * 60

    function updateTimer() {
        let min = Math.floor(totalSeconds / 60)
        let sec = totalSeconds % 60

        timer.innerHTML = `${String(min).padStart("2", 0)}:${String(sec).padStart("2", 0)}`
    }

    function startTimer() {
        clearInterval(timerInterval)
        if (isWorkSession) {
            timerInterval = setInterval(function () {
                if (totalSeconds > 0) {
                    totalSeconds--
                    updateTimer()
                } else {
                    session.innerHTML = "Break Time"
                    session.style.color = "var(--sec)"
                    session.style.backgroundColor = "var(--pre)"
                    totalSeconds = 5 * 60
                    isWorkSession = false
                    clearInterval(timerInterval)
                    timer.innerHTML = `05:00`
                }
            }, 1000)
        } else {
            timerInterval = setInterval(function () {
                if (totalSeconds > 0) {
                    totalSeconds--
                    updateTimer()
                } else {
                    session.innerHTML = "Work Session"
                    session.style.color = "var(--pre)"
                    session.style.backgroundColor = "var(--tri1)"
                    totalSeconds = 25 * 60
                    isWorkSession = true
                    clearInterval(timerInterval)
                    timer.innerHTML = `25:00`
                }
            }, 1000)
        }
    }

    function pauseTimer() {
        clearInterval(timerInterval)
    }

    function resetTimer() {
        clearInterval(timerInterval)
        totalSeconds = 25 * 60
        updateTimer()
    }

    startBtn.addEventListener("click", startTimer)
    pauseBtn.addEventListener("click", pauseTimer)
    resetBtn.addEventListener("click", resetTimer)
}

pomodoroTimer()

function dailyGoals() {
    let form = document.querySelector(".addGoal form")
    let goalDetailsInput = document.querySelector(".addGoal form textarea")

    var currentGoal = []

    if (localStorage.getItem("currentGoal")) {
        currentGoal = JSON.parse(localStorage.getItem("currentGoal"))
    } else {
        console.log("goal is empty");
    }

    function renderGoal() {
        let allGoal = document.querySelector(".allGoal")
        let clutter = ""

        currentGoal.forEach(function (elem, idx) {
            clutter += `<div class="goal">
                        <p>${elem.details}</p>
                        <button id="${idx}">Mark as completed</button>
                    </div>`
        })

        allGoal.innerHTML = clutter
        localStorage.setItem("currentGoal", JSON.stringify(currentGoal))

        document.querySelectorAll(".goal button").forEach(function (btn) {
            btn.addEventListener("click", function () {
                currentGoal.splice(btn.id, 1)
                renderGoal()
            })
        })

    }
    renderGoal()
    form.addEventListener("submit", function (e) {
        e.preventDefault()
        currentGoal.push({ details: goalDetailsInput.value })
        renderGoal()
        goalDetailsInput.value = ""
    })
}

dailyGoals()

function dateTimeWeather() {
    const API_KEY = "751765e0045f4357b15105848252412";
    const CITY = "orai";

    /* ================= DOM CACHE ================= */
    const dom = {
        time: document.querySelector(".header1 h1"),
        date: document.querySelector(".header1 h2"),
        temp: document.querySelector(".header2 h2"),
        condition: document.querySelector(".header2 h4"),
        precipitation: document.querySelector(".header2 .precipitation"),
        humidity: document.querySelector(".header2 .humidity"),
        wind: document.querySelector(".header2 .wind"),
        header: document.querySelector("header"),
    };

    /* ================= WEATHER ================= */
    async function weatherAPICall() {
        try {
            const res = await fetch(
                `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${CITY}`
            );
            const { current } = await res.json();

            dom.temp.textContent = `${current.temp_c} °C`;
            dom.condition.textContent = current.condition.text;
            dom.precipitation.textContent = `Precipitation : ${current.precip_mm} mm`;
            dom.humidity.textContent = `Humidity : ${current.humidity}%`;
            dom.wind.textContent = `Wind : ${current.wind_kph} km/h`;
        } catch (err) {
            console.error("Weather API Error:", err);
        }
    }

    weatherAPICall();

    /* ================= TIME & DATE ================= */
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const pad = (n) => String(n).padStart(2, "0");

    function setBackground(hours) {
        let img = "";

        if (hours >= 20) {
            img = "https://images.unsplash.com/photo-1514912885225-5c9ec8507d68";
        } else if (hours >= 18) {
            img = "https://images.unsplash.com/photo-1722999523044-80af4abe1ada";
        } else if (hours >= 12) {
            img = "https://images.unsplash.com/photo-1717361279773-b2e7ee713d2e"
        } else if (hours >= 9) {
            img = "https://images.unsplash.com/photo-1498354136128-58f790194fa7";
        } else if (hours > 6) {
            img = "https://images.unsplash.com/photo-1703359612447-9f1293138d13";
        }

        if (img) dom.header.style.backgroundImage = `url(${img})`;

    }

    function timeDate() {
        const now = new Date();

        const dayName = days[now.getDay()];
        const hours24 = now.getHours();
        const minutes = pad(now.getMinutes());
        const seconds = pad(now.getSeconds());

        const hours12 = hours24 % 12 || 12;
        const ampm = hours24 >= 12 ? "PM" : "AM";

        dom.time.textContent = `${dayName} ${hours12}:${minutes}:${seconds} ${ampm}`;
        dom.date.textContent = `${now.getDate()} ${months[now.getMonth()]}, ${now.getFullYear()}`;

        setBackground(hours24);
    }

    timeDate();
    setInterval(timeDate, 1000);

}

dateTimeWeather()

let rootElement = document.documentElement

let flag = 0

let theme = document.querySelector(".theme")
theme.addEventListener("click", function () {
    if (flag === 0) {
        rootElement.style.setProperty('--pre', '#50390aff')
        rootElement.style.setProperty('--sec', '#FDF7E4')
        rootElement.style.setProperty('--tri1', '#FFE1AF')
        rootElement.style.setProperty('--tri2', '#d7ccb7ff')
        flag = 1
    } else if (flag === 1) {
        rootElement.style.setProperty('--pre', '#e4ffccff')
        rootElement.style.setProperty('--sec', '#537D5D')
        rootElement.style.setProperty('--tri1', '#b2b865ff')
        rootElement.style.setProperty('--tri2', '#9EBC8A')
        flag = 0
    }
})
