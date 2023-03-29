class Menu
{
    scene;
    button;
    advancedTexture;


    constructor(){}



    initiate()
    {
        this.scene = new BABYLON.Scene(engine);

        let camera = new BABYLON.ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2.5, 10, new BABYLON.Vector3(0, 0, 0));
        camera.setTarget(BABYLON.Vector3.Zero());
        camera.attachControl(canvas, true);

        let  light = new BABYLON.DirectionalLight("dir01", new BABYLON.Vector3(0, -1, 1), this.scene);
        light.position = new BABYLON.Vector3(0, 15, -30);

        this.advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");

        let selectBox = new BABYLON.GUI.SelectionPanel("spi");
        selectBox.background = "#1388AF";
        this.advancedTexture.addControl(selectBox);

        let titre = new BABYLON.GUI.TextBlock();
        titre.top = "-30%";
        titre.color = "white";
        titre.fontSize = 100;
        titre.text = "Burger War";
        selectBox.addControl(titre);  

        let text = new BABYLON.GUI.TextBlock();
        text.text = "La Terre est au bord de la 3ème Guerre Mondiale\nVous devez créer le burger ultime !!!\nL'avenir du monde est entre vos mains\n\nUn projet de MOI\nEn collaboration avec MOI\n";
        text.color = "white";
        text.fontSize = 20;
        text.width = 0.8;
        text.background = "#00FF00";
        selectBox.addControl(text);  

        this.button = BABYLON.GUI.Button.CreateSimpleButton("but", "Commencer");
        this.button.width = 0.6;
        this.button.height = "15%";
        this.button.top = "30%";
        this.button.background = "#FF0000";
        this.button.cornerRadius = 30;
        this.button.fontSize = 40;
        this.button.color = "white";
        selectBox.addControl(this.button);
    }


    motherfucker()
    {
        this.advancedTexture.dispose();
    }


    launchMusic()
    {
        let sound = new BABYLON.Sound("music", "whopper-whopper.mp3", this.scene, null, { loop: true, autoplay: true });
    }



    getScene()
    {
        return this.scene;
    }
}