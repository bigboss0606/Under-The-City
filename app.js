let CANVAS = document.getElementById("renderCanvas");
let ENGINE = new BABYLON.Engine(CANVAS, true, { preserveDrawingBuffer: true, stencil: true,  disableWebGL2Support: false});

let HEROS = new Heros();
let ENNEMI = null;

let MENU = new Menu();
let BIKINIBOTTOM = new BikiniBottom();
let COMBAT = new Combat();
let SCENETORENDER = null;



function allerAuMenu()
{
    MENU.lancer();
    SCENETORENDER = MENU.getScene();
}

function quitterMenu()
{
    MENU.quitter();
}


function allerABikiniBottom()
{
    BIKINIBOTTOM.lancer();
    SCENETORENDER = BIKINIBOTTOM.getScene();
}

function quitterBikiniBottom()
{
    BIKINIBOTTOM.quitter();
}


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
