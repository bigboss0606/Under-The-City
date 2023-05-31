class PenduUI
{
    constructor()
    {
        this.advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");

        this.createPendu();
        this.createOptions();
        this.createMenuAide();
        this.montrerMenuAide();

        this.createBoutonGagne();
        this.createBoutonPerdu();
    }


    createPendu()
    {
        this.grid = new BABYLON.GUI.Grid();
        this.grid.addColumnDefinition(0.05);
        this.grid.addColumnDefinition(0.2);
        this.grid.addColumnDefinition(0.35);
        this.grid.addColumnDefinition(0.35);
        this.grid.addColumnDefinition(0.05);
        this.grid.addRowDefinition(1);
        this.advancedTexture.addControl(this.grid);


        let gauche = new BABYLON.GUI.StackPanel();
        this.grid.addControl(gauche, 0, 1);

        let imagesPanel = new BABYLON.GUI.StackPanel();
        imagesPanel.height = "400px";
        imagesPanel.isVertical = false;
        gauche.addControl(imagesPanel);

        this.images = [];
        for(let lettre of ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k"])
        {
            let image = new BABYLON.GUI.Image("image", "pendu/images moutons/mouton " + lettre + ".jpg");
            image.isVisible = false;
            image.stretch = BABYLON.GUI.Image.STRETCH_UNIFORM;
            imagesPanel.addControl(image);
            this.images.push(image);
        }


        this.texteErreurs = new BABYLON.GUI.TextBlock();
        this.texteErreurs.height = "80px";
        this.texteErreurs.text = "10";
        this.texteErreurs.color = "white";
        this.texteErreurs.fontSize = 30;
        gauche.addControl(this.texteErreurs);



        let milieu = new BABYLON.GUI.StackPanel();
        this.grid.addControl(milieu, 0, 2);

    
        this.texte = new BABYLON.GUI.TextBlock();
        this.texte.height = "400px";
        this.texte.text = "----------";
        this.texte.color = "white";
        this.texte.fontSize = 40;
        milieu.addControl(this.texte);



        let droite = new BABYLON.GUI.StackPanel();
        this.grid.addControl(droite, 0, 3);
        this.listeBoutonsLettres = [];
        
        let premiereLigne = new BABYLON.GUI.StackPanel();
        premiereLigne.height = "70px";
        premiereLigne.isVertical = false;
        droite.addControl(premiereLigne);

        for (let lettre of ["a", "z", "e", "r", "t", "y", "u", "i", "o", "p"])
        {
            let bouton = BABYLON.GUI.Button.CreateSimpleButton("but", lettre);
            bouton.width = "40px";
            bouton.height = "50px";
            bouton.background = "#FF0000";
            bouton.cornerRadius = 5;
            bouton.fontSize = 30;
            bouton.color = "white";
            premiereLigne.addControl(bouton);
            this.listeBoutonsLettres.push(bouton);
        }


        let deuxiemeLigne = new BABYLON.GUI.StackPanel();
        deuxiemeLigne.height = "70px";
        deuxiemeLigne.isVertical = false;
        droite.addControl(deuxiemeLigne);

        for (let lettre of ["q", "s", "d", "f", "g", "h", "j", "k", "l", "m"])
        {
            let bouton = BABYLON.GUI.Button.CreateSimpleButton("but", lettre);
            bouton.width = "40px";
            bouton.height = "50px";
            bouton.background = "#FF0000";
            bouton.cornerRadius = 5;
            bouton.fontSize = 30;
            bouton.color = "white";
            deuxiemeLigne.addControl(bouton);
            this.listeBoutonsLettres.push(bouton);
        }


        let troisiemeLigne = new BABYLON.GUI.StackPanel();
        troisiemeLigne.height = "70px";
        troisiemeLigne.isVertical = false;
        droite.addControl(troisiemeLigne);

        for (let lettre of ["w", "x", "c", "v", "b", "n"])
        {
            let bouton = BABYLON.GUI.Button.CreateSimpleButton("but", lettre);
            bouton.width = "40px";
            bouton.height = "50px";
            bouton.background = "#FF0000";
            bouton.cornerRadius = 5;
            bouton.fontSize = 30;
            bouton.color = "white";
            troisiemeLigne.addControl(bouton);
            this.listeBoutonsLettres.push(bouton);
        }
    }

    montrerImage(numero)
    {
        for(let image of this.images)
        {
            image.isVisible = false;
        }
        this.images[numero].isVisible = true;
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
        textAide.text = "Bienvenue dans Pendu\n\nDans ce mini jeu, vous devrez faire un pendu comme d'hab!\n\nVous pouvez utiliser les boutons ou le clavier";
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
            aller("pendu");
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