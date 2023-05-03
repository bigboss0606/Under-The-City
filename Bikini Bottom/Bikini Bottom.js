class BikiniBottom
{
    scene;
    explorationEnCours;


    constructor(){
        this.scene = new BABYLON.Scene(ENGINE);
        this.explorationEnCours = false;
        //this.scene.debugLayer.show();


        this.UI = new BikiniBottomUI();
        this.scene.onBeforeRenderObservable.add(() => {
            this.UI.setTextFPS(Math.round(ENGINE.getFps()));  
        });

        this.camera = new BABYLON.ArcRotateCamera("camera1", Math.PI / 2, Math.PI / 4, 10, new BABYLON.Vector3(-67, 3, 0), this.scene);
        this.camera.lowerRadiusLimit = 2;
        this.camera.upperRadiusLimit = 10;
        this.camera.wheelDeltaPercentage = 0.01;
        this.camera.attachControl(CANVAS, true);

        const light1 = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), this.scene);


        this.importerTout()
        .then(() => { // Met en place le heros et ses deplacements
            this.heroMesh = this.scene.getMeshByName("Gorille");
            this.camera.target = this.heroMesh;
            this.heroMesh.position = new BABYLON.Vector3(-65, 1, 0);
            this.heroMesh.rotation.y = BABYLON.Tools.ToRadians(90);

            this.scene.onBeforeRenderObservable.add(() => {
                if(this.explorationEnCours)
                {
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
                }
            });

            this.scene.onKeyboardObservable.add((kbInfo) => {
                if(this.explorationEnCours)
                {
                    switch (kbInfo.type) {
                        case BABYLON.KeyboardEventTypes.KEYDOWN:
                            this.inputMap[kbInfo.event.key] = true;      
                            break;
                
                        case BABYLON.KeyboardEventTypes.KEYUP:
                            this.inputMap[kbInfo.event.key] = false;      
                            break;
                    }
                }
            });

            this.scene.onBeforeRenderObservable.add(() => {
                if(ESTSURTELEPHONE && this.explorationEnCours)
                {
                    if(this.UI.getJoystick().pressed){
                        let move = this.UI.getJoystick().deltaPosition.y * (ENGINE.getDeltaTime()/1000) * 3;
                        let rot = this.UI.getJoystick().deltaPosition.x * (ENGINE.getDeltaTime()/1000);
                        
                        this.heroMesh.moveWithCollisions(this.heroMesh.forward.scaleInPlace(move));
                        this.heroMesh.rotate(BABYLON.Vector3.Up(), rot);
                    }
                }
            });
        })
        .then(() => { // Cree tous les ennemis
            let burger = this.scene.getMeshByName("Burger");
            let notesBurger = [[2000, 0], [3000, 1], [4000, 2], [5000, 3], [6000, 4], [7000, 4],  [8000, 3], [9000, 2], [10000, 1], [11000, 0]];
            let burger2 = new Ennemi(burger.createInstance("burger2"), new BABYLON.Vector3(-33, 0.75, -9), 235, [[90, 180], [180, 180]], 6, notesBurger);
            let burger3 = new Ennemi(burger.createInstance("burger3"), new BABYLON.Vector3(-41, 0.75, 1), 205, [[120, 180], [240, 180]], 6, notesBurger);
            let burger4 = new Ennemi(burger.createInstance("burger4"), new BABYLON.Vector3(-27, 0.75, -24), 250, [[80, 180], [160, 180]], 6, notesBurger);
            let burger5 = new Ennemi(burger.createInstance("burger5"), new BABYLON.Vector3(-3, 0.75, -38), 185, [[120, 180], [240, 180]], 6, notesBurger);
            let burger6 = new Ennemi(burger.createInstance("burger6"), new BABYLON.Vector3(2, 0.75, -38), 185, [[120, 180], [240, 180]], 6, notesBurger);
            let burger7 = new Ennemi(burger.createInstance("burger7"), new BABYLON.Vector3(35, 0.75, -33), 280, [[85, 180], [170, 180]], 6, notesBurger);
            let burger8 = new Ennemi(burger.createInstance("burger8"), new BABYLON.Vector3(36, 0.75, -6), 0, [[90, 180], [180, 180]], 6, notesBurger);
            let burger1 = new Ennemi(burger, new BABYLON.Vector3(30, 0.75, 46), 220, [[75, 180], [150, 180]], 0.2, notesBurger);


            let poisson = this.scene.getMeshByName("Corps")
            let notesPoisson = [[2000, 0], [2500, 1], [3500, 1], [4000, 2], [5000, 2], [5500, 3], [6500, 3], [7000, 4], [8000, 4], [8500, 3], [9000, 2], [9500, 1], [10000, 0]];
            let poisson1 = new Ennemi(poisson.createInstance("poisson1"), new BABYLON.Vector3(-7, 0, -38), 185, [[120, 180], [240, 180]], 12, notesPoisson);



            ENNEMIS = [burger1, burger2, burger3, burger4, burger5, burger6, burger7, burger8, poisson1];
        })
        .then(() => { // Pour chaque ennemi, lance un combat quand sa mesh touche heroMesh
            for(let ennemi of ENNEMIS)
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
        })
        .then(() => { // Pour chaque ennemi, le fait déplacer avant chaque
            this.scene.onBeforeRenderObservable.add(() => {
                if(this.explorationEnCours)
                {
                    for(let ennemi of ENNEMIS)
                    {
                        ennemi.avancer();
                    }
                }
            });
        });
    }


    async importerTout()
    {
        await BABYLON.SceneLoader.ImportMeshAsync("", "Bikini Bottom/", "Bikini Bottom.glb", this.scene);
        await BABYLON.SceneLoader.ImportMeshAsync("", "", "gorille.babylon", this.scene)
        await BABYLON.SceneLoader.ImportMeshAsync("", "", "poisson.babylon", this.scene)
        await BABYLON.SceneLoader.ImportMeshAsync("", "resto/", "burger.babylon", this.scene)
    }


    lancer()
    {
        this.musique = new BABYLON.Sound("music", "musique/whopper-whopper.mp3", this.scene, null, { loop: true, autoplay: true });
        this.scene.attachControl();
        this.inputMap = {};
        this.explorationEnCours = true;

        if (ESTSURTELEPHONE)
        {
            this.UI.montrerJoystick();
        }
        else
        {
            this.UI.cacherJoystick();
        }
    }   

    quitter()
    {
        this.musique.dispose();
        this.UI.cacherJoystick();
        this.scene.detachControl();
        this.explorationEnCours = false;
    }


    getScene()
    {
        return this.scene;
    }
}
