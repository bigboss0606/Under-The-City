class SpongebobRaceUI
{
    constructor()
    {
        this.advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");

        this.createOptions();

        this.createMenuAide();
        this.montrerMenuAide();
        
        this.createBoutonGagne();
        this.createBoutonPerdu();
    }



    createMenuAide()
    {
        this.panneauAide = new BABYLON.GUI.StackPanel("textBox");
        this.panneauAide.height = 0.7;
        this.panneauAide.width = 0.6;
        this.panneauAide.background = "#1388AF";
        this.panneauAide.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
        this.panneauAide.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_CENTER;
        
        let textAide = new BABYLON.GUI.TextBlock();
        textAide.height = "350px";
        textAide.text = "Bienvenue dans Spongebob Race\n\nDans ce mini jeu, vous devez\ntoucher le poisson!\n\nOui, c'est à chier, je vais surement l'améliorer\n\nVous devez éviter les burgers\nparce que c'est pas green\n\nLe poisson est dans le Krousti Krabs (le resto de Mr Krabs)\nau bout de la route";
        textAide.color = "white";
        textAide.fontSize = 25;
        this.panneauAide.addControl(textAide);  

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
        this.panneauAide.addControl(boutonAide);
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
            aller("maison");
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


    createBoutonGagne()
    {
        this.panneauGagne = new BABYLON.GUI.StackPanel("textBox");
        this.panneauGagne.width = 0.4;
        this.panneauGagne.background = "#1388AF";
        this.panneauGagne.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
        this.panneauGagne.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_CENTER;
        
        let textGagne = new BABYLON.GUI.TextBlock();
        textGagne.height = "100px";
        textGagne.text = "Vous avez gagné";
        textGagne.color = "white";
        textGagne.fontSize = 40;
        this.panneauGagne.addControl(textGagne);  

        let boutonGagne = BABYLON.GUI.Button.CreateSimpleButton("but", "retour au jeu");
        boutonGagne.width = "300px";
        boutonGagne.height = "100px";
        boutonGagne.background = "#FF0000";
        boutonGagne.cornerRadius = 30;
        boutonGagne.fontSize = 30;
        boutonGagne.color = "white";
        boutonGagne.onPointerClickObservable.add(() => {
            aller("maison");
        });
        this.panneauGagne.addControl(boutonGagne);

        let space = new BABYLON.GUI.TextBlock();
        space.height = "30px";
        this.panneauGagne.addControl(space);  
    }
    montrerBoutonGagne()
    {
        this.advancedTexture.addControl(this.panneauGagne);
    }
    cacherBoutonGagne()
    {
        this.advancedTexture.removeControl(this.panneauGagne);
    }


    createBoutonPerdu()
    {
        this.panneauPerdu = new BABYLON.GUI.StackPanel("textBox");
        this.panneauPerdu.width = 0.4;
        this.panneauPerdu.background = "#1388AF";
        this.panneauPerdu.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
        this.panneauPerdu.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_CENTER;
        
        let textPerdu = new BABYLON.GUI.TextBlock();
        textPerdu.height = "100px";
        textPerdu.text = "Vous avez perdu";
        textPerdu.color = "white";
        textPerdu.fontSize = 40;
        this.panneauPerdu.addControl(textPerdu);  

        let boutonRetry = BABYLON.GUI.Button.CreateSimpleButton("but", "retry");
        boutonRetry.width = "300px";
        boutonRetry.height = "100px";
        boutonRetry.background = "#FF0000";
        boutonRetry.cornerRadius = 30;
        boutonRetry.fontSize = 30;
        boutonRetry.color = "white";
        boutonRetry.onPointerClickObservable.add(() => {
            aller("spongebob race");
        });
        this.panneauPerdu.addControl(boutonRetry);

        let space1 = new BABYLON.GUI.TextBlock();
        space1.height = "30px";
        this.panneauPerdu.addControl(space1);  

        let boutonPerdu = BABYLON.GUI.Button.CreateSimpleButton("but", "retour au jeu");
        boutonPerdu.width = "300px";
        boutonPerdu.height = "100px";
        boutonPerdu.background = "#FF0000";
        boutonPerdu.cornerRadius = 30;
        boutonPerdu.fontSize = 30;
        boutonPerdu.color = "white";
        boutonPerdu.onPointerClickObservable.add(() => {
            aller("maison");
        });
        this.panneauPerdu.addControl(boutonPerdu);

        let space = new BABYLON.GUI.TextBlock();
        space.height = "30px";
        this.panneauPerdu.addControl(space);  
    }
    montrerBoutonPerdu()
    {
        this.advancedTexture.addControl(this.panneauPerdu);
    }
    cacherBoutonPerdu()
    {
        this.advancedTexture.removeControl(this.panneauPerdu);
    }
}