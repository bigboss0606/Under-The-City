var canvas = document.getElementById("renderCanvas");
var engine = null;
var sceneToRender = "menu";
var previousSceneToRender = null;


function createMenu()
{
    let menu = new Menu();
    menu.initiate();

    menu.buttonOpertura.onPointerClickObservable.add(() => {
        sceneToRender = "Opertura";
        menu.cacher();
    });

    menu.buttonBurgerWar.onPointerClickObservable.add(() => {
        sceneToRender = "BurgerWar";
        menu.cacher();
    });

    menu.button3.onPointerClickObservable.add(() => {
        sceneToRender = "Nebula";
        menu.cacher();
    });

    menu.button4.onPointerClickObservable.add(() => {
        sceneToRender = "4";
        menu.cacher();
    });

    return menu.getScene();
}


function createOpertura() 
{
    let game = new Opertura();
    game.initiate();
    return game;
}

function createBurgerWar() 
{
    let game = new BurgerWar();
    game.initiate();
    return game;
}

function createNebula() 
{
    let game = new Nebula();
    game.initiate();
    return game;
}



var initFunction = async function() 
{
    await Ammo();
    engine = new BABYLON.Engine(canvas, true, { preserveDrawingBuffer: true, stencil: true,  disableWebGL2Support: false});


    let menu = createMenu();
    let opertura = createOpertura();
    let burgerWar = createBurgerWar();
    let nebula = createNebula();

    let musique = new Musique(menu);


    engine.runRenderLoop(function () {
        if (sceneToRender === "menu")
        {
            menu.render();
        }
        else if (sceneToRender === "Opertura")
        {
            if (previousSceneToRender !== "Opertura")
            {
                musique.lanceLaMusique("coniferous-forest.mp3", opertura.getScene());
                previousSceneToRender = "Opertura";
            }
            opertura.getScene().render();
        }
        else if (sceneToRender === "BurgerWar")
        {
            if (previousSceneToRender !== "BurgerWar")
            {
                musique.lanceLaMusique("whopper-whopper.mp3", burgerWar.getScene());
                previousSceneToRender = "BurgerWar";
            }
            burgerWar.getScene().render();
        }
        else if (sceneToRender === "Nebula")
        {
            if (previousSceneToRender !== "Nebula")
            {
                musique.lanceLaMusique("whopper-whopper.mp3", burgerWar.getScene());
                previousSceneToRender = "Nebula";
            }
            nebula.getScene().render();
        }
        else if (sceneToRender === "4")
        {
            console.log(4);
        }
        else{
            console.error(sceneToRender);
        }
    });
};
initFunction();

// Resize
window.addEventListener("resize", function () {
    engine.resize();
});
