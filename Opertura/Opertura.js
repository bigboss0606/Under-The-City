class Opertura
{
    scene;



    constructor(){}



    async initiate()
    {
        this.scene = new BABYLON.Scene(engine);

        this.scene.debugLayer.show();

        const camera = new BABYLON.FreeCamera("camera", new BABYLON.Vector3(0, 8, 18), this.scene);
        camera.setTarget(BABYLON.Vector3.Zero());
        camera.attachControl(canvas, true);
        camera.speed = 0.5;
        camera.angularSensibility = 4000;
        camera.keysUp.push(87);
        camera.keysUp.push(90);
        camera.keysRight.push(68);
        camera.keysDown.push(83);
        camera.keysLeft.push(81);

        const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), this.scene);
    
        const UI = new OperturaUI();
        UI.initiate();

        let isReady = false;


        let zoneValide;
        let zoneFin;
        BABYLON.SceneLoader.ImportMeshAsync("", "Opertura/", "estrade.glb", this.scene).then(() => {
            zoneValide = this.scene.getMeshByName("ZoneValide");
            zoneValide.isVisible = false;
            zoneFin = this.scene.getMeshByName("ZoneFin");
            zoneFin.isVisible = false;
            isReady = true;
        });


        let notes = [[0, 0], [60, 1], [120, 2], [180, 3], [240, 4], [360, 0],  [360, 1], [360, 2], [360, 3], [360, 4]];
        let i = 0;

        let notesCrees = [];
        let aAppuye = false;

       
        this.scene.onBeforeRenderObservable.add(() => {
            if (isReady)
            {            
                for (let couple of notes)
                {
                    if(couple[0] === i)
                    {
                        notesCrees.push(new Note(couple[1], this.scene));
                    }
                }
            }
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

                        UI.text.text = "Raté";
                    }

                    note.avancer();
                }
                i++;
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

                                            UI.text.text = "Bien joué";
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

                                            UI.text.text = "Bien joué";
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

                                            UI.text.text = "Bien joué";
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

                                            UI.text.text = "Bien joué";
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

                                            UI.text.text = "Bien joué";
                                            aucuneNoteTouche = false;
                                        }
                                    }
                                    break;
                            }

                            

                            if (aucuneNoteTouche)
                            {
                                UI.text.text = "Aie";
                            }
                        }
                        break;
                        
                    case BABYLON.KeyboardEventTypes.KEYUP:
                        aAppuye = false;
                        break;


                        /*
                        switch (kbInfo.event.key) {
                            case "x":
                            case "X":
                                sphere.position.x -= 0.1;
                            break
                            case "c":
                            case "C":
                                sphere.position.x += 0.1;
                            break
                            case "v":
                            case "V":
                                sphere.position.y += 0.1;
                            break
                            case "b":
                            case "B":
                                sphere.position.y -= 0.1;
                            break
                            case "n":
                            case "N":
                                sphere.position.y -= 0.1;
                            break
                        }*/
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
