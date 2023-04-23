class Combat
{
    scene;
    UI;

    estPret;
    combatEnCours;
    ennemi;
    pointDeVie;

    zoneValide;
    zoneFin;
    mats;

    notes;
    duree;
    temps;
    notesCrees;
    aAppuye;



    constructor()
    {
        this.estPret = false;
        this.pointDeVie = 3;
        this.ennemi = null;
        this.combatEnCours = false;

        this.scene = new BABYLON.Scene(ENGINE);
        //this.scene.debugLayer.show();

        this.UI = new CombatUI();
        this.scene.onBeforeRenderObservable.add(() => {
            this.UI.setTextFPS(Math.round(ENGINE.getFps())); 
        });

        this.creerCamera();
        const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), this.scene);
    



        this.zoneValide = null;
        this.zoneFin = null;
        this.importerDecor();
        

        
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
        this.mats = [matRouge, matBlue, matVert, matYellow, matTeal];



        this.notes = [[120, 0], [180, 1], [240, 2], [300, 3], [360, 4], [420, 4],  [480, 3], [540, 2], [600, 1], [660, 0]];
        this.duree = 600;
        this.temps = 0;
    
        this.notesCrees = [];
        this.aAppuye = false;

        
       
        this.scene.onBeforeRenderObservable.add(() => {
            if (this.estPret && this.combatEnCours)
            {            
                this.creerNotes();
                this.avancerNotes();
                this.supprimernotes();
                this.verifierSiGagner();
            }                
            this.temps++;
        });


        this.scene.onKeyboardObservable.add((kbInfo) => {
            if (this.estPret && this.combatEnCours)
            {
                switch (kbInfo.type) {
                    case BABYLON.KeyboardEventTypes.KEYDOWN:
                        if (!this.aAppuye)
                        {
                            this.aAppuye = true;

                            let aucuneNoteTouche = true;
                            let clone = [...this.notesCrees];

                            let touches = ["x", "c", "v", "b", "n"];
                            for (let i = 0; i < 5; i++)
                            {
                                if(kbInfo.event.key == touches[i])
                                {
                                    for (let note of clone)
                                    {
                                        if (note.ligne == i && note.getMesh().intersectsMesh(this.zoneValide)) {
                                            note.detruire();

                                            const index = this.notesCrees.indexOf(note);
                                            this.notesCrees.splice(index, 1);

                                            this.UI.setTextScore("Bien joué");
                                            aucuneNoteTouche = false;
                                        }
                                    }
                                }
                            }

                            if (aucuneNoteTouche)
                            {
                                this.UI.setTextScore("Aie");
                                //this.perdreUnPV();
                            }
                        }
                        break;
                        
                    case BABYLON.KeyboardEventTypes.KEYUP:
                        this.aAppuye = false;
                        break;
                }
            }
        });
    }


    creerCamera()
    {
        const camera = new BABYLON.FreeCamera("camera", new BABYLON.Vector3(0, 5, 18), this.scene);
        camera.setTarget(BABYLON.Vector3.Zero());
        /*camera.attachControl(CANVAS, true);
        camera.speed = 0.5;
        camera.angularSensibility = 4000;
        camera.keysUp.push(87);
        camera.keysUp.push(90);
        camera.keysRight.push(68);
        camera.keysDown.push(83);
        camera.keysLeft.push(81);*/
    }

    async importerDecor()
    {
        BABYLON.SceneLoader.ImportMeshAsync("", "combat/", "estrade.glb", this.scene).then(() => {
            this.zoneValide = this.scene.getMeshByName("ZoneValide");
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
            this.zoneValide.material = glass;

            this.zoneFin = this.scene.getMeshByName("ZoneFin");
            this.zoneFin.isVisible = false;

        this.estPret = true;
        });
    }




    creerNotes()
    {
        for (let couple of this.notes)
        {
            if(couple[0] === this.temps)
            {
                this.notesCrees.push(new Note(couple[1], this.mats[couple[1]], this.scene));
            }
        }
    }

    avancerNotes()
    {
        for (let note of this.notesCrees)
        {
            note.avancer();
        }
    }

    supprimernotes()
    {
        let clone = [...this.notesCrees];
        for (let note of clone)
        {
            if (note.getMesh().intersectsMesh(this.zoneFin)) {
                note.detruire();

                const index = this.notesCrees.indexOf(note);
                this.notesCrees.splice(index, 1);

                this.UI.setTextScore("Raté");

                this.perdreUnPV();
            }
        }
    }




    perdreUnPV()
    {
        this.pointDeVie -= 1;
        if(this.pointDeVie <= 0)
        {
            this.perdre();
        }
        this.UI.setTextVie("PV : " + this.pointDeVie);
    }

    verifierSiGagner()
    {
        if(this.temps >= 780)
        {
            this.gagner();
        }
    }

    gagner()
    {
        for (let note of this.notesCrees)
        {
            note.detruire();
        }
        this.notesCrees = [];
        this.combatEnCours = false;
        allerABikiniBottom();
    }

    perdre()
    {
        for (let note of this.notesCrees)
        {
            note.detruire();
        }
        this.notesCrees = [];
        this.combatEnCours = false;
        allerAuMenu();
    }


    setEnnemi(ennemi)
    {
        this.ennemi = ennemi;
    }

    lancer()
    {
        this.UI.setTextVie("PV : 3");
        this.UI.setTextScore("Bonne chance !");
        this.combatEnCours = true;
        this.pointDeVie = 3;
        this.temps = 0;
    }


    getScene()
    {
        return this.scene;
    }
}
