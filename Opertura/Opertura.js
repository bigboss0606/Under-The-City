class Opertura
{
    scene;



    constructor(){}



    async initiate()
    {
        this.scene = new BABYLON.Scene(engine);

        this.scene.debugLayer.show();

        const camera = new BABYLON.FreeCamera("camera", new BABYLON.Vector3(-4, 2, 0), this.scene);
        camera.setTarget(BABYLON.Vector3.Zero());
        camera.attachControl(canvas, true);

        const light1 = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), this.scene);
    
        var ground = BABYLON.MeshBuilder.CreateBox("box", {width:2, height:2});
        ground.position = new BABYLON.Vector3(0, 0, 0)
    }

    getScene()
    {
        return this.scene;
    }
}
