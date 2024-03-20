"use strict"


const app = {
    markers: null,
    themes: ["Day", "Night", "Sepia", "Twilight", "Console"],
    theme: "Twilight",
    fonts: ["Arial", "Helvetica", "Georgia", "Verdana"],
    font: "Arial",
    sizes: ["xx-small", "x-small", "small", "medium", "large", "x-large", "xx-large", "xxx-large"],
    size: "x-large"
}

init()


function init() {

    load_content("./pg2701.txt")

    document.addEventListener("scrollend", onscrollend)
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

    document.body.classList.add(app.theme)
}


function load_content(url) {
    fetch(url)
    .then((response) => {
        return response.text()
    })
    .then(text => {
        // const sep = "\r\n"  // windows
        const sep = "\n"    // linux

        text = text.replaceAll(sep+sep, rep_gap)
        text = "<span>" + text.replaceAll(sep, rep_newline) + "</span>"

        document.querySelector("#content").innerHTML = `${text}`

        app.markers = document.querySelectorAll("span")
    })
}


function rep_newline(match, offset, text) {
    return `</span> <span id="o${offset}">`
}


function rep_gap(match, offset, text) {
    return `</span><br><br><span id="b${offset}">`
}


function onscrollend(evt) {

    const res2 = find2()
    console.log(res2)

    let percent = (document.documentElement.scrollTop + res2.top + document.documentElement.clientHeight / 2) / document.documentElement.scrollHeight
    percent = (percent * 100).toFixed(1)
    console.log(percent)
}


function theme_onchange(evt) {

    const theme = evt.target.value
    document.body.classList.remove(app.theme)
    document.body.classList.add(theme)
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

    const settings_elem = document.querySelector("#settings")
    const ham_elem = document.querySelector("#hamburger")

    if(settings_elem.classList.contains("active") === true) {
        settings_elem.classList.remove("active")
        ham_elem.innerHTML = ">"
    }
    else {
        settings_elem.classList.add("active")
        ham_elem.innerHTML = "<"
    }
}


function find1() {
    
    let ite = 0
    for(const elem of app.markers) {
        const bbox = elem.getBoundingClientRect()
        if(bbox.top > 0) {
            return { ite: ite, id: elem.id, top: bbox.top, text: elem.innerHTML }
        }
        ite++
    }    
}


function find2() {
    
    const value = 0
    let ite = 0

    if(app.markers[0].getBoundingClientRect().top > value) {
        const elem = app.markers[0]
        return { ite: ite, id: elem.id, top: elem.getBoundingClientRect().top, text: elem.innerHTML }
    }

    if(app.markers[app.markers.length - 1] < value) {
        const elem = app.markers[app.markers.length - 1]
        return { ite: ite, id: elem.id, top: elem.getBoundingClientRect().top, text: elem.innerHTML }
    }

    let lo = 0
    let hi = app.markers.length - 1

    while (lo <= hi) {
        
        const mid = Math.floor((hi + lo) / 2)
        const mid_val = app.markers[mid].getBoundingClientRect().top 

        if (mid_val > value) {
            hi = mid - 1
        } 
        else if (mid_val < value) {
            lo = mid + 1
        } 
        else {
            // exact match
            const elem = app.markers[mid]
            return { ite: ite, id: elem.id, top: mid_val, text: elem.innerHTML }
        }
        ite++
    }
    
    let elem = app.markers[lo]
    return { ite: ite, id: elem.id, top: elem.getBoundingClientRect().top, text: elem.innerHTML }
}

