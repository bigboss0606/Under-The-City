class myUI
{
    advancedTexture;
    text;
    buttonPainDessous;
    buttonPainDessus;
    buttonSalade;
    buttonFromage;
    buttonSteak;
    buttonTomates;
    buttonSauces;
    buttonEnvoyer;
    buttonNettoyer;



    constructor(){}



    createScore()
    {
        let textBox = new BABYLON.GUI.SelectionPanel("textBox");
        textBox.width = 0.3;
        textBox.height = 0.12;
        textBox.background = "#1388AF";
        textBox.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
        textBox.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
        
        this.text = new BABYLON.GUI.TextBlock();
        this.text.text = "Score : 0";
        this.text.color = "white";
        this.text.fontSize = 40;

        textBox.addControl(this.text);  
        this.advancedTexture.addControl(textBox);
    }



    createButton(text, top, color="#1388AF")
    {
        let button = BABYLON.GUI.Button.CreateSimpleButton("but", text);
        button.width = 0.8;
        button.height = "40px";
        button.color = "white";
        button.background = color;
        button.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
        button.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
        button.top = top;
        return button;
    }



    createIngredients()
    {
        let selectBox = new BABYLON.GUI.SelectionPanel("spi");
        selectBox.width = 0.15;
        selectBox.height = 0.9;
        selectBox.background = "#1388AF";
        selectBox.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
        selectBox.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
        this.advancedTexture.addControl(selectBox);

        this.buttonPainDessous = this.createButton("pain dessous", 10);
        selectBox.addControl(this.buttonPainDessous);

        this.buttonPainDessus = this.createButton("pain dessus", 70);
        selectBox.addControl(this.buttonPainDessus);

        this.buttonSalade = this.createButton("salade", 130);
        selectBox.addControl(this.buttonSalade);

        this.buttonFromage = this.createButton("fromage", 190);
        selectBox.addControl(this.buttonFromage);

        this.buttonSteak = this.createButton("steak", 250);
        selectBox.addControl(this.buttonSteak);

        this.buttonTomates = this.createButton("tomates", 310);
        selectBox.addControl(this.buttonTomates);

        this.buttonSauces = this.createButton("sauces", 370);
        selectBox.addControl(this.buttonSauces);


        this.buttonEnvoyer = this.createButton("Envoyer !!!", 450, "#FF0000");
        selectBox.addControl(this.buttonEnvoyer);

        this.buttonNettoyer = this.createButton("Nettoyer", 510, "#FF0000");
        selectBox.addControl(this.buttonNettoyer);
    }



    initiate()
    {
        this.advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");

        this.createScore();
        
        this.createIngredients();
    }
}