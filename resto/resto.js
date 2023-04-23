class Resto
{
    scene;



    constructor(){}



    async initiate()
    {
        this.scene = new BABYLON.Scene(ENGINE);
        //this.scene.collisionsEnabled = true;
     

        const UI = new RestoUI();
        this.scene.onBeforeRenderObservable.add(() => {
            UI.setTextFPS(Math.round(ENGINE.getFps()));  
        });

        const camera=new BABYLON.FreeCamera("camera", new BABYLON.Vector3(1, 2, 4), this.scene);
        camera.attachControl(CANVAS, true);

        /*camera.applyGravity = true;
        camera.checkCollisions = true;
        camera.ellipsoid = new BABYLON.Vector3(0.3,0.9,0.3);
        camera.minZ = 0.45;
        camera.speed = 0.5;
        camera.angularSensibility = 4000;*/

        camera.keysUp.push(87);
        camera.keysUp.push(90);
        camera.keysRight.push(68);
        camera.keysDown.push(83);
        camera.keysLeft.push(81);


        const light1 = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), this.scene);
        const light2 = new BABYLON.PointLight("light2", new BABYLON.Vector3(-4, 3, 4), this.scene);
        light2.intensity = 10;
        const light3 = new BABYLON.PointLight("light3", new BABYLON.Vector3(-4, 3, -4), this.scene);
        light3.intensity = 10;
        const light4 = new BABYLON.PointLight("light4", new BABYLON.Vector3(4, 3, 0), this.scene);
        light4.intensity = 10;

        //bconst shadowGenerator = new BABYLON.ShadowGenerator(1024, light);


        let vitre;
        BABYLON.SceneLoader.ImportMeshAsync("", "resto/", "resto.babylon", this.scene).then((result) => {
            vitre = this.scene.getMeshByName("Vitre");
            var glass = new BABYLON.PBRMaterial("glass", this.scene);
            glass.indexOfRefraction = 0.52;
            glass.alpha = 0.5;
            glass.directIntensity = 0.0;
            glass.environmentIntensity = 0.7;
            glass.cameraExposure = 0.66;
            glass.cameraContrast = 1.66;
            glass.microSurface = 1;
            glass.reflectivityColor = new BABYLON.Color3(0.2, 0.2, 0.2);
            glass.albedoColor = new BABYLON.Color3(0.95, 0.95, 0.95);
            vitre.material = glass;

            for (let mesh of result.meshes)
            {
                mesh.checkCollisions = true;
            }
        });


        let burger;

        BABYLON.SceneLoader.ImportMeshAsync("", "resto/", "burger.babylon", this.scene).then((newMeshes) => {
            burger = this.scene.getMeshByName("Burger");
            
            burger.actionManager = new BABYLON.ActionManager(this.scene);
            burger.actionManager.registerAction(
                new BABYLON.ExecuteCodeAction(
                    BABYLON.ActionManager.OnPickTrigger,
                    () => {SCENETORENDER = "combat";}
                )
            );
        });



        // Create ground collider
        var ground = BABYLON.MeshBuilder.CreateGround("ground1", {width:10, height:10, subdivisions:10});
        ground.position = new BABYLON.Vector3(-3, 0, 3)
        ground.isVisible = false;
        //ground.checkCollisions = true;


    }


    getScene()
    {
        return this.scene;
    }
}
