var canvas = document.getElementById("renderCanvas");
var engine = null;
var sceneToRender = "menu";


function createMenu()
{
    let menu = new Menu();
    menu.initiate();

    menu.buttonOpertura.onPointerClickObservable.add(() => {
        sceneToRender = "Opertura";
        menu.motherfucker();
    });

    menu.buttonBurgerWar.onPointerClickObservable.add(() => {
        sceneToRender = "BurgerWar";
        menu.motherfucker();
    });

    menu.button3.onPointerClickObservable.add(() => {
        sceneToRender = "3";
        menu.motherfucker();
    });

    menu.button4.onPointerClickObservable.add(() => {
        sceneToRender = "4";
        menu.motherfucker();
    });

    return menu.getScene();
}


function createOpertura() 
{
    let game = new Opertura();
    game.initiate();
    return game.getScene();
}

function createBurgerWar() 
{
    let game = new BurgerWar();
    game.initiate();
    return game.getScene();
}



var initFunction = async function() 
{
    await Ammo();
    engine = new BABYLON.Engine(canvas, true, { preserveDrawingBuffer: true, stencil: true,  disableWebGL2Support: false});


    let menu = createMenu();
    let opertura = createOpertura();
    let burgerWar = createBurgerWar();


    engine.runRenderLoop(function () {
        if (sceneToRender === "menu")
        {
            menu.render();
        }
        else if (sceneToRender === "Opertura")
        {
            opertura.render();
        }
        else if (sceneToRender === "BurgerWar")
        {
            burgerWar.render();
        }
        else if (sceneToRender === "3")
        {
            console.log(3);
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
