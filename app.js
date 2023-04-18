var CANVAS = document.getElementById("renderCanvas");
var ENGINE = null;
var SCENETORENDER = "menu";
var PREVIOUSSCENETORENDER = null;



function createMenu()
{
    let menu = new Menu();
    menu.initiate();
    return menu.getScene();
}


function createCombat() 
{
    let game = new Combat();
    game.initiate();
    return game;
}

function createResto() 
{
    let game = new Resto();
    game.initiate();
    return game;
}



var initFunction = async function() 
{
    ENGINE = new BABYLON.Engine(CANVAS, true, { preserveDrawingBuffer: true, stencil: true,  disableWebGL2Support: false});

    let menu = createMenu();
    let resto = createResto();
    let combat = createCombat();

    let musique = new Musique(menu);


    ENGINE.runRenderLoop(function () {
        console.log(SCENETORENDER);
        if (SCENETORENDER === "menu")
        {
            if (PREVIOUSSCENETORENDER !== "menu")
            {
                musique.lanceLaMusique("relaxing.mp3", menu);
                PREVIOUSSCENETORENDER = "menu";
            }
            menu.render();
        }
        else if (SCENETORENDER === "resto")
        {
            if (PREVIOUSSCENETORENDER !== "resto")
            {
                musique.lanceLaMusique("whopper-whopper.mp3", resto.getScene());
                PREVIOUSSCENETORENDER = "resto";
            }
            resto.getScene().render();
        }
        else if (SCENETORENDER === "combat")
        {
            if (PREVIOUSSCENETORENDER !== "combat")
            {
                musique.lanceLaMusique("coniferous-forest.mp3", combat.getScene());
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
