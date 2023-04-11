class Menu
{
    scene;
    buttonBurgerWar;
    buttonOpertura;
    advancedTexture;


    constructor(){}



    initiate()
    {
        this.scene = new BABYLON.Scene(engine);

        let camera = new BABYLON.ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2.5, 10, new BABYLON.Vector3(0, 0, 0));
        camera.setTarget(BABYLON.Vector3.Zero());
        camera.attachControl(canvas, true);

        let  light = new BABYLON.DirectionalLight("dir01", new BABYLON.Vector3(0, -1, 1), this.scene);
        light.position = new BABYLON.Vector3(0, 15, -30);

        this.advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");

        let selectBox = new BABYLON.GUI.SelectionPanel("spi");
        selectBox.background = "#1388AF";
        this.advancedTexture.addControl(selectBox);

        let titre = new BABYLON.GUI.TextBlock();
        titre.top = "-30%";
        titre.color = "white";
        titre.fontSize = 100;
        titre.text = "Under The City";
        selectBox.addControl(titre);  


        let text = new BABYLON.GUI.TextBlock();
        text.text = "La Terre est au bord de la destruction\nVous seul pouvez sauver le monde !!!";
        text.color = "white";
        text.fontSize = 20;
        text.top = "-15%";
        text.width = "80%";
        text.background = "#00FF00";
        selectBox.addControl(text);  


        this.buttonOpertura = BABYLON.GUI.Button.CreateSimpleButton("but", "Niveau 1 : Opertura");
        this.buttonOpertura.width = "40%";
        this.buttonOpertura.height = "8%";
        this.buttonOpertura.top = "-3%";
        this.buttonOpertura.background = "#FF0000";
        this.buttonOpertura.cornerRadius = 30;
        this.buttonOpertura.fontSize = 30;
        this.buttonOpertura.color = "white";
        selectBox.addControl(this.buttonOpertura);

        this.buttonBurgerWar = BABYLON.GUI.Button.CreateSimpleButton("but", "Niveau 2 : Burger War");
        this.buttonBurgerWar.width = "40%";
        this.buttonBurgerWar.height = "8%";
        this.buttonBurgerWar.top = "9%";
        this.buttonBurgerWar.background = "#FF0000";
        this.buttonBurgerWar.cornerRadius = 30;
        this.buttonBurgerWar.fontSize = 30;
        this.buttonBurgerWar.color = "white";
        selectBox.addControl(this.buttonBurgerWar);

        this.button3 = BABYLON.GUI.Button.CreateSimpleButton("but", "Niveau 3 : ???");
        this.button3.width = "40%";
        this.button3.height = "8%";
        this.button3.top = "21%";
        this.button3.background = "#FF0000";
        this.button3.cornerRadius = 30;
        this.button3.fontSize = 30;
        this.button3.color = "white";
        selectBox.addControl(this.button3);

        this.button4 = BABYLON.GUI.Button.CreateSimpleButton("but", "Niveau 4 : ???");
        this.button4.width = "40%";
        this.button4.height = "8%";
        this.button4.top = "33%";
        this.button4.background = "#FF0000";
        this.button4.cornerRadius = 30;
        this.button4.fontSize = 30;
        this.button4.color = "white";
        selectBox.addControl(this.button4);


        this.button4 = BABYLON.GUI.Button.CreateSimpleButton("but", "Remerciement");
        this.button4.width = "20%";
        this.button4.height = "6%";
        this.button4.top = "45%";
        this.button4.background = "#00FFFF";
        this.button4.cornerRadius = 30;
        this.button4.fontSize = 30;
        this.button4.color = "white";
        selectBox.addControl(this.button4);
    }


    motherfucker()
    {
        this.advancedTexture.dispose();
    }


    getScene()
    {
        return this.scene;
    }
}
