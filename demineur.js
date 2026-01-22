let grilleElement = document.createElement("div")
grilleElement.id = "grille"
document.body.appendChild(grilleElement)

// let tableau = [
//     0,1,1,1,0,0,0,0,0,0,
//     0,1,9,1,0,0,0,0,0,0,
//     0,1,1,1,0,1,1,1,0,0,
//     0,0,0,0,0,1,9,1,0,0,
//     0,0,0,0,0,1,1,1,0,0,
//     0,1,1,1,0,0,0,0,0,0,
//     0,1,9,1,0,0,1,1,1,0,
//     0,1,1,1,0,0,1,9,1,0,
//     1,1,0,0,0,0,1,1,1,0,
//     9,1,0,0,0,0,0,0,0,0,
// ]

let size = 10
let total = 100
let tableau = Array(total).fill(0)
let mines = 10

for(let i=0;i<mines;i++){
    let index = Math.floor(Math.random() * total)
    if(tableau[index]!==9){
        tableau[index]=9
    }else{i--}
}

console.log(tableau)

for(let i=0;i<total;i++){
    // si c'est déjà une mine on continue
    if(tableau[i]==9)continue

    // sinon on initialise un compteur à 0
    let compteur = 0

    // on calcule un x et un y pour la case correspondante à i
    let x = Math.floor(i / size) //coordonnée x de la case entre 0 et 9
    let y = i % size //coordonnée y de la case entre 0 et 9

    // on va boucler sur les cases voisines dans le sens horizontal (|-1|0|+1|)
    for(let h=-1;h<=1;h++){
        // on va boucler dans le sens vertical aussi
        for(let v=-1;v<=1;v++){
            // si on teste la cse en cours et non pas une de ses voisines, on ne fait rien (continue)
            if(h==0 && v==0)continue

            // on calcule les coordonnées xc et yc de la case voisine à tester
            let xc = x + h //coordonée x de la case voisine
            let yc = y + v //coordonée y de la case voisine

            // si les coordonnées ne dépassent pas la taille de la grille
            if(xc >=0 && xc < size && yc >=0 && yc < size){
                // on récupère la valeur correspondante de la case voisine dans tableau et on vérifie si'est 9. Dans ce cas on incrément compteur
                if(tableau[xc*size+yc]==9)compteur++
            }
        }
    }
    // on donne la valeur de compteur à la case testée.
    tableau[i]=compteur
}


for(let [index, value] of tableau.entries()){
    let buttonElement = document.createElement("button")
    buttonElement.id=index
    buttonElement.addEventListener('click', handleClick)
    grilleElement.appendChild(buttonElement)
}

function handleClick(e){
    let result = tableau[e.target.id]
    if(result<9 && result>0){
        e.target.innerText = result
        e.target.disabled = true
        e.target.classList.add(`case${result}`)
    }else if(result == 0){
        e.target.disabled = true
    }else{
        for(let i=0;i<total;i++){
            button = document.getElementById(i)
            button.disabled=true
            if(tableau[i]>0 && tableau[i]<9){
                button.innerText=tableau[i]
                button.classList.add(`case${i}`)
                button.disabled=true
            }else if(tableau[i]==0){
                button.disabled=true
            }else{
                button.innerHTML = `<i class="bi bi-brightness-high-fill"></i>`
                button.classList.add(`case5`)
                button.disabled=true
            }
        }
        e.target.innerHTML = `<i class="bi bi-brightness-high-fill"></i>`
        e.target.disabled = true
        alert("perdu")
    }

    let elements = document.querySelectorAll("[disabled]")
    console.log(elements.length)
}

