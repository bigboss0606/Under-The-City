class Combat
{
    scene;
    UI;

    estPret;
    pointDeVie;

    zoneValide;

    notes;
    notesCrees;
    aAppuye;


    constructor()
    {
        this.estPret = false;

        this.scene = new BABYLON.Scene(ENGINE);
        //this.scene.debugLayer.show();
        this.creerCamera();
        const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), this.scene);
    
        this.UI = new CombatUI();

        
        this.importerDecor();
    

        this.notesCrees = [];
        this.aAppuye = false;


        this.scene.onKeyboardObservable.add((kbInfo) => {
            if (this.estPret)
            {            
                let touches = ["x", "c", "v", "b", "n"];
                switch (kbInfo.type) {
                    case BABYLON.KeyboardEventTypes.KEYDOWN:
                        for (let i = 0; i < 5; i++)
                        {
                            if(kbInfo.event.key == touches[i])
                            {
                                this.machins[i].isVisible = true;
                            }
                        }
                        break;
                        
                    case BABYLON.KeyboardEventTypes.KEYUP:
                        for (let i = 0; i < 5; i++)
                        {
                            if(kbInfo.event.key == touches[i])
                            {
                                this.machins[i].isVisible = false;
                            }
                        }
                        break;
                }
            }
        });

        this.scene.onBeforeRenderObservable.add(() => {
            this.UI.setTextFPS(Math.round(ENGINE.getFps()));
        });

        this.UI.buttonLancer.onPointerClickObservable.add(() => {
            if(this.estPret)
            {
                this.tempsDebut = Date.now();
                this.boucleJeu = this.scene.onBeforeRenderObservable.add(() => {
                    this.creerNotes();
                    this.avancerNotes();
                    this.testerNotes();
                    this.supprimernotes();
                    this.verifierSiGagner();
                });

                this.testerInputs = this.scene.onKeyboardObservable.add((kbInfo) => {
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
                });
                this.UI.cacherBoutonLancer();
            }           
        });

        this.UI.buttonGagner.onPointerClickObservable.add(() => {
            this.UI.cacherBoutonGagner();
            quitterCombat();
            allerABikiniBottom();
        });

        this.UI.buttonPerdre.onPointerClickObservable.add(() => {
            this.UI.cacherBoutonPerdre();
            quitterCombat();
            allerAuMenu();
        });
    }


    creerCamera()
    {
        const camera = new BABYLON.FreeCamera("camera", new BABYLON.Vector3(0, 5, 16), this.scene);
        camera.setTarget(new BABYLON.Vector3(0, 2.2, 0));
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
        BABYLON.SceneLoader.ImportMeshAsync("", "combat/", "estrade2.glb", this.scene).then(() => {
            this.zoneValide = this.scene.getMeshByName("ZoneValide");
            this.zoneValide.isVisible = false;
            this.zoneDestruction = this.scene.getMeshByName("ZoneDestruction");
            this.zoneDestruction.isVisible = false;
            this.zoneNoteRate = this.scene.getMeshByName("ZoneNoteRate");
            this.zoneNoteRate.isVisible = false;

            this.machinRouge = this.scene.getMeshByName("Machin rouge");
            this.machinBleu = this.scene.getMeshByName("Machin bleu");
            this.machinVert = this.scene.getMeshByName("Machin vert");
            this.machinJaune = this.scene.getMeshByName("Machin jaune");
            this.machinCyan = this.scene.getMeshByName("Machin cyan");
            this.machinRouge.isVisible = false;
            this.machinVert.isVisible = false;
            this.machinBleu.isVisible = false;
            this.machinJaune.isVisible = false;
            this.machinCyan.isVisible = false;
            this.machins = [this.machinRouge, this.machinBleu, this.machinVert, this.machinJaune, this.machinCyan];

            this.noteRouge = this.scene.getMeshByName("Note rouge");
            this.noteBleu = this.scene.getMeshByName("Note bleu");
            this.noteVert = this.scene.getMeshByName("Note verte");
            this.noteJaune = this.scene.getMeshByName("Note jaune");
            this.noteCyan = this.scene.getMeshByName("Note cyan");
            this.noteRouge.isVisible = false;
            this.noteBleu.isVisible = false;
            this.noteVert.isVisible = false;
            this.noteJaune.isVisible = false;
            this.noteCyan.isVisible = false;
            this.notesMesh = [this.noteRouge, this.noteBleu, this.noteVert, this.noteJaune, this.noteCyan];

        this.estPret = true;
        });
    }


    lancer()
    {
        this.musique = new BABYLON.Sound("music", "musique/coniferous-forest.mp3", this.scene, null, { loop: true, autoplay: true });
        this.scene.attachControl();

        for (let note of this.notesCrees)
        {
            note.detruire();
        }
        this.notesCrees = [];

        this.notes = ENNEMI.getNotes();
        this.longueur = this.notes[this.notes.length - 1][0] + 2000;
        this.indexNoteCree = 0;

        this.UI.setTextScore("Bonne chance !");
        this.pointDeVie = HEROS.getPointDeVieMax();
        this.UI.setTextVie("PV : " + this.pointDeVie);

        this.UI.montrerBoutonLancer();
    }

    quitter()
    {
        this.musique.dispose();
        this.scene.detachControl();
    }


    creerNotes()
    {
        let noteActuelle = this.notes[this.indexNoteCree];
        if (this.indexNoteCree < this.notes.length && Date.now() - this.tempsDebut >= noteActuelle[0])
        {
            this.notesCrees.push(new Note(noteActuelle[1], this.notesMesh[noteActuelle[1]].createInstance("note")));
            this.indexNoteCree++;
        }
    }

    avancerNotes()
    {
        for (let note of this.notesCrees)
        {
            note.avancer();
        }
    }

    testerNotes()
    {
        let clone = [...this.notesCrees];
        for (let note of clone)
        {
            if (!note.getEstRate() && note.getMesh().intersectsMesh(this.zoneNoteRate)) {
                this.perdreUnPV();
                this.UI.setTextScore("Raté");
                note.setEstRateTrue();
            }
        }
    }

    supprimernotes()
    {
        let clone = [...this.notesCrees];
        for (let note of clone)
        {
            if (note.getMesh().intersectsMesh(this.zoneDestruction)) {
                note.detruire();

                const index = this.notesCrees.indexOf(note);
                this.notesCrees.splice(index, 1);
            }
        }
    }

    verifierSiGagner()
    {
        if(Date.now() - this.tempsDebut >= this.longueur)
        {
            this.gagner();
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


    gagner()
    {
        this.scene.onBeforeRenderObservable.remove(this.boucleJeu);
        this.scene.onKeyboardObservable.remove(this.testerInputs);

        let texte = HEROS.gagnerExperience(10);
        this.UI.setTexteExperience(texte)

        supprimerEnnemi();
        this.UI.montrerBoutonGagner();
    }

    perdre()
    {
        this.scene.onBeforeRenderObservable.remove(this.boucleJeu);
        this.scene.onKeyboardObservable.remove(this.testerInputs);
        this.UI.montrerBoutonPerdre();
    }
  


    getScene()
    {
        return this.scene;
    }
}
