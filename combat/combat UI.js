class CombatUI
{
    advancedTexture;
    textScore;
    textVie;
    textFPS;

    panneauLancer;
    

    constructor()
    {
        this.advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");

        this.createTextScore();
        this.createTextFPS();
        this.creerBoutonLancer();
        this.creerBoutonGagner();
        this.creerBoutonPerdre();
    }



    createTextScore()
    {
        let stackPanel = new BABYLON.GUI.StackPanel();
        stackPanel.width = "20%";
        stackPanel.height = "20%";
        stackPanel.background = "#1388AF";
        stackPanel.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
        stackPanel.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
        
        this.textScore = new BABYLON.GUI.TextBlock();
        this.textScore.width = "220px";
        this.textScore.height = "80px";
        this.textScore.text = "Score : 0";
        this.textScore.color = "white";
        this.textScore.fontSize = 30;
        stackPanel.addControl(this.textScore);

        this.textVie = new BABYLON.GUI.TextBlock();
        this.textVie.width = "220px";
        this.textVie.height = "80px";
        this.textVie.text = "PV : 3";
        this.textVie.color = "white";
        this.textVie.fontSize = 30;
        stackPanel.addControl(this.textVie);  

        this.advancedTexture.addControl(stackPanel);
    }

    setTextScore(text)
    {
        this.textScore.text = text;
    }

    setTextVie(texte)
    {
        this.textVie.text = texte;
    }


    createTextFPS()
    {
        let textBox = new BABYLON.GUI.SelectionPanel("textBox");
        textBox.width = 0.2;
        textBox.height = 0.12;
        textBox.background = "#1388AF";
        textBox.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
        textBox.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
        
        this.textFPS = new BABYLON.GUI.TextBlock();
        this.textFPS.text = "FPS";
        this.textFPS.color = "white";
        this.textFPS.fontSize = 40;
        textBox.addControl(this.textFPS);

        this.advancedTexture.addControl(textBox);
    }

    setTextFPS(text)
    {
        this.textFPS.text = text;
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


    creerBoutonGagner()
    {
        this.panneauGagner = new BABYLON.GUI.StackPanel();
        this.panneauGagner.width = "30%";
        this.panneauGagner.height = "40%";
        this.panneauGagner.background = "#1388AF";
        this.panneauGagner.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
        this.panneauGagner.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_CENTER;
        
        let texteGagner = new BABYLON.GUI.TextBlock();
        texteGagner.width = "220px";
        texteGagner.height = "80px";
        texteGagner.text = "Bien joué";
        texteGagner.color = "white";
        texteGagner.fontSize = 30;
        this.panneauGagner.addControl(texteGagner);

        this.texteXP = new BABYLON.GUI.TextBlock();
        this.texteXP.width = "220px";
        this.texteXP.height = "80px";
        this.texteXP.text = "Bien joué";
        this.texteXP.color = "white";
        this.texteXP.fontSize = 20;
        this.panneauGagner.addControl(this.texteXP);

        this.buttonGagner = BABYLON.GUI.Button.CreateSimpleButton("but", "Retour à l'exploration");
        this.buttonGagner.width = "200px";
        this.buttonGagner.height = "100px";
        this.buttonGagner.background = "#FF0000";
        this.buttonGagner.cornerRadius = 30;
        this.buttonGagner.fontSize = 30;
        this.buttonGagner.color = "white";
        this.panneauGagner.addControl(this.buttonGagner);
    }

    montrerBoutonGagner()
    {
        this.advancedTexture.addControl(this.panneauGagner);
    }

    cacherBoutonGagner()
    {
        this.advancedTexture.removeControl(this.panneauGagner);
    }

    setTexteExperience(texte)
    {
        this.texteXP.text = texte;
    }

    creerBoutonPerdre()
    {
        this.panneauPerdre = new BABYLON.GUI.StackPanel();
        this.panneauPerdre.width = "30%";
        this.panneauPerdre.height = "30%";
        this.panneauPerdre.background = "#1388AF";
        this.panneauPerdre.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
        this.panneauPerdre.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_CENTER;
        
        let textePerdre = new BABYLON.GUI.TextBlock();
        textePerdre.width = "220px";
        textePerdre.height = "80px";
        textePerdre.text = "Dommage";
        textePerdre.color = "white";
        textePerdre.fontSize = 30;
        this.panneauPerdre.addControl(textePerdre);

        this.buttonPerdre = BABYLON.GUI.Button.CreateSimpleButton("but", "Retour au menu");
        this.buttonPerdre.width = "200px";
        this.buttonPerdre.height = "100px";
        this.buttonPerdre.background = "#FF0000";
        this.buttonPerdre.cornerRadius = 30;
        this.buttonPerdre.fontSize = 30;
        this.buttonPerdre.color = "white";
        this.panneauPerdre.addControl(this.buttonPerdre);
    }

    montrerBoutonPerdre()
    {
        this.advancedTexture.addControl(this.panneauPerdre);
    }

    cacherBoutonPerdre()
    {
        this.advancedTexture.removeControl(this.panneauPerdre);
    }

}
