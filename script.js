const countDownForm = document.getElementById('countDownForm')
const inputContainer = document.getElementById('input-container')
const dateElement = document.getElementById('date-picker')
const countDownElement = document.getElementById('countdown')

const countDownTitleElement = document.getElementById('countdown-title')
const countDownButtonElement = document.getElementById('countdown-button')
const timeElement = document.querySelectorAll('span')

const completeElement = document.getElementById('complete')
const completeInfoElement = document.getElementById('complete-info')
const completeButtonElement = document.getElementById('complete-button')

// ตัวแปรควบคุมการทำงาน

let countDownTitle = ''
let countDownDate = ''

let countDownValue = Date // เก็บวันที่เลือกจากฟอร์ม
let countDownActive // ตัวนับเวลา
let saveCountDown // ปุ่มเซฟ

// แปลงหน่วยเวลา
const second = 1000
const minute = second * 60
const hour = minute * 60
const day = hour * 24

countDownForm.addEventListener('submit', updateCountDown)

function updateCountDown(e) {
    e.preventDefault()
    countDownTitle = e.srcElement[0].value
    countDownDate = e.srcElement[1].value

    console.log('countDownTitle', countDownTitle)
    console.log('countDownDate', countDownDate)

    if (countDownTitle === '' || countDownDate === '') {
        alert('กรอกข้อมูลไม่ครบ')
    } else {
        saveCountDown = { title: countDownTitle, date: countDownDate }
        localStorage.setItem("countdown", JSON.stringify(saveCountDown))
        countDownValue = new Date(countDownDate).getTime()
        setUpTime()
    }
}

function setUpTime() {
    countDownActive = setInterval(() => {
        // เวลาที่เหลือ = เวลาที่ตั้งไว้ - เวลาปัจจุบัน
        const now = new Date().getTime()
        const distance = countDownValue - now

        const days = Math.floor(distance / day)
        const hours = Math.floor((distance % day) / hour)
        const minutes = Math.floor((distance % hour) / minute)
        const seconds = Math.floor((distance % minute) / second)
        inputContainer.hidden = true

        if (distance < 0) {
            // หมดเวลา
            countDownElement.hidden = true
            completeElement.hidden = false
            completeInfoElement.textContent = `${countDownTitle} วันที่ ${countDownDate}`
            clearInterval(countDownActive)
        } else {
            // นับถอยหลังเรื่อยๆ
            countDownTitleElement.textContent = `${countDownTitle}`

            timeElement[0].textContent = `${days}`
            timeElement[1].textContent = `${hours}`
            timeElement[2].textContent = `${minutes}`
            timeElement[3].textContent = `${seconds}`
            countDownElement.hidden = false
        }
    }, second)
}

function callDataInStore() {
    if (localStorage.getItem('countdown')) {
        inputContainer.hidden = true
        saveCountDown = JSON.parse(localStorage.getItem('countdown'))
        countDownTitle = saveCountDown.title
        countDownDate = saveCountDown.date
        countDownValue = new Date(countDownDate).getTime()
        setUpTime()
    }
}

callDataInStore()



