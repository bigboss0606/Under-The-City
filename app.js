let CANVAS = document.getElementById("renderCanvas");
let ENGINE = new BABYLON.Engine(CANVAS, true, { preserveDrawingBuffer: true, stencil: true,  disableWebGL2Support: false});

let menuPrincipal = new MenuPrincipal();
let maison = new Maison();
let guitarHero = new GuitarHero();
let pendu = new Pendu();
let burgerWar = new BurgerWar();
let spongebobRace = new SpongebobRace();
let jeuActif = null;


function aller(dest)
{
    jeuActif.arreter();

    switch(dest)
    {
        case "menu principal":
            jeuActif = menuPrincipal;
            break;

        case "maison":
            jeuActif = maison;
            break;
        
        case "guitar hero":
            jeuActif = guitarHero;
            break;
    
        case "pendu":
            jeuActif = pendu;
            break;

        case "burger war":
            jeuActif = burgerWar;
            break;

        case "spongebob race":
            jeuActif = spongebobRace;
            break;

        default:
            throw new Error("destination inconnue");
            break;
    }
    if (jeuActif.estPret)
    {
        jeuActif.lancer();
    }
    else
    {
        alert("jeu en cours de chargement");
        jeuActif.lancer();
    }
}


function joueurAGagne()
{
    maison.gagner();
}

function joueurAPerdu()
{
    maison.perdre();
}


jeuActif = menuPrincipal;
jeuActif.lancer();

ENGINE.runRenderLoop(() => {jeuActif.getScene().render()});
window.addEventListener("resize", () => {ENGINE.resize()});