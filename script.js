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

    const linksContainer = document.getElementById('shortenedLinks');
    const getSavedUrl = JSON.parse(localStorage.getItem('oldAndNewUrl'));
    const linksToShow = getSavedUrl !== null ? getSavedUrl : [];

    console.log(getSavedUrl)

    const showLinks = () => {
        linksContainer.innerHTML = '';
        linksToShow.forEach(l => {
            linksContainer.innerHTML += `
                
                <div class="link">
                        <p class="linkItroduced">${l.old}</p>
    
                        <hr class="divisionLink">
    
                        <div class="shortenedLink">
                            <p>${l.new}</p>
    
                            <button id="${l.new}" class="copyButton">Copy</button>
                        </div>
                    </div>
                    `
        })
    }

    showLinks()

    const shortenUrl = (url) => {
        axios.get(`https://api.shrtco.de/v2/shorten?url=${url}`)
            .then(resp => {
                const newLink = resp.data.result.full_short_link2;
                const id = resp.data.result.code;
                const oldAndNewUrl = { id, old: url, new: newLink };

                const getLocalStorage = JSON.parse(localStorage.getItem('oldAndNewUrl'));

                if (getLocalStorage !== null) {
                    getLocalStorage.unshift(oldAndNewUrl)
                    localStorage.setItem('oldAndNewUrl', JSON.stringify(getLocalStorage));
                } else {
                    localStorage.setItem('oldAndNewUrl', JSON.stringify([oldAndNewUrl]));
                }

                window.location.reload()

            })
    }

    const invalidUrl = document.querySelector('.invalidUrl');

    form.onsubmit = e => {
        e.preventDefault()

        const url = e.target[0].value;

        if (url === "") {
            invalidUrl.style.display = 'block'
            urlInput.setAttribute('class', 'invalid')
        }

        if (url.includes('https://')) {
            shortenUrl(url)
            invalidUrl.style.display = 'none'

        } else {
            invalidUrl.style.display = 'block'
            urlInput.setAttribute('class', 'invalid');
        }
    }

    urlInput.onkeydown = e => {
        const value = e.target.value

        if (value.includes('https://')) {
            urlInput.setAttribute('class', 'valid');
            invalidUrl.style.display = 'none'
        }
    }

    const copyButtons = document.getElementsByClassName('copyButton')

    for (let i = 0; i < copyButtons.length; i++) {
        copyButtons[i].onclick = (e) => {
            copyButtons[i].textContent = 'Copied!'
            copyButtons[i].style.backgroundColor = 'hsl(257, 27%, 26%)'
            setTimeout(() => {
                copyButtons[i].textContent = 'Copy'
                copyButtons[i].style.backgroundColor = 'hsl(180, 66%, 49%)'
            }, 3000)
            
            const urlToCopy = e.path[1].childNodes[1]

            let selection = document.createRange();
            selection.selectNodeContents(urlToCopy);
            window.getSelection().removeAllRanges();
            window.getSelection().addRange(selection);
            let res = document.execCommand('copy');
            window.getSelection().removeRange(selection);
        }
    }

});

const scrollUp = (x, y) => {
    window.scroll(x, y)
}