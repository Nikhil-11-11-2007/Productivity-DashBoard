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
        taskDetailsInput = ""

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