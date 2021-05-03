// Fonction ajouter()

// function add() {
//     alert("Ajout réalisé")
// }

const form = document.querySelector("#f")
const add = document.querySelector("#add")
const del = document.querySelector("#del")
const table = document.querySelector("table")

const tabElements = ["user_firstname", "user_name", "user_email", "statut"]

function makeNotUsable(button, yesOrNo) {
    if (yesOrNo) {
        button.classList.toggle("disabled")
        button.style.backgroundColor = "grey"

        let timeLeft = 10 // en secondes
        let buttonValue = button.getAttribute("value")

        button.setAttribute("value", buttonValue + "(" + timeLeft + ")")

        let interval = setInterval(() => {
            timeLeft--

            button.setAttribute("value", buttonValue + "(" + timeLeft + ")")

            if (timeLeft === 0) {
                clearInterval(interval)
                button.setAttribute("value", buttonValue)
            }
        }, 1000)

        setTimeout(() => {
            makeNotUsable(button, false)
        }, 10000)
    }

    else {
        button.classList.toggle("disabled")
        button.style.backgroundColor = "lightcyan"
    }
}

makeNotUsable(add, true) // Au chargement de la page, on rend le bouton inutilisable
makeNotUsable(del, true)

add.onclick = (event) => {

    if (add.classList.contains("disabled")) {
        alert("Attend un peu mon ami")
        event.preventDefault() //Pour pas que la page se recharge
        return
    }

    // window.alert("Ajout réalisé de " + form.elements["user_name"].value +
    //     " " +
    //     form.elements["user_firstname"].value)
    if(!form.checkValidity()) {
        alert("Le formulaire n'est pas valide, veuillez compléter tous les champs !")
        return;
    }

    let newTr = document.createElement("tr")

    tabElements.forEach((element) => {
        let newTd = document.createElement("td")
        newTd.textContent = form.elements[element].value
        newTr.appendChild(newTd)
    })

    event.preventDefault() //Pour pas que la page se recharge
    table.appendChild(newTr)

    makeNotUsable(add, true)
    makeNotUsable(del, true)
}

del.onclick = (event) => {

    if (del.classList.contains("disabled")) {
        alert("Attend un peu mon ami");
        event.preventDefault() //Pour pas que la page se recharge
        return;
    }

    if (table.rows.length === 1) {
        alert("Le tableau est vide, difficile d'y supprimer des éléments...")
        event.preventDefault() //Pour pas que la page se recharge
        return;
    }

    while(table.rows.length > 1) {
        table.deleteRow(1)
    }

    console.log(table)

    makeNotUsable(add, true)
    makeNotUsable(del, true)
}



