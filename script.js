const menuBtn = document.querySelector('.logo-wrapper button')
const closeBtn = document.querySelector('.close-btn')
const screent = document.querySelector('.container')

function initSlider(root) {
    const wrapperImg = root.querySelector('.product-wrapper')
    const next = root.querySelector('.next')
    const prev = root.querySelector('.previous')
    const thumbnails = root.querySelector('.thumbnails')

    let currentIndex = 0
    const step = 100
    const totalSlide = wrapperImg.querySelectorAll('img').length 
    console.log(totalSlide)

    const UpdateSlide = () => {
        wrapperImg.style.transform = `translateX(-${step * currentIndex}%)`

        const buttons = thumbnails.querySelectorAll('.thumbnail')
        buttons.forEach(btn => btn.classList.remove('select'))
        if (buttons[currentIndex]) buttons[currentIndex].classList.add('select')
    }

    prev?.addEventListener('click', () => {
        currentIndex = Math.max(0, currentIndex - 1)
        console.log(currentIndex)
        UpdateSlide()
    })

    next?.addEventListener('click', () => {
        currentIndex = Math.min(totalSlide - 1, currentIndex + 1)
        console.log(currentIndex)
        UpdateSlide()
    })

    thumbnails?.addEventListener('click', (e) => {
        thumbnailTarget = e.target.closest('button.thumbnail')
        if (!thumbnailTarget) return
        currentIndex = Number(thumbnailTarget.value)
        UpdateSlide()
    })

    UpdateSlide()
}

document.addEventListener('DOMContentLoaded', () => {
    initSlider(document)
})

// open light box

const headerImg = document.querySelector('.product-wrapper')

headerImg.addEventListener('click', () => {

    if (window.innerWidth < 768) return;

    const imgProduct = document.querySelector('.content-header')

    const closeLbBtn = document.createElement('button')
    closeLbBtn.innerHTML = '&times'
    closeLbBtn.classList.add('close-light-box')

    closeLbBtn.addEventListener('click', () => {
        clone.remove()
        document.body.classList.remove('light-box-open')
        initSlider(document)
    })

    const clone = imgProduct.cloneNode(true)
    clone.classList.remove('content-header')
    clone.classList.add('light-box')

    clone.prepend(closeLbBtn)

    document.body.classList.add('light-box-open')
    document.body.prepend(clone)

    initSlider(clone)
})

// Menu nav

menuBtn.addEventListener('click', () => {
    screent.classList.add('menu-open')
})

closeBtn.addEventListener('click', () => {
    screent.classList.remove('menu-open')
})

screent.addEventListener('click', (e) => {
    e.target.classList.remove('menu-open')
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
const emptyText = document.querySelector('.cart-items .empty')

const createProductItem = (product) => {
    const productItem = document.createElement('div')
    productItem.classList.add('product-item')

    productItem.innerHTML = `<div class="cart-product">
            <div class="info-product">
                <img src="./images/image-product-1-thumbnail.jpg" alt="product 1 thumbnail">
                <div class="name-price">
                <p>Fall Limited Edition Sneakers</p>
                <p>$${product.price} x <span id="num">${product.quantity}</span> <span id="total-price">$${(product.quantity*Number(product.price)).toFixed(2)}</span></p>
                </div>
            </div>
            <button type="button" class="delete">
                <img src="./images/icon-delete.svg" alt="trash to delete product cart" class="trash">
            </button>
            </div>
            <button class="checkout" type="button">Checkout</button>`
    return productItem
}

addBtn.addEventListener('click', () => {
    if (currentNum === 0) return

    const price = document.querySelector('.price-sale h2').textContent.replace('$', '')
    emptyText.classList.add('hide')
    cartItems.append(createProductItem({price: Number(price), quantity: currentNum}))
    
    updateQuantityProduct(currentNum)

    currentNum = 0;
    numProduct.textContent = currentNum
})

// quantity product
const quantityProductEL = document.querySelector('.quantity-product')
let quantityProduct = 0

function updateQuantityProduct(quantity) {
    quantityProduct += quantity
    quantityProductEL.textContent = quantityProduct
    quantityProductEL.classList.remove('hide')
    if (quantityProduct === 0) quantityProductEL.classList.add('hide')
}

// delete product item cart

cartItems.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete') || e.target.classList.contains('trash')) {

        const productItem = e.target.closest('.product-item')

        updateQuantityProduct(-1 * Number(productItem.querySelector('#num').textContent))

        if (productItem) {
            productItem.remove()

            if (cartItems.querySelectorAll('.product-item').length === 0) {
                emptyText.classList.remove('hide')
            }
        }

    }
})