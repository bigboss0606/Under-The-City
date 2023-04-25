let CANVAS = document.getElementById("renderCanvas");
let ENGINE = new BABYLON.Engine(CANVAS, true, { preserveDrawingBuffer: true, stencil: true,  disableWebGL2Support: false});

let MENU = new Menu();
let BIKINIBOTTOM = new BikiniBottom();
let COMBAT = new Combat();

let SCENETORENDER = null;

let MUSIQUE = new Musique();



function quitterMenu()
{
    MENU.cacherUI();
}

function allerAuMenu()
{
    MENU.montrerUI();
    MUSIQUE.lanceLaMusique("relaxing.mp3", MENU.getScene());
    SCENETORENDER = MENU.getScene();
}


function quitterBikiniBottom()
{

}

function allerABikiniBottom()
{
    MUSIQUE.lanceLaMusique("whopper-whopper.mp3", BIKINIBOTTOM.getScene());
    SCENETORENDER = BIKINIBOTTOM.getScene();;
}


function quitterCombat()
{

}

function allerAuCombat(ennemi)
{
    MUSIQUE.lanceLaMusique("coniferous-forest.mp3", COMBAT.getScene());
    COMBAT.lancer();
    SCENETORENDER = COMBAT.getScene();
}


allerAuMenu();
ENGINE.runRenderLoop(function () {
    SCENETORENDER.render();
});



// Resize
window.addEventListener("resize", function () {
    ENGINE.resize();
});
