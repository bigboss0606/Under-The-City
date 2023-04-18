class BurgerWar
{
    scene;



    constructor(){}



    async initiate()
    {
        this.scene = new BABYLON.Scene(ENGINE);
        this.scene.collisionsEnabled = true;


        /*const camera = new BABYLON.FreeCamera("camera", new BABYLON.Vector3(-4, 2, 0), this.scene);
        camera.setTarget(BABYLON.Vector3.Zero());
        camera.attachControl(CANVAS, true);*/

        
        const camera=new BABYLON.FreeCamera("camera", new BABYLON.Vector3(0,1,0), this.scene);
        camera.attachControl(CANVAS, true);

        camera.applyGravity = true;
        camera.checkCollisions = true;
        camera.ellipsoid = new BABYLON.Vector3(0.3,0.9,0.3);
        camera.minZ = 0.45;
        camera.speed = 0.5;
        camera.angularSensibility = 4000;

        //personalize the keys for the controller movement
        camera.keysUp.push(87);
        camera.keysUp.push(90);
        camera.keysRight.push(68);
        camera.keysDown.push(83);
        camera.keysLeft.push(81);


        const light1 = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), this.scene);
        //light1.position = new BABYLON.Vector3(0, 15, -30);
        //light1.intensity = 1000;
        const light2 = new BABYLON.PointLight("light2", new BABYLON.Vector3(-4, 3, 4), this.scene);
        light2.intensity = 10;
        const light3 = new BABYLON.PointLight("light3", new BABYLON.Vector3(-4, 3, -4), this.scene);
        light3.intensity = 10;
        const light4 = new BABYLON.PointLight("light4", new BABYLON.Vector3(4, 3, 0), this.scene);
        light4.intensity = 10;

        //bconst shadowGenerator = new BABYLON.ShadowGenerator(1024, light);

        this.scene.enablePhysics(new BABYLON.Vector3(0,-10,0), new BABYLON.AmmoJSPlugin());

        let UI = new myUI()
        UI.initiate();


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
        let clones = [];

        BABYLON.SceneLoader.ImportMeshAsync("", "Burger War/", "burger.babylon", this.scene).then((newMeshes) => {
            //assiette = this.scene.getMeshByName("Assiette");
            fromage = this.scene.getMeshByName("Fromage");
            painDessous = this.scene.getMeshByName("PainDessous");
            painDessus = this.scene.getMeshByName("PainDessus");
            salade = this.scene.getMeshByName("Salade");
            sauces = this.scene.getMeshByName("Sauces");
            steak = this.scene.getMeshByName("Steak");
            tomate = this.scene.getMeshByName("Tomate");
            
            let tab = [fromage, painDessous, painDessus, salade, sauces, steak, tomate];
            for (let x of tab) 
            {
                //x.scaling.scaleInPlace(50);
                x.position = new BABYLON.Vector3(-10, 3, 0);
                x.isVisible = true;
            }
        });



        // Create ground collider
        var ground = BABYLON.MeshBuilder.CreateGround("ground1", {width:10, height:10, subdivisions:10});
        ground.position = new BABYLON.Vector3(-3, 0, 3)
        ground.physicsImpostor = new BABYLON.PhysicsImpostor(ground, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, friction: 0.5, restitution: 0.7 }, this.scene);
        ground.isVisible = false;
        ground.checkCollisions = true;



        function createObject(obj, scene)
        {
            let clone = obj.createInstance("instance");
            clone.scaling.scaleInPlace(50);
            clone.isVisible = true;
            clone.position = new BABYLON.Vector3(-3, 3, 3);
            clone.physicsImpostor = new BABYLON.PhysicsImpostor(clone, BABYLON.PhysicsImpostor.CylinderImpostor, { mass: 10, friction: 0.5, restitution: 0.3 }, scene);
            //shadowGenerator.addShadowCaster(clone, true);
            UI.text.text = "Score : " + Math.floor(Math.random()*101);

            clones.push(clone);
        }

        UI.buttonFromage.onPointerClickObservable.add(() => {createObject(fromage, this.scene);});
        UI.buttonPainDessous.onPointerClickObservable.add(() => {createObject(painDessous, this.scene);});
        UI.buttonPainDessus.onPointerClickObservable.add(() => {createObject(painDessus, this.scene);});
        UI.buttonSalade.onPointerClickObservable.add(() => {createObject(salade, this.scene);});
        UI.buttonSauces.onPointerClickObservable.add(() => {createObject(sauces, this.scene);});
        UI.buttonSteak.onPointerClickObservable.add(() => {createObject(steak, this.scene);});
        UI.buttonTomates.onPointerClickObservable.add(() => {createObject(tomate, this.scene);});

        UI.buttonEnvoyer.onPointerClickObservable.add(
            () => {
                for (let x of clones) {
                    x.physicsImpostor.mass = 0;
                }
            }
        );

        UI.buttonNettoyer.onPointerClickObservable.add(
            () => {
                UI.text.text = "Score : 0";
                for (let x of clones) {
                    x.dispose();
                }
                clones = [];
            }
        );
    }


    getScene()
    {
        return this.scene;
    }
}
