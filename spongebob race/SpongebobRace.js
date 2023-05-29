class SpongebobRace
{
    constructor()
    {
        this.enCours = false;
        
        this.scene = new BABYLON.Scene(ENGINE);
        this.UI = new SpongebobRaceUI();

        this.camera = new BABYLON.ArcRotateCamera("camera1", Math.PI / 2, Math.PI / 4, 10, new BABYLON.Vector3(-67, 3, 0), this.scene);
        this.camera.lowerRadiusLimit = 2;
        this.camera.upperRadiusLimit = 10;
        this.camera.wheelDeltaPercentage = 0.01;
        this.camera.attachControl(CANVAS, true);

        const light1 = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), this.scene);


        this.importerTout()
        .then(() => { // Met en place le heros et ses deplacements
            this.heroMesh = this.scene.getNodeByName("Gorille");
            this.camera.target = this.heroMesh;
            this.heroMesh.position = new BABYLON.Vector3(-65, 1, 0);
            this.heroMesh.rotation.y = BABYLON.Tools.ToRadians(90);

            this.scene.onBeforeRenderObservable.add(() => {
                if(this.enCours)
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
                if(this.enCours)
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
        })
        .then(() => { // Cree tous les ennemis
            let burger = this.scene.getMeshByName("Burger");
            let burger2 = new Ennemi(burger.createInstance("burger2"), new BABYLON.Vector3(-33, 0.75, -9), 235, [[90, 180], [180, 180]], 6);
            let burger3 = new Ennemi(burger.createInstance("burger3"), new BABYLON.Vector3(-41, 0.75, 1), 205, [[120, 180], [240, 180]], 6);
            let burger4 = new Ennemi(burger.createInstance("burger4"), new BABYLON.Vector3(-27, 0.75, -24), 250, [[80, 180], [160, 180]], 6);
            let burger5 = new Ennemi(burger.createInstance("burger5"), new BABYLON.Vector3(-3, 0.75, -38), 185, [[120, 180], [240, 180]], 6);
            let burger6 = new Ennemi(burger.createInstance("burger6"), new BABYLON.Vector3(2, 0.75, -38), 185, [[120, 180], [240, 180]], 6);
            let burger7 = new Ennemi(burger.createInstance("burger7"), new BABYLON.Vector3(35, 0.75, -33), 280, [[85, 180], [170, 180]], 6);
            let burger8 = new Ennemi(burger.createInstance("burger8"), new BABYLON.Vector3(36, 0.75, -6), 0, [[90, 180], [180, 180]], 6);
            let burger1 = new Ennemi(burger, new BABYLON.Vector3(30, 0.75, 46), 220, [[75, 180], [150, 180]], 0.2);
            for(let ennemi of [burger1, burger2, burger3, burger4, burger5, burger6, burger7, burger8])
            {
                ennemi.getMesh().actionManager = new BABYLON.ActionManager(this.scene);
                ennemi.getMesh().actionManager.registerAction(
                    new BABYLON.ExecuteCodeAction(
                        {
                            trigger: BABYLON.ActionManager.OnIntersectionEnterTrigger, 
                            parameter: {mesh: this.heroMesh}
                        }, 
                        () => {
                            this.enCours = false;
                            this.UI.montrerBoutonPerdu();
                            joueurAPerdu();
                        }
                    )
                );
            }


            let poisson = this.scene.getMeshByName("Corps");
            poisson.position = new BABYLON.Vector3(-14.5, 0, 60);
            poisson.actionManager = new BABYLON.ActionManager(this.scene);
            poisson.actionManager.registerAction(
                new BABYLON.ExecuteCodeAction(
                    {
                        trigger: BABYLON.ActionManager.OnIntersectionEnterTrigger, 
                        parameter: {mesh: this.heroMesh}
                    }, 
                    () => {
                        this.enCours = false;
                        this.UI.montrerBoutonGagne();
                        joueurAGagne();
                    }
                )
            );


            this.scene.onBeforeRenderObservable.add(() => {
                if(this.enCours)
                {
                    for(let ennemi of [burger1, burger2, burger3, burger4, burger5, burger6, burger7, burger8])
                    {
                        ennemi.avancer();
                    }
                }
            });
        });
    }
    
    async importerTout()
    {
        await BABYLON.SceneLoader.ImportMeshAsync("", "models/", "Bikini Bottom.glb", this.scene);
        await BABYLON.SceneLoader.ImportMeshAsync("", "models/", "gorille.babylon", this.scene)
        await BABYLON.SceneLoader.ImportMeshAsync("", "models/", "poisson.babylon", this.scene)
        await BABYLON.SceneLoader.ImportMeshAsync("", "models/", "burger.babylon", this.scene)
    }




    lancer()
    {
        //this.musique = new BABYLON.Sound("musique", "musiques/whopper-whopper.mp3", this.scene, null, { loop: true, autoplay: true });

        this.scene.attachControl();
        this.UI.cacherBoutonGagne();
        this.UI.cacherBoutonPerdu();
        this.inputMap = {};
        this.enCours = true;

        this.heroMesh.position = new BABYLON.Vector3(-65, 1, 0);
        this.heroMesh.rotation.y = BABYLON.Tools.ToRadians(90);     
    }

    arreter()
    {
        this.enCours = false;
        //this.musique.dispose();
        this.scene.detachControl();
    }

    getScene()
    {
        return this.scene;
    }
}