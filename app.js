class Shorten {
    constructor (input, button) {
        this.userInput = ''
        this.input = input
        this.button = button
        this.data = null
    }

    user() {
        this.input.addEventListener('input', (e) => {
            this.userInput = e.target.value
            console.log(this.userInput)
        })
    }
    api() {
        return (
            fetch(`https://api.shrtco.de/v2/shorten?url=${this.userInput}`)
            .then((resp) => resp.json())
            .then((data) => {
                return data
            })
            .catch((error) => {
                console.log(error)
            })
        )
    }
    click() {
        this.button.addEventListener('click', (e) => {
            e.preventDefault()
                this.spinner()
            var myPromise = new Promise( (resolve, reject) => {
                resolve(this.api())
            })

            myPromise.then((data) => {
                this.data = data
                this.html()
            })
        })
    }
    html() {
        
        var result = /*html*/ `
        <div class="alert alert-light border fade show d-flex justify-content-between align-items-center mt-4" role="alert">
            <h6></h6>
            <h6 class='text-cyan-color'></h6>
            <button class='btn cyan-bg text-white px-4'>Copy</button>
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
        `

        document.querySelector('.urlResults > .container').innerHTML = result
        document.querySelector('.urlResults h6:first-child').innerText = this.data.result.original_link
        document.querySelector('.urlResults h6:nth-child(2)').innerText = this.data.result.full_short_link
        console.log(document.querySelector('.uu'))
        document.querySelector('.urlResults button:first-of-type').addEventListener('click', () => {
            navigator.clipboard.writeText(this.data.result.full_short_link)
        })

    }
    spinner() {
        document.querySelector('.urlResults > .container').innerHTML = /*html*/ `
        <div class="alert alert-light border fade show d-flex justify-content-between align-items-center mt-4" role="alert">
            <div class='w-100 d-flex justify-content-center'>
                <div class="spinner-border text-info" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
            </div>
        </div>
        `
    }
    work() {
        this.user()
        this.click()
    }
}

const shorten = new Shorten(
    document.querySelector('.shorterLink input'),
    document.querySelector('.fetchButton')
    )

shorten.work()

























var pattern = /https:\/\/[a-z | \W]*/i
var url = 'https://iomentesidis.netlify.app/'

var match = url.match(pattern)