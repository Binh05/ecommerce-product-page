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

// cart button 

const cartBtn = document.querySelector('.cart')
const cartBox = document.querySelector('.cart-container')

cartBtn.addEventListener('click', () => {
    cartBox.classList.toggle('active')
})

// quantity product

const numProduct = document.querySelector('.quantity p')
let currentNum = Number(numProduct.textContent)

const minusBtn = document.querySelector('.minus')
const plusBtn = document.querySelector('.plus')

const changeNum = (num) => {
    currentNum = Math.max(currentNum + num, 0)
    numProduct.textContent = currentNum
}

minusBtn.addEventListener('click', () => {
    changeNum(-1)
})

plusBtn.addEventListener('click', () => {
    changeNum(1)
})

// add product to cart

const addBtn = document.querySelector('.add-cart')
const cartItems = document.querySelector('.cart-items')
const emptyText = document.querySelector('.empty')
console.log(emptyText)
addBtn.addEventListener('click', () => {
    if (currentNum === 0) return
    const price = document.querySelector('.price-sale h2').textContent.replace('$', '')
    emptyText.classList.add('hide')
    cartItems.innerHTML += `<div class="product-item">
            <div class="cart-product">
            <div class="info-product">
                <img src="./images/image-product-1-thumbnail.jpg" alt="product 1 thumbnail">
                <div class="name-price">
                <p>Fall Limited Edition Sneakers</p>
                <p>$${price} x <span id="num">${currentNum}</span> <span id="total-price">$${(currentNum*Number(price)).toFixed(2)}</span></p>
                </div>
            </div>
            <button type="button" class="delete">
                <img src="./images/icon-delete.svg" alt="trash to delete product cart" class="trash">
            </button>
            </div>
            <button class="checkout" type="button">Checkout</button>
        </div>`
    
    console.log(emptyText)
    currentNum = 0;
    numProduct.textContent = currentNum
})