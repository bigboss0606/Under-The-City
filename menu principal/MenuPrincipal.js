class MenuPrincipal
{
    scene;
    advancedTexture;
    stackPanel;


    constructor()
    {
        this.scene = new BABYLON.Scene(ENGINE);
        this.scene.createDefaultCameraOrLight(true, true, true);
        this.createUI();
    }


    createUI()
    {
        this.advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");

        let grid = new BABYLON.GUI.Grid();
        grid.addRowDefinition(0.3);
        grid.addRowDefinition(0.25);
        grid.addRowDefinition(0.15);
        grid.addRowDefinition(0.25);
        grid.addColumnDefinition(1);
        grid.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
        grid.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_CENTER;
        this.advancedTexture.addControl(grid);


        let titre = new BABYLON.GUI.TextBlock();
        titre.height = "250px";
        titre.paddingTop = "100px";
        titre.color = "white";
        titre.fontSize = 100;
        titre.text = "No city";
        grid.addControl(titre, 0, 0);


        let text = new BABYLON.GUI.TextBlock();
        //text.height = "200px";
        text.text = "La Terre a été détruite par une attaque de ninjas mutans démoniaques\nReconstruisez le monde et planter des arbres (c'est green)\n(les méchants polluent donc c'est aussi green)";
        text.color = "white";
        text.fontSize = 25;
        grid.addControl(text, 1, 0);


        let buttonResto = BABYLON.GUI.Button.CreateSimpleButton("but", "Nouvelle partie");
        buttonResto.width = "200px";
        buttonResto.height = "100px";
        buttonResto.background = "#FF0000";
        buttonResto.cornerRadius = 30;
        buttonResto.fontSize = 25;
        buttonResto.color = "white";
        buttonResto.onPointerClickObservable.add(() => {
            aller("maison");
        });
        grid.addControl(buttonResto, 2, 0);


        let textRemerciements = new BABYLON.GUI.TextBlock();
        textRemerciements.text = "Un projet du grand rob1\nD'après une idée du magnifique rob1\nDes modèles époustouflants du prodigieux rob1 (sauf le mouton honteusement volé à Fashion Crochet)\nMusique volée au génial Pleasantries (check Youtube c'est un monstre)\nRéalisé par l'incroyable rob1";
        textRemerciements.color = "white";
        textRemerciements.fontSize = 18;
        grid.addControl(textRemerciements, 3, 0);
    }



    lancer()
    {
        this.scene.attachControl();
    }

    arreter()
    {
        this.scene.detachControl();
    }

    getScene()
    {
        return this.scene;
    }
}
