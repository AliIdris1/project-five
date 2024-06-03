// check
let maincolor = localStorage.getItem("color_option")

if (maincolor !== null){
    document.documentElement.style.setProperty("--main--color",maincolor)
    
    document.querySelectorAll(".colors-list li").forEach(ele => {
        ele.classList.remove("active")
        

        if(ele.dataset.color === maincolor){
            ele.classList.add("active")
        }

        
    })
}

let backgroundOption = true

let backgroundInterval;


// check 
let backgroundLocalItem = localStorage.getItem("background_option")

if(backgroundLocalItem !== null){

    if(backgroundLocalItem === `true`){
        document.querySelector(".random-background .yes").classList.add("active")
        backgroundOption = true
        
    } else{
        document.querySelector(".random-background .no").classList.add("active")
        backgroundOption = false
    }

    document.querySelectorAll(".random-background span").forEach(ele => {
        ele.classList.remove("active")     
    }) 
    
    
    if(backgroundLocalItem === `true`){
        document.querySelector(".random-background .yes").classList.add("active")
    } else{
        document.querySelector(".random-background .no").classList.add("active")
        
    }
    
    
    
    
}


// start toggle 
document.querySelector(".toggle-setting i").onclick = function() {
    this.classList.toggle("fa-spin")
    document.querySelector(".settings-box").classList.toggle("open")
}

// end toggle 

// switch colors 
const colorsli = document.querySelectorAll(".colors-list li")

colorsli.forEach(li => {
    li.addEventListener("click", (e) => {
        document.documentElement.style.setProperty("--main--color",e.target.dataset.color)
        
        localStorage.setItem("color_option", e.target.dataset.color)
        
        handelActive(e)
        
    })
})
// switch random background option 
const ynspan = document.querySelectorAll(".random-background span")

ynspan.forEach(sp => {
    sp.addEventListener("click", (e) => {
        handelActive(e)

        
        
        
        if(e.target.dataset.background === `yes`){
            
            backgroundOption = true
            randomizer()
            localStorage.setItem("background_option", true)
        }else{
            backgroundOption = false
            clearInterval(backgroundInterval)
            localStorage.setItem("background_option", false)
        }
        
    })
})

// start landig page

let landinpage = document.querySelector(".landing-page")

let landigImages = ["landig1.jpg", "landig2.jpg", "landig3.jpg", "landig4.jpg", "landig5.jpg"]





function randomizer(){
    
    
    if (backgroundOption === true){
        backgroundInterval =   setInterval(() => {
            let randomN = Math.floor(Math.random() * landigImages.length)
            
            landinpage.style.backgroundImage = `url("imgs/` + landigImages[randomN] +`")`
    
        }, 1000);

    }
    

    
    
}
randomizer()


// skill scrole

let ourskills = document.querySelector(".skills")


window.onscroll = function(){
    
    
    
    if(this.scrollY >= 413){

        let spans = document.querySelectorAll(".skill-box .skill-progress span")
        
        spans.forEach(skill => {
            skill.style.width = skill.dataset.progress
        })
    }
    

    
}



// end landig page

//create Popup With the image

let ourGallery = document.querySelectorAll(".gallery img")

ourGallery.forEach(img => {
    
    img.addEventListener("click", (e) =>{
        
        //craete overlay element
        let overlay = document.createElement("div")
        
        overlay.className = "poppup-overlay"

        document.body.appendChild(overlay)
        
        //create the popup
        
        let popupbox = document.createElement("div")
        
        popupbox.className = "poppup-box"
        
        if(img.alt !== null){

            let imgHeading = document.createElement("h3")

            let mgtext = document.createTextNode(img.alt)

            imgHeading.appendChild(mgtext)
            
            popupbox.appendChild(imgHeading)
        }

        //create the image
        
        let popupimage = document.createElement("img")
        
        popupimage.src = img.src
        
        
        
        popupbox.appendChild(popupimage)
        document.body.appendChild(popupbox)
        
        
        
        //craete closec span 
        
        let closespan = document.createElement("span")

        let Xtext = document.createTextNode("X")
        
        closespan.appendChild(Xtext)
        
        closespan.className = "close-span"
        
        popupbox.appendChild(closespan)
        
    })
})

//close popup
document.addEventListener("click", function(e){
    
    if(e.target.className === "close-span"){
        e.target.parentElement.remove()

        document.querySelector(".poppup-overlay").remove()
    }
})

//Bullets

let allBullets = document.querySelectorAll(".nav-bullets .bullets")

let alllinks = document.querySelectorAll(".links a")


function scrolltosomewhere(element){
    element.forEach(link => {
        link.addEventListener("click", (e) => {
            
            e.preventDefault()
            
            document.querySelector(e.target.dataset.section).scrollIntoView({
                behavior: `smooth`
            })
        })
    })
}

scrolltosomewhere(alllinks)
scrolltosomewhere(allBullets)



//Handle Active State
function handelActive(ev){
    ev.target.parentElement.querySelectorAll(".active").forEach(ele => {
        ele.classList.remove("active")
    })
    ev.target.classList.add("active")
}


//show option

let bulletsspan = document.querySelectorAll(".bullets-option span")

let blletscontainer = document.querySelector(".nav-bullets")

let bulletLocalItem = localStorage.getItem("bullets_option")

if(bulletLocalItem !==null){
    
    bulletsspan.forEach(sp => {
        sp.classList.remove("active")
    })
    
    
    
    
    if(bulletLocalItem === "show"){
        blletscontainer.style.display = "block"
        document.querySelector(".bullets-option .yes").classList.add("active")
    } else{
        blletscontainer.style.display = "none"
        document.querySelector(".bullets-option .no").classList.add("active")
    }
}

bulletsspan.forEach(sp => {
    sp.addEventListener("click" , (e) => {
        
        if(e.target.dataset.display === "show"){
            blletscontainer.style.display = "block"
            
            localStorage.setItem("bullets_option", e.target.dataset.display)
        } else{
            blletscontainer.style.display = "none"

            localStorage.setItem("bullets_option", e.target.dataset.display)
        }
        
        

        
        
        handelActive(e)
    })
})


//Reset Button

document.querySelector(".reset-option").onclick = function(){
    
    localStorage.removeItem("bullets_option")    
    localStorage.removeItem("background_option")    
    localStorage.removeItem("color_option")    
    window.location.reload()
}

//Toggle Menu

let togglebtn = document.querySelector(".toggle-menu")
let tLinks = document.querySelector(".links")


togglebtn.onclick = function(e){
    e.stopPropagation()
    this.classList.toggle("menu-active")
    
    tLinks.classList.toggle("open")
}

document.addEventListener("click", (e) =>{
    if(e.target !== togglebtn && e.target !== tLinks){
        if(tLinks.classList.contains("open")){
            togglebtn.classList.toggle("menu-active")
            tLinks.classList.toggle("open")
        }
        
    }
})

tLinks.onclick = function(e){
    e.stopPropagation()
    
}

let Up = document.querySelector(".up")

window.onscroll = () => {
    if(this.scrollY >= 1000) {
        Up.classList.add("show")
    } else {
        Up.classList.remove("show")
    }
}

Up.onclick = () => {
    window.scrollTo({
        behavior:"smooth",
        top:0,
    })
}
