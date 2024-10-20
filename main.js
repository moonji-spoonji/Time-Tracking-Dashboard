// parts of individual cards
let title = document.querySelectorAll(".title")
let current = document.querySelectorAll(".current")
let previous = document.querySelectorAll(".previous")

// daily, weekly, monthly options
let dwm = document.querySelectorAll(".dwm")
let selectedTime;

document.addEventListener("DOMContentLoaded", function () {
    fetch('data.json')
    .then((response) => {
        if (!response.ok) {
            throw new Error('Experienced an error when trying to fetch data :(');
        }

        return response.json()
    })
    .then((data) => {
        // display daily by default 
        data.map((card,index) => {
            title[index].innerText = card.title
            current[index].innerText = `${card.timeframes.daily.current}${card.timeframes.daily.current === 0 || card.timeframes.daily.current > 1 ? "hrs" : "hr"}`;
            previous[index].innerText = `Yesterday - ${card.timeframes.daily.previous} ${card.timeframes.daily.previous === 0 || card.timeframes.daily.previous > 1 ? "hrs" : "hr"}`;
        })
    })
})

function getTimeframe(callback) {
    dwm.forEach((item) => {   
        item.addEventListener("click", function checkValue(e) {
            dwm.forEach((otherItem) => {
                otherItem.classList.remove('active');
            });
            e.target.classList.add('active');
            setTimeout(() => {
              e.target.classList.remove('active');  
            }, 10000)
        callback(e.target.innerText);
       })
    })
}

fetch('data.json').then((response) => {
    if (!response.ok) {
        throw new Error('Experienced an error when trying to fetch data :(');
    }
    return response.json();
})
.then((data) => {
    getTimeframe((selectedTime) => {
        if(selectedTime === "Daily") {
            data.map((card, index) => {
                title[index].innerText = card.title;
                current[index].innerText = `${card.timeframes.daily.current}${card.timeframes.daily.current === 0 || card.timeframes.daily.current > 1 ? "hrs" : "hr"}`;
                previous[index].innerText = `Yesterday - ${card.timeframes.daily.previous} ${card.timeframes.daily.previous === 0 || card.timeframes.daily.previous ? "hrs" : "hr"}`;
            })
        }
        else if(selectedTime === "Weekly") {
            data.map((card, index) => {
                title[index].innerText = card.title;
                current[index].innerText = `${card.timeframes.weekly.current}${card.timeframes.weekly.current === 0 || card.timeframes.weekly.current > 1 ? "hrs" : "hr"}`;
                previous[index].innerText = `Last Week - ${card.timeframes.weekly.previous} ${card.timeframes.weekly.previous === 0 || card.timeframes.weekly.previous > 1 ? "hrs" : "hr"}`;
            })
        }
        else { 
            data.map((card, index) => {
                title[index].innerText = card.title;
                current[index].innerText = `${card.timeframes.monthly.current}${card.timeframes.monthly.current === 0 || card.timeframes.monthly.current > 1 ? "hrs" : "hr"}`;
                previous[index].innerText = `Last Month - ${card.timeframes.monthly.previous}  ${card.timeframes.monthly.previous === 0 || card.timeframes.monthly.previous > 1 ? "hrs" : "hr"}`;
            }) 
        }
    })
}).catch(error => {
    console.log(error.message);
})
