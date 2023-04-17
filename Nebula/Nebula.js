class Nebula
{
    scene;



    constructor(){}



    async initiate()
    {
        this.scene = new BABYLON.Scene(engine);
        //this.scene.collisionsEnabled = true;
     
        this.scene.debugLayer.show();

        const UI = new OperturaUI();

        const camera=new BABYLON.FreeCamera("camera", new BABYLON.Vector3(0,2,0), this.scene);
        camera.attachControl(canvas, true);

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
        BABYLON.SceneLoader.ImportMeshAsync("", "Burger War/", "resto.babylon", this.scene).then((result) => {
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


        //let assiette;
        let fromage;
        let painDessous;
        let painDessus;
        let salade;
        let sauces;
        let steak;
        let tomate;
        let burger;

        BABYLON.SceneLoader.ImportMeshAsync("", "Burger War/", "burger.babylon", this.scene).then((newMeshes) => {
            //assiette = this.scene.getMeshByName("Assiette");
            fromage = this.scene.getMeshByName("Fromage");
            painDessous = this.scene.getMeshByName("PainDessous");
            painDessus = this.scene.getMeshByName("PainDessus");
            painDessus.scaling = new BABYLON.Vector3(50, 50, 50);

            salade = this.scene.getMeshByName("Salade");
            sauces = this.scene.getMeshByName("Sauces");
            steak = this.scene.getMeshByName("Steak");
            tomate = this.scene.getMeshByName("Tomate");
            
            //burger = BABYLON.Mesh.MergeMeshes([fromage, painDessous, painDessus, salade, sauces, steak, tomate]);
            //burger.scaling = new BABYLON.Vector3(50, 50, 50);

        
            /*camera.onCollide = (mesh) => {
                console.log(7);
                if (mesh === this.scene.getMeshByName("PainDessus"))
                {
                    sceneToRender = "Opertura";
                    console.log(8);
                }
            }*/

            painDessus.actionManager = new BABYLON.ActionManager(this.scene);
            painDessus.actionManager.registerAction(
                new BABYLON.ExecuteCodeAction(
                    BABYLON.ActionManager.OnPickTrigger,
                    () => {sceneToRender = "Opertura";}
                )
            );


            

            /*this.scene.onPointerObservable.add((pointerInfo) => {      		
                switch (pointerInfo.type) {
                    case BABYLON.PointerEventTypes.POINTERDOWN:
                        console.log(6);
                        console.log(pointerInfo.pickInfo);
                        console.log(pointerInfo.pickInfo.pickedMesh);
                        if(pointerInfo.pickInfo.hit) {
                            console.log(7);
                            if (pointerInfo.pickInfo.pickedMesh === painDessus) {
                                sceneToRender = "Opertura";
                                console.log(8);
                            }
                        }
                        break;
                }
            });*/

            this.scene.onBeforeRenderObservable.add(() => {
                UI.setTextFPS(Math.round(engine.getFps()));  
            });
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
