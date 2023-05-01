class Menu
{
    scene;
    advancedTexture;
    stackPanel;


    constructor()
    {
        this.scene = new BABYLON.Scene(ENGINE);
        this.scene.createDefaultCameraOrLight(true, true, true);
        //this.scene.debugLayer.show();
        this.musique = null;
        this.createUI();
    }


    createUI()
    {
        this.advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");

        this.stackPanel = new BABYLON.GUI.StackPanel();
        this.stackPanel.height = "100%";
        this.stackPanel.width = "100%";
        this.stackPanel.background = "#00CED1";
        this.advancedTexture.addControl(this.stackPanel);


        let titre = new BABYLON.GUI.TextBlock();
        titre.width = "800px";
        titre.height = "200px";
        titre.paddingTop = "100px";
        titre.color = "white";
        titre.fontSize = 100;
        titre.text = "Under The City";
        this.stackPanel.addControl(titre);  


        let text = new BABYLON.GUI.TextBlock();
        text.width = "800px";
        text.height = "200px";
        text.text = "La Terre est au bord de la destruction\nVous seul pouvez sauver le monde !!!";
        text.color = "white";
        text.fontSize = 20;
        this.stackPanel.addControl(text);  


        let buttonResto = BABYLON.GUI.Button.CreateSimpleButton("but", "Nouvelle partie");
        buttonResto.width = "200px";
        buttonResto.height = "100px";
        buttonResto.background = "#FF0000";
        buttonResto.cornerRadius = 30;
        buttonResto.fontSize = 30;
        buttonResto.color = "white";
        this.stackPanel.addControl(buttonResto);


        buttonResto.onPointerClickObservable.add(() => {
            quitterMenu();
            allerABikiniBottom();
        });


        let espace = new BABYLON.GUI.TextBlock();
        espace.width = "800px";
        espace.height = "40px";
        this.stackPanel.addControl(espace);  

        
        let textRemerciements = new BABYLON.GUI.TextBlock();
        textRemerciements.width = "800px";
        textRemerciements.height = "150px";
        textRemerciements.text = "Un projet du grand rob1\n D'après une idée du magnifique rob1\n Des modèles époustouflants du prodigieux rob1 \n Réalisé par l'incroyable rob1";
        textRemerciements.color = "white";
        textRemerciements.fontSize = 18;
        this.stackPanel.addControl(textRemerciements);
    }


    lancer()
    {
        //this.musique = new BABYLON.Sound("music", "musique/relaxing.mp3", this.scene, null, { loop: true, autoplay: true });
        this.scene.attachControl();
    }

    quitter()
    {
        //this.musique.dispose();
        this.scene.detachControl();
    }



    getScene()
    {
        return this.scene;
    }
}
