class MaisonUI
{
    constructor()
    {
        this.advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");
        
        this.createOptions();

        this.createMenuAide();
        this.montrerMenuAide();
    }



    createMenuAide()
    {
        this.panneauAide = new BABYLON.GUI.Grid();
        this.panneauAide.height = 0.7;
        this.panneauAide.width = 0.6;
        this.panneauAide.background = "#1388AF";
        this.panneauAide.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
        this.panneauAide.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_CENTER;
        this.panneauAide.addRowDefinition(0.9);
        this.panneauAide.addRowDefinition(100, true);
        this.panneauAide.addRowDefinition(0.1);
        this.panneauAide.addColumnDefinition(1);
        
        let textAide = new BABYLON.GUI.TextBlock();
        textAide.height = "350px";
        textAide.text = "Bienvenue dans Under-The-City\n\ninteragissez avec les plans de travails\n pour jouer aux mini jeux et construire la meilleur prairie possible!\n\n\nDéplacement : zqsd";
        textAide.color = "white";
        textAide.fontSize = 25;
        this.panneauAide.addControl(textAide, 0, 0);  

        let boutonAide = BABYLON.GUI.Button.CreateSimpleButton("but", "Let's go");
        boutonAide.width = "300px";
        boutonAide.height = "100px";
        boutonAide.background = "#FF0000";
        boutonAide.cornerRadius = 30;
        boutonAide.fontSize = 30;
        boutonAide.color = "white";
        boutonAide.onPointerClickObservable.add(() => {
            this.cacherMenuAide();
        });
        this.panneauAide.addControl(boutonAide, 1, 0);
    }
    montrerMenuAide()
    {
        this.advancedTexture.addControl(this.panneauAide);
    }
    cacherMenuAide()
    {
        this.advancedTexture.removeControl(this.panneauAide);
    }


    createOptions()
    {
        let panneauOptions = new BABYLON.GUI.StackPanel("textBox");
        panneauOptions.height = "120px";
        panneauOptions.width = 0.15;
        panneauOptions.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
        panneauOptions.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
        this.advancedTexture.addControl(panneauOptions);
        
        let boutonQuitter = BABYLON.GUI.Button.CreateSimpleButton("but", "Quitter");
        boutonQuitter.height = "60px";
        boutonQuitter.background = "#FF0000";
        boutonQuitter.cornerRadius = 10;
        boutonQuitter.fontSize = 30;
        boutonQuitter.color = "white";
        boutonQuitter.onPointerClickObservable.add(() => {
            aller("menu principal");
        });
        panneauOptions.addControl(boutonQuitter);

        let boutonAide = BABYLON.GUI.Button.CreateSimpleButton("but", "Aide");
        boutonAide.height = "60px";
        boutonAide.background = "#FF0000";
        boutonAide.cornerRadius = 10;
        boutonAide.fontSize = 30;
        boutonAide.color = "white";
        boutonAide.onPointerClickObservable.add(() => {
            this.montrerMenuAide();
        });
        panneauOptions.addControl(boutonAide);
    }
}