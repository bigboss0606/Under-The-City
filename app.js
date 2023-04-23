var CANVAS = document.getElementById("renderCanvas");
var ENGINE = null;
var SCENETORENDER = "menu";
var PREVIOUSSCENETORENDER = null;



function allerAuMenu()
{
    SCENETORENDER = "menu";
}

function allerABikiniBottom()
{
    SCENETORENDER = "bikini bottom";
}

function allerAuCombat(ennemi)
{
    SCENETORENDER = "combat";
}



var initFunction = async function() 
{
    ENGINE = new BABYLON.Engine(CANVAS, true, { preserveDrawingBuffer: true, stencil: true,  disableWebGL2Support: false});

    let menu = new Menu();
    //let resto = createResto();
    let bikiniBottom = new BikiniBottom();
    let combat = new Combat();

    let musique = new Musique(menu);


    ENGINE.runRenderLoop(function () {
        console.log(SCENETORENDER);
        if (SCENETORENDER === "menu")
        {
            if (PREVIOUSSCENETORENDER !== "menu")
            {
                musique.lanceLaMusique("relaxing.mp3", menu.getScene());
                menu.createUI();
                PREVIOUSSCENETORENDER = "menu";
            }
            menu.getScene().render();
        }
        /*else if (SCENETORENDER === "resto")
        {
            if (PREVIOUSSCENETORENDER !== "resto")
            {
                musique.lanceLaMusique("whopper-whopper.mp3", resto.getScene());
                PREVIOUSSCENETORENDER = "resto";
            }
            resto.getScene().render();
        }*/
        else if (SCENETORENDER === "bikini bottom")
        {
            if (PREVIOUSSCENETORENDER !== "bikini bottom")
            {
                musique.lanceLaMusique("whopper-whopper.mp3", bikiniBottom.getScene());
                PREVIOUSSCENETORENDER = "bikini bottom";
            }
            bikiniBottom.getScene().render();
        }
        else if (SCENETORENDER === "combat")
        {
            if (PREVIOUSSCENETORENDER !== "combat")
            {
                musique.lanceLaMusique("coniferous-forest.mp3", combat.getScene());
                combat.lancer();
                PREVIOUSSCENETORENDER = "combat";
            }
            combat.getScene().render();
        }
        else
        {
            console.error(SCENETORENDER);
        }
    });
};
initFunction();

// Resize
window.addEventListener("resize", function () {
    ENGINE.resize();
});
