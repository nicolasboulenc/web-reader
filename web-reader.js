"use strict"


const app = {
    lines: null,
    themes: ["Day", "Night", "Sepia", "Twilight", "Console"],
    theme: "Twilight",
    fonts: ["Arial", "Helvetica", "Georgia", "Verdana"],
    font: "Arial",
    sizes: ["xx-small", "x-small", "small", "medium", "large", "x-large", "xx-large", "xxx-large"],
    size: "medium"
}

init()


async function init() {

    document.addEventListener("scrollend", onscrollend)
    document.querySelector("#content").classList.add(app.theme)

    document.querySelector("#hamburger").addEventListener("click", ham_onclick)



    const theme_elem = document.querySelector("#color-theme")
    theme_elem.addEventListener("change", theme_onchange)
    for(const theme of app.themes) {
        const option = document.createElement("option")
        option.selected = (theme === app.theme) 
        option.value = theme
        option.innerHTML = theme
        theme_elem.appendChild(option)
    }

    const font_elem = document.querySelector("#font-familiy")
    font_elem.addEventListener("change", font_onchange)
    for(const font of app.fonts) {
        const option = document.createElement("option")
        option.selected = (font === app.font) 
        option.value = font
        option.innerHTML = font
        font_elem.appendChild(option)
    }

    const size_elem = document.querySelector("#font-size")
    size_elem.addEventListener("change", size_onchange)
    for(const size of app.sizes) {
        const option = document.createElement("option")
        option.selected = (size === app.size) 
        option.value = size
        option.innerHTML = size
        size_elem.appendChild(option)
    }



    const response = await fetch("./pg2701.txt")
    let text = await response.text()

    text = text.replaceAll("\r\n\r\n", rep_gap)
    text = "<span>" + text.replaceAll("\r\n", rep_newline) + "</span>"

    document.querySelector("#content").innerHTML = `${text}`
    
    app.lines = document.querySelectorAll("span")
}


function rep_newline(match, offset, text) {
    return `</span> <span id="o${offset}">`
}


function rep_gap(match, offset, text) {
    return `</span><br><br><span id="b${offset}">`
}


function onscrollend(evt) {

    const res = find1()
    console.log(res)
}


function theme_onchange(evt) {

    const theme = evt.target.value
    const content = document.querySelector("#content")
    content.classList.remove(app.theme)
    content.classList.add(theme)
    app.theme = theme
}


function font_onchange(evt) {

    const font = evt.target.value
    const content = document.querySelector("#content")
    content.classList.remove(app.font)
    content.classList.add(font)
    app.font = font
}

function size_onchange(evt) {

    const size = evt.target.value
    const content = document.querySelector("#content")
    content.classList.remove(app.size)
    content.classList.add(size)
    app.size = size
}

function ham_onclick(evt) {
    document.querySelector("#settings").classList.add("active")
}


function find1() {
    
    let ite = 0
    for(const elem of app.lines) {
        const bbox = elem.getBoundingClientRect()
        if(bbox.top > 0) {
            return { ite: ite, id: elem.id, text: elem.innerHTML }
        }
        ite++
    }    
}


function find2() {
    
    let ite = 0
    let i = elems.length
    let bbox = { top: -1 }

    while(bbox.top < 0) {
        const bbox = elem.getBoundingClientRect()
        if(bbox.top > 0) {
            return { ite: ite, id: elem.id, text: elem.innerHTML }
        }
        ite++
    }    
}