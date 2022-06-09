
function addGlobalEventListener(type, selector, callback) {
    document.addEventListener(type, e => {
        if (e.target.matches(selector)) callback(e)
    })
}

addGlobalEventListener("click", 'img', e => {
    // console.log("image clicked");
    // console.log(e.target);
    // console.log(e.target.classList);

    if (e.target.classList.contains('design-icon')) {
        console.log("design clicked");
        revealElement('design');
        hideElement('code');
        hideElement('learn');
    }
    if (e.target.classList.contains('code-icon')) {
        console.log("code clicked");
        revealElement('code');
        hideElement('design');
        hideElement('learn');
    }
    if (e.target.classList.contains('lightbulb-icon')) {
        console.log("learn clicked");
        revealElement('learn');
        hideElement('design');
        hideElement('code');
    }
});

function revealElement(className) {
    obj = document.getElementsByClassName(className);
    if(obj != null) {
        if (obj[0].style.display === "" || obj[0].style.display === "none")
            obj[0].style.display = 'inline';
    }
}

function hideElement(className) {
    obj = document.getElementsByClassName(className);
    if(obj != null) {
        if (obj[0].style.display !== "" || obj[0].style.display !== "none")
            obj[0].style.display = 'none';
    }
}

console.log("test");