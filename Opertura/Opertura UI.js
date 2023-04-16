class OperturaUI
{
    text;
    

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


    initiate()
    {
        this.advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");

        this.createScore();    
    }
}
