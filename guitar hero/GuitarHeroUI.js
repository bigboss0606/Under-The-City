class GuitarHeroUI
{
    constructor()
    {
        this.advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");

        this.createVie();
        this.createOptions();
        this.creerBoutonLancer();
        this.createMenuAide();

        this.createBoutonGagne();
        this.createBoutonPerdu();
    }


    createVie()
    {
        let textBox = new BABYLON.GUI.SelectionPanel("textBox");
        textBox.width = 0.2;
        textBox.height = 0.10;
        textBox.background = "#1388AF";
        textBox.alpha = 0.7;
        textBox.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
        textBox.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
        textBox.cornerRadius = 30;

        
        this.texteVie = new BABYLON.GUI.TextBlock();
        this.texteVie.text = "Vie : 3";
        this.texteVie.color = "white";
        this.texteVie.fontSize = 30;

        textBox.addControl(this.texteVie);  
        this.advancedTexture.addControl(textBox);
    }

    

    creerBoutonLancer()
    {
        this.panneauLancer = new BABYLON.GUI.StackPanel();
        this.panneauLancer.width = "30%";
        this.panneauLancer.height = "30%";
        this.panneauLancer.background = "#1388AF";
        this.panneauLancer.alpha = 0.7;
        this.panneauLancer.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
        this.panneauLancer.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_CENTER;
        
        let texteLancer = new BABYLON.GUI.TextBlock();
        texteLancer.width = "220px";
        texteLancer.height = "80px";
        texteLancer.text = "Let's rock !!!";
        texteLancer.alpha = 1;
        texteLancer.color = "white";
        texteLancer.fontSize = 30;
        this.panneauLancer.addControl(texteLancer);

        this.buttonLancer = BABYLON.GUI.Button.CreateSimpleButton("but", "GO");
        this.buttonLancer.width = "200px";
        this.buttonLancer.height = "100px";
        this.buttonLancer.background = "#FF0000";
        this.buttonLancer.alpha = 0.9;
        this.buttonLancer.cornerRadius = 30;
        this.buttonLancer.fontSize = 30;
        this.buttonLancer.color = "white";
        this.panneauLancer.addControl(this.buttonLancer);
    }
    montrerBoutonLancer()
    {
        this.advancedTexture.addControl(this.panneauLancer);
    }
    cacherBoutonLancer()
    {
        this.advancedTexture.removeControl(this.panneauLancer);
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
        textAide.text = "Bienvenue dans Guitar Hero Lowcost\n\nDans ce mini jeu, vous devrez taper\nles notes quand elles atteignent la ligne\n\nRouge = x\nBleu = c\nVert = v\nJaune = b\nCyan = n";
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
            aller("guitar hero");
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