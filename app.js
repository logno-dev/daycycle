const slider = document.getElementById("day-slider");
const clock = document.getElementById("clock");
const hour = document.getElementById("hour");
const minute = document.getElementById("minute");
const ampm = document.getElementById("am-pm");
const daylight = document.getElementById("daylight");
const sun = document.getElementById("sun");
const moon = document.getElementById("moon");
const dayMountains = document.getElementById("day-mountains");
const stars = document.querySelector(".stars");
const cloud = document.querySelector(".cloud");
const modeToggle = document.getElementById("mode_toggle");

let sliderMode = true


function setClock() {
  if (sliderMode) {
    minute.innerText = String(((slider.value % 4) * 15)).padStart(2, '0');
    if (slider.value < 48){
        ampm.innerText = "AM";
    } else {
        ampm.innerText = "PM"
    }
    if ( slider.value < 1) {
        hour.innerText = "12"
    } else if ( slider.value >= 52) {
        hour.innerText = String(Math.floor(slider.value / 4) - 12).padStart(2, '0')
    } else {
        hour.innerText = String(Math.floor(slider.value / 4)).padStart(2, '0');
    }
  } else {
    let currentTime = new Date()
    hour.innerText = currentTime.getHours() % 12 || 12;
    minute.innerText = currentTime.getMinutes().toString().padStart(2, '0');
    ampm.innerText = (currentTime.getHours() < 12) ? "AM" : "PM";
  }

}


function setBackground() {
  if (slider.value <= 48) {
      daylight.style.backgroundColor = `rgb(99, 211, 242, ${(slider.value / 48)*1.5})`
  } else {
      daylight.style.backgroundColor = `rgb(99, 211, 242, ${((96 / slider.value)*2) - 2})`;
  }
  // console.log(daylight.style.backgroundColor)
}

function moveSun() {
    if (slider.value <= 48) {
        sun.style.bottom = `${(slider.value/96)*200 - 20}vh`;
        moon.style.top = `${(slider.value/96)*200 + 10}vh`;
    } else {
        sun.style.bottom = `${(1-slider.value/96)*200 - 20}vh`;
        moon.style.top = `${(1-slider.value/96)*200 + 10}vh`;
    }
    // console.log(sun.style.bottom, moon.style.top)
}

function setMountains() {
    if (slider.value <= 48) {
        dayMountains.style.opacity = `${(slider.value/96)*2}`;
    } else {
        dayMountains.style.opacity = `${(1-slider.value/96)*2}`;
    }
}

function setStars() {
    if (slider.value < 25 || slider.value > 72) {
        stars.style.opacity = '1';
        clock.style.color = 'white';
    } else {
        stars.style.opacity = '0';
        clock.style.color = 'black';
    }
}

function setCloud() {
    if (slider.value < 25 || slider.value > 72) {
        cloud.style.transform = 'translateX(-50vw)';
    } else {
        cloud.style.transform = 'translateX(0)';
    }
}

function handleSlider() {
    setClock();
    setBackground();
    moveSun();
    setMountains();
    setStars();
    setCloud();
}

function changeEnvOnTick() {
  let currentTime = new Date();
  // let interval = 0.5;
  let interval = (currentTime.getHours() + (currentTime.getMinutes()/60))/24;
  if (interval < 0.2) {
    daylight.style.backgroundColor = `rgb(99, 211, 242, 0)`;
    stars.style.opacity = '1';
    clock.style.color = 'white';
    sun.style.bottom = `${(interval/0.5)*100-20}vh`;
    moon.style.top = `${(interval/0.5)*100+10}vh`;
    dayMountains.style.opacity = `${interval/0.5}`;
    cloud.style.transform = 'translateX(-50vw)';
  } else if (interval < 0.4) {
    daylight.style.backgroundColor = `rgb(99, 211, 242, ${(interval-0.2)/0.2})`;
    stars.style.opacity = `${1-(interval-0.2)/0.2}`;
    clock.style.color = 'white';
    sun.style.bottom = `${(interval/0.5)*100-20}vh`;
    moon.style.top = `${(interval/0.5)*100+10}vh`;
    dayMountains.style.opacity = `${interval/0.5}`;
    cloud.style.transform = 'translateX(-50vw)';
  } else if (interval >= 0.4 && interval <= 0.6) {
    daylight.style.backgroundColor = "rgb(99, 211, 242, 1)";
    stars.style.opacity = '0';
    clock.style.color = 'black';
    sun.style.bottom = `80vh`;
    moon.style.top = `100vh`;
    cloud.style.transform = 'translateX(0)';
    if (interval <= 0.5) {
      sun.style.bottom = `${(interval/0.5)*100-20}vh`;
      moon.style.top = `${(interval/0.5)*100+20}vh`;
      dayMountains.style.opacity = `${interval/0.5}`;
    } else {
      sun.style.bottom = `${((1-interval)/0.5)*100-20}vh`;
      moon.style.top = `${((1-interval)/0.5)*100+10}vh`;
      dayMountains.style.opacity = `${(1-interval)/0.5}`;
    }
  } else if (interval < 0.8) {
    daylight.style.backgroundColor = `rgb(99, 211, 242, ${1-((interval-0.8)/0.2)})`;
    stars.style.opacity = `${(interval-0.8)/0.8}`;
    clock.style.color = 'white';
    sun.style.bottom = `${((1-interval)/0.5)*100-20}vh`;
    moon.style.top = `${((1-interval)/0.5)*100+10}vh`;
    dayMountains.style.opacity = `${(1-interval)/0.5}`;
    cloud.style.transform = 'translateX(-50vw)';
  } else {
    daylight.style.backgroundColor = `rgb(99, 211, 242, 0`;
    stars.style.opacity = '1';
    clock.style.color = 'white';
    sun.style.bottom = `${((1-interval)/0.5)*100-20}vh`;
    moon.style.top = `${((1-interval)/0.5)*100+10}vh`;
    dayMountains.style.opacity = `${(1-interval)/0.5}`;
    cloud.style.transform = 'translateX(-50vw)';
  }
}

slider.addEventListener('mousedown', () => {
    slider.addEventListener('mousemove', handleSlider)
});

function handleInterval() {
  if (!sliderMode) {
    setClock();
    changeEnvOnTick();
  }
}

let clockInterval

modeToggle.addEventListener('click', (event) => {
  event.preventDefault();
  if (sliderMode) {
    modeToggle.innerText = "Switch to Slider";
    slider.classList.add("hidden");
    sliderMode = !sliderMode
    handleInterval();
    if (!clockInterval) {
      clockInterval = setInterval(handleInterval, 1000)
    }
  } else {
    modeToggle.innerText = "Switch to Realtime";
    slider.classList.remove("hidden")
    sliderMode = !sliderMode;
    clearInterval(clockInterval)
    clockInterval = null
    handleSlider();
  }

})

