document.addEventListener('DOMContentLoaded', () => {

    // Get all "navbar-burger" elements
    const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);

    // Add a click event on each of them
    $navbarBurgers.forEach(el => {
        el.addEventListener('click', () => {

            // Get the target from the "data-target" attribute
            const target = el.dataset.target;
            const $target = document.getElementById(target);

            // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
            el.classList.toggle('is-active');
            $target.classList.toggle('is-active');

        });
    });

});

const invalidUrl = document.querySelector('.invalidUrl');

form.onsubmit = e => {
    e.preventDefault()

    const url = e.target[0].value;

    if (url === "") {
        invalidUrl.style.display = 'block'
        urlInput.setAttribute('class', 'invalid')
    }

    if (url.includes('https://www.')) {
        invalidUrl.textContent = 'Correct url'
        invalidUrl.style.display = 'block'
    } else {
        invalidUrl.style.display = 'block'
        urlInput.setAttribute('class', 'invalid');
    }
}

urlInput.onkeydown = e => {
    const value = e.target.value

    if (value.includes('https://ww')) {
        urlInput.setAttribute('class', 'valid');
        invalidUrl.style.display = 'none'
    }
}

const scrollUp = (x, y) => {
    window.scroll({
        top: y,
        behavior: 'smooth'
    })
}

const copyButtons = document.getElementsByClassName('copyButton')

for (let i = 0; i < copyButtons.length; i++) {
    copyButtons[i].onclick = (e) => {
        // console.log(e.target.id)
        const urlToCopy = e.target.id
        const textToCopy = document.getElementById('link');

        let seleccion = document.createRange();
        seleccion.selectNodeContents(textToCopy);
        window.getSelection().removeAllRanges();
        window.getSelection().addRange(seleccion);
        let res = document.execCommand('copy');
        window.getSelection().removeRange(seleccion);
    }
}


