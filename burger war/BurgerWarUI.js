class BurgerWarUI
{
    constructor()
    {
        this.advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");

        this.createScore();
        
        this.createOptions();

        this.createMenuAide();
        this.montrerMenuAide();
        
        this.createIngredients();

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
        textAide.text = "Bienvenue dans Burger War\n\nDans ce mini jeu, vous devrez creer le meilleur burger possible!\n\nPour cela, utilisez les boutons à droite pour faire apparaître les ingrédients\n\nQuand votre burger vous semble parfait,\n vous pouvez valider et recevoir une note";
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



    createScore()
    {
        let textBox = new BABYLON.GUI.SelectionPanel("textBox");
        textBox.width = 0.2;
        textBox.height = 0.10;
        textBox.background = "#1388AF";
        textBox.alpha = 0.7;
        textBox.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
        textBox.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
        textBox.cornerRadius = 30;

        
        this.text = new BABYLON.GUI.TextBlock();
        this.text.text = "Score : 0";
        this.text.color = "white";
        this.text.fontSize = 30;

        textBox.addControl(this.text);  
        this.advancedTexture.addControl(textBox);
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


    createIngredients()
    {
        function createButton(text, color="#00CC00")
        {
            let button = BABYLON.GUI.Button.CreateSimpleButton("but", text);
            button.width = 0.7;
            button.height = "40px";
            button.color = "white";
            button.background = color;
            button.cornerRadius = 10;      
            return button;
        }


        let grid = new BABYLON.GUI.Grid();
        grid.addRowDefinition(0, true);
        grid.addRowDefinition(0.1);
        grid.addRowDefinition(0, true);
        grid.addRowDefinition(0.1);
        grid.addRowDefinition(0, true);
        grid.addRowDefinition(0.1);
        grid.addRowDefinition(0, true);
        grid.addRowDefinition(0.1);
        grid.addRowDefinition(0, true);
        grid.addRowDefinition(0.1);
        grid.addRowDefinition(0, true);
        grid.addRowDefinition(0.1);
        grid.addRowDefinition(0, true);
        grid.addRowDefinition(0.1);
        grid.addRowDefinition(20, true);
        grid.addRowDefinition(0.1);
        grid.addRowDefinition(0, true);
        grid.addRowDefinition(0.1);
        grid.addRowDefinition(0, true);
        grid.addRowDefinition(0.1);
        grid.addRowDefinition(0, true);
        grid.addColumnDefinition(1);
        grid.width = 0.15;
        grid.height = 0.8;
        grid.background = "#1388AF";
        grid.cornerRadius = 30;
        grid.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
        grid.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
        this.advancedTexture.addControl(grid);


        this.buttonPainDessous = createButton("pain dessous");
        grid.addControl(this.buttonPainDessous, 1, 0);

        this.buttonPainDessus = createButton("pain dessus");
        grid.addControl(this.buttonPainDessus, 3, 0);

        this.buttonSalade = createButton("salade");
        grid.addControl(this.buttonSalade, 5, 0);

        this.buttonFromage = createButton("fromage");
        grid.addControl(this.buttonFromage, 7, 0);

        this.buttonSteak = createButton("steak");
        grid.addControl(this.buttonSteak, 9, 0);

        this.buttonTomates = createButton("tomates");
        grid.addControl(this.buttonTomates, 11, 0);

        this.buttonSauces = createButton("sauces");
        grid.addControl(this.buttonSauces, 13, 0);


        this.buttonFixer = createButton("Fixer les ingredients", "#FF0000");
        grid.addControl(this.buttonFixer, 15, 0);

        this.buttonNettoyer = createButton("Tout supprimer", "#FF0000");
        grid.addControl(this.buttonNettoyer, 17, 0);

        this.buttonValider = createButton("Valider", "#FF0000");
        grid.addControl(this.buttonValider, 19, 0);
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
            aller("burger war");
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