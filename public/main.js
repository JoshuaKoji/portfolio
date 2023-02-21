//modal show

projects = document.querySelectorAll(".project");
modal = document.querySelectorAll(".modal");
modal_close = document.querySelectorAll(".modal-close");
modal_close_button = document.querySelectorAll(".modal-close-button");

projects.forEach((cur_val, cur_i) => {
    cur_val.addEventListener("click", () => {
        modal[cur_i].classList.add("modal-show");//show modal

        document.querySelector("body").style.overflow = "clip"; 
        
        modal_close[cur_i].addEventListener("click", () => { //click off modal to close
            modal[cur_i].classList.remove("modal-show");
            document.querySelector("body").style.overflow = "unset"; 
        })
        
        modal_close_button[cur_i].addEventListener("click", () => { //click X on modal to close
            modal[cur_i].classList.remove("modal-show");
            document.querySelector("body").style.overflow = "unset"; 
        })
    })
})


//Intersecrtion Observer
let opt = {
    root: null,
    rootMargin: "0px 100%", //works on tablet size
    threshold: 1.0
}

let callback = (entries) => {
    entries.forEach( cur_val => {
        if (cur_val.isIntersecting == true && cur_val.target.classList.contains("left")) {
            cur_val.target.classList.add("left-animate");
            cur_val.target.style.opacity = 1
        }
        if (cur_val.isIntersecting == true && cur_val.target.classList.contains("right")) {
            cur_val.target.classList.add("right-animate");
            cur_val.target.style.opacity = 1
        }
    })
}

let observer = new IntersectionObserver(callback, opt);

let targets = document.querySelectorAll(".left, .right");


Array.from(targets).forEach( cur_val => {
    
    observer.observe(cur_val);
})
