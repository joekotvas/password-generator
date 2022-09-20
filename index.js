const ui = {
    button: document.getElementById('generate-password'),
    output: document.getElementById('password-output'),
    noOptionsMsg: 'Select at least one option.',
    options: ['uppercase', 'lowercase', 'numbers', 'symbols', 'length'],
    config: {},
    lengthReadout: document.getElementById('length-readout')
}

for (const option of ui.options) {
    ui.config[option] = document.getElementById(option)
    ui.config[option].addEventListener('change', function() {
        generatePassword()
    })
}

const characters = {
    uppercase: ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"],
    lowercase: ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"],
    numbers: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
    symbols: ["~","`","!","@","#","$","%","^","&","*","(",")","_","-","+","=","{","[","}","]",",","|",":",";","<",">",".","?","/"],
    active: []
}

characters.setup = function() {
    characters.active = []
    for (const option of ui.options) if (ui.config[option].checked) characters.active = characters.active.concat(characters[option])
}

const charactersBak = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9","~","`","!","@","#","$","%","^","&","*","(",")","_","-","+","=","{","[","}","]",",","|",":",";","<",">",".","?",
"/"]

const getRandomInt = (min, max) => Math.floor(Math.random()*(max-min)) + 1

function createPassword(length, numbers, symbols) {
    let password = ''
    for (let i = 0; i < length; i++) {
        password += characters.active[getRandomInt(0, characters.active.length - 1)]
    }
    return password
}

function temporaryHighlight(el) {
    el.classList.add('copying')
    setTimeout(function() {
        el.classList.remove('copying')
    }, 500)
}

function disableButtons() {
    ui.output.classList.add('disabled')
    ui.button.disabled = true
}

function enableButtons() {
    ui.output.classList.remove('disabled')
    ui.button.disabled = false
}

function generatePassword() {
    characters.setup()
    console.log(characters.active)
    if (characters.active.length > 0) {
        ui.output.textContent = createPassword(ui.config.length.value, numbers = true, symbols = true)
        enableButtons()
    } else {
        disableButtons()
        ui.output.textContent = ui.noOptionsMsg
    }
}

ui.button.addEventListener('click', function() {
    generatePassword()
})

ui.output.addEventListener('click', function() {
    if (!this.classList.contains('disabled')) {
        navigator.clipboard.writeText(this.value)
        temporaryHighlight(this)
    }
})

ui.config.length.addEventListener('change', function() {
    ui.lengthReadout.textContent = this.value
})

generatePassword()