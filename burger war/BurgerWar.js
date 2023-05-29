class BurgerWar
{
    constructor()
    {
        this.initiate();
    }

    async initiate()
    {
        await Ammo();

        this.scene = new BABYLON.Scene(ENGINE);

        const camera = new BABYLON.ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2.5, 10, new BABYLON.Vector3(0, 0, 0));
        camera.setTarget(BABYLON.Vector3.Zero());
        camera.attachControl(CANVAS, true);

        const  light = new BABYLON.DirectionalLight("dir01", new BABYLON.Vector3(0, -1, 1), this.scene);
        light.position = new BABYLON.Vector3(0, 15, -30);

        this.shadowGenerator = new BABYLON.ShadowGenerator(1024, light);

        this.scene.enablePhysics(new BABYLON.Vector3(0,-10,0), new BABYLON.AmmoJSPlugin());
        this.scene.getPhysicsEngine().setTimeStep(1 / 30)
        this.scene.getPhysicsEngine().setSubTimeStep(1);

        this.UI = new BurgerWarUI();


        this.score = 0;
        this.enCours = false;
        this.clones = [];

        let assiette;
        let fromage;
        let painDessous;
        let painDessus;
        let salade;
        let sauces;
        let steak;
        let tomate;

        BABYLON.SceneLoader.ImportMeshAsync("", "models/", "burger2.babylon", this.scene).then((newMeshes) => {
            assiette = this.scene.getMeshByName("Assiette");
            fromage = this.scene.getMeshByName("Fromage");
            painDessous = this.scene.getMeshByName("PainDessous");
            painDessus = this.scene.getMeshByName("PainDessus");
            salade = this.scene.getMeshByName("Salade");
            sauces = this.scene.getMeshByName("Sauces");
            steak = this.scene.getMeshByName("Steak");
            tomate = this.scene.getMeshByName("Tomate");
            
            let tab = [assiette, fromage, painDessous, painDessus, salade, sauces, steak, tomate];
            for (let x of tab) 
            {
                x.scaling.scaleInPlace(50);
                x.position = new BABYLON.Vector3(-10, 3, 0);
                x.isVisible = false;
            }
        });



        // Create ground collider
        var ground = BABYLON.MeshBuilder.CreateGround("ground1", {width:10, height:10, subdivisions:2});
        ground.physicsImpostor = new BABYLON.PhysicsImpostor(ground, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, friction: 0.5, restitution: 0.7 }, this.scene);
        ground.receiveShadows = true;


        this.UI.buttonFromage.onPointerClickObservable.add(() => {this.createObject(fromage, this.scene);});
        this.UI.buttonPainDessous.onPointerClickObservable.add(() => {this.createObject(painDessous, this.scene);});
        this.UI.buttonPainDessus.onPointerClickObservable.add(() => {this.createObject(painDessus, this.scene);});
        this.UI.buttonSalade.onPointerClickObservable.add(() => {this.createObject(salade, this.scene);});
        this.UI.buttonSauces.onPointerClickObservable.add(() => {this.createObject(sauces, this.scene);});
        this.UI.buttonSteak.onPointerClickObservable.add(() => {this.createObject(steak, this.scene);});
        this.UI.buttonTomates.onPointerClickObservable.add(() => {this.createObject(tomate, this.scene);});

        this.UI.buttonFixer.onPointerClickObservable.add(
            () => {
                if(!this.enCours)
                {
                    alert("partie finie");
                    return;
                }
    
                for (let x of this.clones) {
                    x.physicsImpostor.mass = 0;
                }
            }
        );

        this.UI.buttonNettoyer.onPointerClickObservable.add(
            () => {
                if(!this.enCours)
                {
                    alert("partie finie");
                    return;
                }

                this.score = 0;
                this.UI.text.text = "Score : 0";
                for (let x of this.clones) {
                    x.dispose();
                }
                this.clones = [];
            }
        );

        this.UI.buttonValider.onPointerClickObservable.add(
            () => {
                if(!this.enCours)
                {
                    alert("partie finie");
                    return;
                }

                this.enCours = false;

                for (let x of this.clones) {
                    x.physicsImpostor.mass = 0;
                }

                if(this.score >= 50)
                {
                    this.UI.montrerBoutonGagne();
                    joueurAGagne();
                }
                else
                {
                    this.UI.montrerBoutonPerdu();
                    joueurAPerdu();
                }
            }
        );


        this.scene.onBeforeRenderObservable.add(()=>
        {
            for(let el of this.clones)
            {
                if(el.position.y <= -10)
                {
                    el.dispose();
                }
            }
        });
    }

    createObject(obj, scene)
        {
            if(!this.enCours)
            {
                alert("partie finie");
                return;
            }


            let clone = obj.clone("clone");
            clone.isVisible = true;
            clone.position = new BABYLON.Vector3(0, 3, 0);
            clone.physicsImpostor = new BABYLON.PhysicsImpostor(clone, BABYLON.PhysicsImpostor.CylinderImpostor, { mass: 10, friction: 0.5, restitution: 0.3 }, scene);
            this.shadowGenerator.addShadowCaster(clone, true);
            this.clones.push(clone);

            this.score = Math.floor(Math.random()*101);
            this.UI.text.text = "Score : " + this.score;
        }


    lancer()
    {
        this.musique = new BABYLON.Sound("musique", "musiques/whopper-whopper.mp3", this.scene, null, { loop: true, autoplay: true });

        this.scene.attachControl();
        this.UI.cacherBoutonGagne();
        this.UI.cacherBoutonPerdu();
        this.enCours = true;

        for (let x of this.clones) {
            x.dispose();
        }
        this.clones = [];
    }

    arreter()
    {
        this.enCours = false;
        this.musique.dispose();
        this.scene.detachControl();
    }

    getScene()
    {
        return this.scene;
    }
}