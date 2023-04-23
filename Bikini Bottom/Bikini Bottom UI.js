class BikiniBottomUI
{
    advancedTexture;
    textScore;
    textFPS;
    

    constructor()
    {
        this.advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");

        this.createTextScore();
        this.createTextFPS();
    }



    createTextScore()
    {
        let textBox = new BABYLON.GUI.SelectionPanel("textBox");
        textBox.width = 0.3;
        textBox.height = 0.12;
        textBox.background = "#1388AF";
        textBox.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
        textBox.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
        
        this.textScore = new BABYLON.GUI.TextBlock();
        this.textScore.text = "Score : 0";
        this.textScore.color = "white";
        this.textScore.fontSize = 40;

        textBox.addControl(this.textScore);  
        this.advancedTexture.addControl(textBox);
    }

    setTextScore(text)
    {
        this.textScore.text = text;
    }


    createTextFPS()
    {
        let textBox = new BABYLON.GUI.SelectionPanel("textBox");
        textBox.width = 0.3;
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
}
