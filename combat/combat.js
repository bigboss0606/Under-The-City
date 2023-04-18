class Combat
{
    scene;



    constructor(){}



    async initiate()
    {
        this.scene = new BABYLON.Scene(ENGINE);

        //this.scene.debugLayer.show();


        const camera = new BABYLON.FreeCamera("camera", new BABYLON.Vector3(0, 5, 18), this.scene);
        camera.setTarget(BABYLON.Vector3.Zero());
        camera.attachControl(CANVAS, true);
        camera.speed = 0.5;
        camera.angularSensibility = 4000;
        camera.keysUp.push(87);
        camera.keysUp.push(90);
        camera.keysRight.push(68);
        camera.keysDown.push(83);
        camera.keysLeft.push(81);

        const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), this.scene);
    
        const UI = new CombatUI();


        let isReady = false;


        let zoneValide;
        let zoneFin;
        BABYLON.SceneLoader.ImportMeshAsync("", "combat/", "estrade.glb", this.scene).then(() => {
            zoneValide = this.scene.getMeshByName("ZoneValide");
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
            zoneValide.material = glass;

            zoneFin = this.scene.getMeshByName("ZoneFin");
            zoneFin.isVisible = false;

            isReady = true;
        });

        
        let matRouge = new BABYLON.StandardMaterial("matRouge");
        matRouge.diffuseColor = BABYLON.Color3.Red();
        let matVert = new BABYLON.StandardMaterial("matVert");
        matVert.diffuseColor = BABYLON.Color3.Green();
        let matBlue = new BABYLON.StandardMaterial("matBlue");
        matBlue.diffuseColor = BABYLON.Color3.Blue();
        let matYellow = new BABYLON.StandardMaterial("matYellow");
        matYellow.diffuseColor = BABYLON.Color3.Yellow();
        let matTeal = new BABYLON.StandardMaterial("matTeal");
        matTeal.diffuseColor = BABYLON.Color3.Teal();
        let mats = [matRouge, matBlue, matVert, matYellow, matTeal];


        let notes = [[0, 0], [60, 1], [120, 2], [180, 3], [240, 4], [300, 4],  [360, 3], [420, 2], [480, 1], [540, 0]];
        let duree = 600;
        let i = 0;
        

        let notesCrees = [];
        let aAppuye = false;

        this.scene.onBeforeRenderObservable.add(() => {
            UI.setTextFPS(Math.round(ENGINE.getFps()));
            
        });
       
        this.scene.onBeforeRenderObservable.add(() => {
            if (isReady)
            {            
                for (let couple of notes)
                {
                    if(couple[0] === i % duree)
                    {
                        notesCrees.push(new Note(couple[1], mats[couple[1]], this.scene));
                    }
                }
            }                
            i++;
        });

        this.scene.onBeforeRenderObservable.add(() => {
            if (isReady)
            {
                let clone = [...notesCrees];
                for (let note of clone)
                {
                    if (note.getMesh().intersectsMesh(zoneValide)) {
                        
                    }

                    if (note.getMesh().intersectsMesh(zoneFin)) {
                        note.detruire();

                        const index = notesCrees.indexOf(note);
                        notesCrees.splice(index, 1);

                        UI.setTextScore("Raté");
                    }

                    note.avancer();
                }
            }
        });

        this.scene.onKeyboardObservable.add((kbInfo) => {
            if (isReady)
            {
                switch (kbInfo.type) {
                    case BABYLON.KeyboardEventTypes.KEYDOWN:
                        if (!aAppuye)
                        {
                            aAppuye = true;

                            let aucuneNoteTouche = true;
                            let clone = [...notesCrees];

                            switch (kbInfo.event.key) {
                                case "x":
                                case "X":
                                    console.log(2);
                                    for (let note of clone)
                                    {
                                        if (note.ligne == 0 && note.getMesh().intersectsMesh(zoneValide)) {
                                            note.detruire();

                                            const index = notesCrees.indexOf(note);
                                            notesCrees.splice(index, 1);

                                            UI.setTextScore("Bien joué");
                                            aucuneNoteTouche = false;
                                        }
                                    }
                                    break;

                                case "c":
                                case "C":
                                    for (let note of clone)
                                    {
                                        if (note.ligne == 1 && note.getMesh().intersectsMesh(zoneValide)) {
                                            note.detruire();

                                            const index = notesCrees.indexOf(note);
                                            notesCrees.splice(index, 1);

                                            UI.setTextScore("Bien joué");
                                            aucuneNoteTouche = false;
                                        }
                                    }
                                    break;

                                case "v":
                                case "V":
                                    for (let note of clone)
                                    {
                                        if (note.ligne == 2 && note.getMesh().intersectsMesh(zoneValide)) {
                                            note.detruire();

                                            const index = notesCrees.indexOf(note);
                                            notesCrees.splice(index, 1);

                                            UI.setTextScore("Bien joué");
                                            aucuneNoteTouche = false;
                                        }
                                    }
                                    break;

                                case "b":
                                case "B":
                                    for (let note of clone)
                                    {
                                        if (note.ligne == 3 && note.getMesh().intersectsMesh(zoneValide)) {
                                            note.detruire();

                                            const index = notesCrees.indexOf(note);
                                            notesCrees.splice(index, 1);

                                            UI.setTextScore("Bien joué");
                                            aucuneNoteTouche = false;
                                        }
                                    }
                                    break;

                                case "n":
                                case "N":
                                    for (let note of clone)
                                    {
                                        if (note.ligne == 4 && note.getMesh().intersectsMesh(zoneValide)) {
                                            note.detruire();

                                            const index = notesCrees.indexOf(note);
                                            notesCrees.splice(index, 1);

                                            UI.setTextScore("Bien joué");
                                            aucuneNoteTouche = false;
                                        }
                                    }
                                    break;
                            }

                            if (aucuneNoteTouche)
                            {
                                UI.setTextScore("Aie");
                            }
                        }
                        break;
                        
                    case BABYLON.KeyboardEventTypes.KEYUP:
                        aAppuye = false;
                        break;
                }
            }
        });
    }

    getScene()
    {
        return this.scene;
    }
}
