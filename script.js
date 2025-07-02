const menuBtn = document.querySelector('.logo-wrapper button')
const closeBtn = document.querySelector('.close-btn')
const screent = document.querySelector('.container')

const previousBtn = document.querySelector('.previous')
const nextBtn = document.querySelector('.next')
const headerImg = document.querySelector('.product-wrapper')

menuBtn.addEventListener('click', () => {
    screent.classList.add('menu-open')
})

closeBtn.addEventListener('click', () => {
    screent.classList.remove('menu-open')
})

screent.addEventListener('click', (e) => {
    e.target.classList.remove('menu-open')
})

// img slide

let currentPosition = 0
const step = 100
const totalSldie = 4

function updatePosition() {
    headerImg.style.transform = `translateX(${currentPosition}%)`
}

previousBtn.addEventListener('click', () => {
    currentPosition = Math.min(0, currentPosition + step)
    updatePosition()
})

nextBtn.addEventListener('click', () => {
    currentPosition = Math.max(-step*(totalSldie - 1), currentPosition - step)
    updatePosition()
})