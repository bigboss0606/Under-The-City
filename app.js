let CANVAS = document.getElementById("renderCanvas");
let ENGINE = new BABYLON.Engine(CANVAS, true, { preserveDrawingBuffer: true, stencil: true,  disableWebGL2Support: false});



let HEROS = new Heros();
function getHeros()
{
    return HEROS;
}

let ENNEMIS = [];
function setEnnemis(ennemis)
{
    ENNEMIS = ennemis;
}
function getEnnemis()
{
    return ENNEMIS;
}

let ENNEMI = null;
function setEnnemi(ennemi)
{
    ENNEMI = ennemi;
}
function getEnnemi()
{
    return ENNEMI;
}
function supprimerEnnemi()
{
    ENNEMI.detruire();
    const index = ENNEMIS.indexOf(ENNEMI);
    ENNEMIS.splice(index, 1);
}



let SCENETORENDER = null;

let MENU = new Menu();
function allerAuMenu()
{
    MENU.lancer();
    SCENETORENDER = MENU.getScene();
}
function quitterMenu()
{
    MENU.quitter();
}

let BIKINIBOTTOM = new BikiniBottom();
function allerABikiniBottom()
{
    BIKINIBOTTOM.lancer();
    SCENETORENDER = BIKINIBOTTOM.getScene();
}
function quitterBikiniBottom()
{
    BIKINIBOTTOM.quitter();
}

let COMBAT = new Combat();
function allerAuCombat()
{
    COMBAT.lancer();
    SCENETORENDER = COMBAT.getScene();
}
function quitterCombat()
{
    COMBAT.quitter();
}



allerAuMenu();
ENGINE.runRenderLoop(function () {
    SCENETORENDER.render();
});



// Resize
window.addEventListener("resize", function () {
    ENGINE.resize();
});
