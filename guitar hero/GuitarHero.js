class GuitarHero
{
    constructor()
    {
        this.estPret = false;
        this.premiereFois = true;

        this.scene = new BABYLON.Scene(ENGINE);
        //this.scene.debugLayer.show();
        this.creerCamera();
        const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), this.scene);
    

        
        this.estPret = false;
        this.enCours = false;
        this.notesCrees = [];
        this.importerDecor();
    

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
            if (this.estPret && this.enCours)
            {
                this.creerNotes();
                this.avancerNotes();
                this.testerNotes();
                this.supprimernotes();
                this.verifierSiGagner();
            }
        });



        this.UI = new GuitarHeroUI();

        this.UI.buttonLancer.onPointerClickObservable.add(() => {
            if(this.estPret)
            {
                this.enCours = true;
                this.tempsDebut = Date.now();
                this.UI.cacherBoutonLancer();
            }
        });

        this.scene.onKeyboardObservable.add((kbInfo) => {
            if (this.estPret && this.enCours)
            { 
                switch (kbInfo.type) {
                    case BABYLON.KeyboardEventTypes.KEYDOWN:
                        if (!this.aAppuye)
                        {
                            this.aAppuye = true;

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

                                        }
                                    }
                                }
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
        BABYLON.SceneLoader.ImportMeshAsync("", "models/", "estrade2.glb", this.scene).then(() => {
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
            this.enCours = false;
            joueurAGagne();
            this.UI.montrerBoutonGagne();
        }
    }

    perdreUnPV()
    {
        this.pointDeVie -= 1;
        if(this.pointDeVie <= 0)
        {
            this.enCours = false;
            joueurAPerdu();
            this.UI.montrerBoutonPerdu();
        }
        this.UI.texteVie.text = "PV : " + this.pointDeVie;
    }



    lancer()
    {
        this.scene.attachControl();
        
        
        //this.musique = new BABYLON.Sound("music", "musique/coniferous-forest.mp3", this.scene, null, { loop: true, autoplay: true });
        this.scene.attachControl();

        for (let note of this.notesCrees)
        {
            note.detruire();
        }
        this.notesCrees = [];

        this.notes = [[2000, 0], [3000, 1], [4000, 2], [5000, 3], [6000, 4], [7000, 4],  [8000, 3], [9000, 2], [10000, 1], [11000, 0]];
        this.longueur = this.notes[this.notes.length - 1][0] + 2000;
        this.indexNoteCree = 0;

        this.pointDeVie = 3;
        this.UI.texteVie.text = "PV : " + this.pointDeVie;

        this.UI.cacherBoutonGagne();
        this.UI.cacherBoutonPerdu();
        this.UI.montrerBoutonLancer();
        if(this.premiereFois)
        {
            this.premiereFois = false;
            this.UI.montrerMenuAide();
        }
        
        this.aAppuye = false;
        this.enCours = false;
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