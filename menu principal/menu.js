class Menu
{
    scene;
    buttonOpertura;
    advancedTexture;


    constructor(){}



    initiate()
    {
        this.scene = new BABYLON.Scene(ENGINE);

        let camera = new BABYLON.ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2.5, 10, new BABYLON.Vector3(0, 0, 0));
        camera.setTarget(BABYLON.Vector3.Zero());
        camera.attachControl(CANVAS, true);

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


        let buttonResto = BABYLON.GUI.Button.CreateSimpleButton("but", "Niveau 1 : Opertura");
        buttonResto.width = "40%";
        buttonResto.height = "8%";
        buttonResto.top = "-3%";
        buttonResto.background = "#FF0000";
        buttonResto.cornerRadius = 30;
        buttonResto.fontSize = 30;
        buttonResto.color = "white";
        selectBox.addControl(buttonResto);
        buttonResto.onPointerClickObservable.add(() => {
            SCENETORENDER = "resto";
            this.cacher();
        });

        let buttonCombat = BABYLON.GUI.Button.CreateSimpleButton("but", "Niveau 2 : Burger War");
        buttonCombat.width = "40%";
        buttonCombat.height = "8%";
        buttonCombat.top = "9%";
        buttonCombat.background = "#FF0000";
        buttonCombat.cornerRadius = 30;
        buttonCombat.fontSize = 30;
        buttonCombat.color = "white";
        selectBox.addControl(buttonCombat);
        buttonCombat.onPointerClickObservable.add(() => {
            SCENETORENDER = "combat";
            this.cacher();
        });

        
        /*let textRemerciements = new BABYLON.GUI.TextBlock();
        textRemerciements.text = "Un projet du grand rob1\n D'après une idée du magnifique rob1\n Des modèles époustouflants du prodigieux rob1 \n Réalisé par l'incroyable rob1";
        textRemerciements.color = "white";
        textRemerciements.fontSize = 30;
        textRemerciements.top = "35%";
        textRemerciements.width = "80%";
        textRemerciements.background = "#00FF00";
        selectBox.addControl(textRemerciements);  */
    }


    cacher()
    {
        this.advancedTexture.dispose();
    }


    getScene()
    {
        return this.scene;
    }
}
