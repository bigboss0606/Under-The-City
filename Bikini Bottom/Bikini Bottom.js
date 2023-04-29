class BikiniBottom
{
    scene;
    ennemis;
    explorationEnCours;


    constructor(){
        this.scene = new BABYLON.Scene(ENGINE);
        this.explorationEnCours = false;
        //this.scene.debugLayer.show();


        const UI = new BikiniBottomUI();
        this.scene.onBeforeRenderObservable.add(() => {
            UI.setTextFPS(Math.round(ENGINE.getFps()));  
        });

        this.camera = new BABYLON.ArcRotateCamera("camera1", Math.PI / 2, Math.PI / 4, 10, new BABYLON.Vector3(-67, 3, 0), this.scene);
        this.camera.lowerRadiusLimit = 2;
        this.camera.upperRadiusLimit = 10;
        this.camera.wheelDeltaPercentage = 0.01;
        this.camera.attachControl(CANVAS, true);

        /*camera.applyGravity = true;
        camera.checkCollisions = true;
        camera.ellipsoid = new BABYLON.Vector3(0.3,0.9,0.3);
        camera.minZ = 0.45;
        camera.speed = 0.5;
        camera.angularSensibility = 4000;*/



        const light1 = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), this.scene);
        const light2 = new BABYLON.PointLight("light2", new BABYLON.Vector3(-4, 3, 4), this.scene);
        light2.intensity = 10;
        const light3 = new BABYLON.PointLight("light3", new BABYLON.Vector3(-4, 3, -4), this.scene);
        light3.intensity = 10;
        const light4 = new BABYLON.PointLight("light4", new BABYLON.Vector3(4, 3, 0), this.scene);
        light4.intensity = 10;


        this.importerTout()
        
        this.scene.onBeforeRenderObservable.add(() => {
            if(this.explorationEnCours)
            {
                for(let ennemi of this.ennemis)
                {
                    ennemi.avancer();
                }
            }
        });
    }


    /*
           ____                          __  __              _      
          / ___|_ __ ___  ___ ___  ___  |  \/  | ___ _ __ __| | ___ 
         | |  _| '__/ _ \/ __/ __|/ _ \ | |\/| |/ _ \ '__/ _` |/ _ \
         | |_| | | | (_) \__ \__ \  __/ | |  | |  __/ | | (_| |  __/
          \____|_|  \___/|___/___/\___| |_|  |_|\___|_|  \__,_|\___|
                                                                    
    */
    async importerTout()
    {
        this.importerEnvironnement();
        this.importerGorille();
        this.importerBurger();
    }

    async importerEnvironnement()
    {
        BABYLON.SceneLoader.ImportMeshAsync("", "Bikini Bottom/", "Bikini Bottom.glb", this.scene);
    }   

    async importerBurger()
    {
        BABYLON.SceneLoader.ImportMeshAsync("", "resto/", "burger.babylon", this.scene)
        .then(() => {
            let burger = this.scene.getMeshByName("Burger");

            let burger2 = new Ennemi(burger.createInstance("burger2"), new BABYLON.Vector3(-33, 0.75, -9), 235, [[90, 180], [180, 180]], 0.1, this.scene);
            let burger3 = new Ennemi(burger.createInstance("burger3"), new BABYLON.Vector3(-41, 0.75, 1), 205, [[120, 180], [240, 180]], 0.1, this.scene);
            let burger4 = new Ennemi(burger.createInstance("burger4"), new BABYLON.Vector3(-27, 0.75, -24), 250, [[80, 180], [160, 180]], 0.1, this.scene);
            let burger5 = new Ennemi(burger.createInstance("burger5"), new BABYLON.Vector3(-3, 0.75, -38), 185, [[120, 180], [240, 180]], 0.1, this.scene);
            let burger6 = new Ennemi(burger.createInstance("burger6"), new BABYLON.Vector3(2, 0.75, -38), 185, [[120, 180], [240, 180]], 0.1, this.scene);
            let burger7 = new Ennemi(burger.createInstance("burger7"), new BABYLON.Vector3(35, 0.75, -33), 280, [[85, 180], [170, 180]], 0.1, this.scene);
            let burger8 = new Ennemi(burger.createInstance("burger8"), new BABYLON.Vector3(36, 0.75, -6), 0, [[90, 180], [180, 180]], 0.1, this.scene);
            let burger1 = new Ennemi(burger, new BABYLON.Vector3(30, 0.75, 46), 220, [[75, 180], [150, 180]], 0.2, this.scene);

            this.ennemis = [burger1, burger2, burger3, burger4, burger5, burger6, burger7, burger8];
        })
        .then(() => {
            for(let ennemi of this.ennemis)
            {
                ennemi.getMesh().actionManager = new BABYLON.ActionManager(this.scene);
                ennemi.getMesh().actionManager.registerAction(
                    new BABYLON.ExecuteCodeAction(
                        {
                            trigger: BABYLON.ActionManager.OnIntersectionEnterTrigger, 
                            parameter: {mesh: this.heroMesh}
                        }, 
                        () => {
                            ENNEMI = ennemi;
                            quitterBikiniBottom();
                            allerAuCombat();
                        }
                    )
                );
            }
        });

        console.log(2);
    }

    async importerGorille()
    {
        BABYLON.SceneLoader.ImportMeshAsync("", "", "gorille.babylon", this.scene)
        .then(() => {
            this.heroMesh = this.scene.getMeshByName("Gorille");
            this.camera.target = this.heroMesh;
            this.heroMesh.position = new BABYLON.Vector3(-65, 1, 0);
            this.heroMesh.rotation.y = BABYLON.Tools.ToRadians(90);

            this.scene.onBeforeRenderObservable.add(() => {
                if (this.inputMap["z"]) {
                    this.heroMesh.moveWithCollisions(this.heroMesh.forward.scaleInPlace(0.5));
                }
                if (this.inputMap["s"]) {
                    this.heroMesh.moveWithCollisions(this.heroMesh.forward.scaleInPlace(-0.1));
                }
                if (this.inputMap["q"]) {
                    this.heroMesh.rotate(BABYLON.Vector3.Up(), -0.2);
                }
                if (this.inputMap["d"]) {
                    this.heroMesh.rotate(BABYLON.Vector3.Up(), 0.2);
                }
            });

            this.scene.onKeyboardObservable.add((kbInfo) => {
                switch (kbInfo.type) {
                    case BABYLON.KeyboardEventTypes.KEYDOWN:
                        this.inputMap[kbInfo.event.key] = true;      
                        break;
                
                    case BABYLON.KeyboardEventTypes.KEYUP:
                        this.inputMap[kbInfo.event.key] = false;      
                        break;
                }
            });
        });

    }


    lancer()
    {
        this.musique = new BABYLON.Sound("music", "musique/whopper-whopper.mp3", this.scene, null, { loop: true, autoplay: true });
        this.scene.attachControl();
        this.inputMap = {};
        this.explorationEnCours = true;
    }   

    quitter()
    {
        this.musique.dispose();
        this.scene.detachControl();
    }


    getScene()
    {
        return this.scene;
    }
}
