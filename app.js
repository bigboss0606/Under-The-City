var canvas = document.getElementById("renderCanvas");
var engine = null;
var sceneToRender = "menu";


function createMenu()
{
    let menu = new Menu();
    menu.initiate();
    menu.button.onPointerClickObservable.add(() => {
        sceneToRender = "game";
        menu.motherfucker();
        menu.launchMusic();
    });

    return menu.getScene();
}



function createGame() 
{
    let game = new Game();
    game.initiate();
    return game.getScene();
}



var initFunction = async function() 
{
    await Ammo();
    
    engine = new BABYLON.Engine(canvas, true, { preserveDrawingBuffer: true, stencil: true,  disableWebGL2Support: false});
    
    let menu = createMenu();
    let game = createGame();

    engine.runRenderLoop(function () {
        if (sceneToRender === "menu")
        {
            menu.render();
        }
        else
        {
            game.render();
        }
        console.log(sceneToRender);
    });
};
initFunction();

// Resize
window.addEventListener("resize", function () {
    engine.resize();
});
