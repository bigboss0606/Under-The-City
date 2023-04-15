class Opertura
{
    scene;



    constructor(){}



    async initiate()
    {
        this.scene = new BABYLON.Scene(engine);

        //this.scene.debugLayer.show();

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


        let notes = [[0, -1.2], [60, -0.6], [120, 0], [180, 0.6], [240, 1.2], [360, -1.2],  [360, -0.6], [360, 0], [360, 0.6], [360, 1.2]];
        let i = 0;

        let notesCrees = [];

       
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
                for (let note of notesCrees)
                {
                    if (note.getMesh().intersectsMesh(zoneValide)) {
                        console.log(1);
                        
                    }

                    if (note.getMesh().intersectsMesh(zoneFin)) {
                        note.detruire();

                        const index = notesCrees.indexOf(note);
                        notesCrees.splice(index, 1);
                    }

                    note.avancer();
                }
                i++;
            }
        });
    }

    getScene()
    {
        return this.scene;
    }
}
