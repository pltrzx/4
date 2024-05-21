'use strict'

let currentSlideIndex = 0
const slides = [
    {
        image: 'url(./src/img/slider/slide_1.png)',
        text1: 'Летим в космос',
        text2: 'Если все получится',
        btnText: 'ЛЕТЕТЬ',
        btnHref: 'https://www.google.by',
    },
    {
        image: 'url(./src/img/slider/slide_2.jpg)',
        text1: 'Лучше останемся',
        text2: 'Тут тоже красиво',
        btnText: 'ОСТАТЬСЯ',
        btnHref: 'https://www.yandex.by',
    },
]

const slider = document.getElementById("slider")
const currentSlide = document.getElementById("current")
const nextSlide = document.getElementById("next")

const slideFirstTitle = slider.querySelector("h5")
const slideSecondTitle = slider.querySelector("h4")

const btnPrevious = document.getElementById("btn_previous")
const btnNext = document.getElementById("btn_next")
const btnHref = document.getElementById("btn_href")

btnPrevious.onclick = getPreviousSlide
btnNext.onclick = getNextSlide

let isSlideOnAnimation = false

function fillSlides() {
    currentSlide.style.backgroundImage = slides[currentSlideIndex].image
    let nextIndex = currentSlideIndex + 1
    if (nextIndex === slides.length) nextIndex = 0
    nextSlide.style.backgroundImage = slides[nextIndex].image

    slideFirstTitle.innerText = slides[currentSlideIndex].text1
    slideSecondTitle.innerText = slides[currentSlideIndex].text2
    btnHref.innerText = slides[currentSlideIndex].btnText
    btnHref.href = slides[currentSlideIndex].btnHref
}
fillSlides()

function getNextSlide() {
    if (isSlideOnAnimation) return

    isSlideOnAnimation = true
    currentSlide.classList.add('slide-transition')
    nextSlide.classList.add('slide-transition')
    currentSlide.style.transform = "translateX(-100%)"
    nextSlide.style.transform = "translateX(0%)"

    currentSlideIndex++
    if (currentSlideIndex === slides.length) currentSlideIndex = 0

    setTimeout( () => {
        currentSlide.classList.remove('slide-transition')
        nextSlide.classList.remove('slide-transition')
        currentSlide.style.transform = "translateX(0%)"
        nextSlide.style.transform = "translateX(100%)"

        fillSlides()

        isSlideOnAnimation = false
    }, 1000)
}

function getPreviousSlide() {
    if (isSlideOnAnimation) return

    isSlideOnAnimation = true
    nextSlide.style.transform = "translateX(-100%)"
    setTimeout( () => {
        currentSlide.classList.add('slide-transition')
        nextSlide.classList.add('slide-transition')
        currentSlide.style.transform = "translateX(100%)"
        nextSlide.style.transform = "translateX(0%)"

        currentSlideIndex--
        if (currentSlideIndex < 0) currentSlideIndex = slides.length - 1

        setTimeout( () => {
            currentSlide.classList.remove('slide-transition')
            nextSlide.classList.remove('slide-transition')
            currentSlide.style.transform = "translateX(0%)"
            nextSlide.style.transform = "translateX(100%)"

            fillSlides()

            isSlideOnAnimation = false
        }, 1000)
    }, 0)
}