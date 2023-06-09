class Maison
{
    constructor()
    {
        this.planDeTravailActif = null;
        this.miniJeu = "piano";
        this.estPret = false;


        this.scene = new BABYLON.Scene(ENGINE);
        this.scene.clearColor = new BABYLON.Color3(0, 0.8, 1);
        this.scene.gravity = new BABYLON.Vector3(0, -0.1, 0);
        //this.scene.debugLayer.show();
        this.scene.collisionsEnabled = true;
        this.UI = new MaisonUI();

        
        this.camera = new BABYLON.FreeCamera("camera", new BABYLON.Vector3(0.6, 1.4, 8), this.scene);
        this.camera.target = new BABYLON.Vector3(0.6, 1.3, 7);
        this.camera.attachControl(CANVAS, true);
        this.camera.checkCollisions = true;
        this.camera.applyGravity = true;
        this.camera.ellipsoid = new BABYLON.Vector3(0.5, 0.5, 0.5);
        this.camera.keysUp.push(90); 
        this.camera.keysDown.push(83); 
        this.camera.keysRotateLeft.push(81); 
        this.camera.keysRotateRight.push(68);

        const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), this.scene);

        this.creerUI();


        BABYLON.SceneLoader.ImportMeshAsync("", "models/", "truc.glb", this.scene)
        .then(() => {
            let sol = this.scene.getNodeByName("Sol");
            sol.checkCollisions = true;


            let limites = this.scene.getNodeByName("Limites");
            limites.isVisible = false;
            limites.checkCollisions = true;

            

            let tente = this.scene.getNodeByName("Tente");
            let chalet = this.scene.getNodeByName("Chalet");

            let cameraChalet = new BABYLON.ArcRotateCamera("camera chalet", 1.5385, 1.1502, 15, new BABYLON.Vector3(0, 0, 0), this.scene);
            this.planDeTravailChalet = new Construction([[tente, [false, true, false]], [chalet, [false, false, true]]], ["Bienvenue, \ntaper les notes au bon moment pour debloquer\n votre habitation : une tente", "Améliorer votre tente en \n un magnifique chalet"], 2, cameraChalet);
            
            let ecranChalet = this.scene.getNodeByName("Ecran chalet");
            let advancedTextureChalet = BABYLON.GUI.AdvancedDynamicTexture.CreateForMesh(ecranChalet);
            let buttonChalet = BABYLON.GUI.Button.CreateSimpleButton("but1", "Suck My Kiss");
            buttonChalet.width = 1;
            buttonChalet.height = 1;
            buttonChalet.color = "white";
            buttonChalet.fontSize = 80;
            buttonChalet.background = "green";
            buttonChalet.onPointerUpObservable.add(() => {
                this.planDeTravailActif = this.planDeTravailChalet;
                this.miniJeu = "guitar hero";
                this.montrerUI();
            });
            advancedTextureChalet.addControl(buttonChalet);



            let arbreSansCabane = this.scene.getNodeByName("Arbre sans cabane");
            let cabaneDansArbre = this.scene.getNodeByName("Cabane dans arbre");

            let cameraCabane = new BABYLON.ArcRotateCamera("camera cabane", 1.3, 1.44, 18, new BABYLON.Vector3(-15, 3, -18), this.scene);
            this.planDeTravailCabane = new Construction([[arbreSansCabane, [true, false]], [cabaneDansArbre, [false, true]]], ["Debloquer une cabane \ndans un arbre"], 1, cameraCabane);
            
            let ecranCabane = this.scene.getNodeByName("Ecran cabane");
            let advancedTextureCabane = BABYLON.GUI.AdvancedDynamicTexture.CreateForMesh(ecranCabane);
            let buttonCabane = BABYLON.GUI.Button.CreateSimpleButton("but2", "I think it's all because of you");
            buttonCabane.width = 1;
            buttonCabane.height = 1;
            buttonCabane.color = "white";
            buttonCabane.fontSize = 50;
            buttonCabane.background = "green";
            buttonCabane.onPointerUpObservable.add(() => {
                this.planDeTravailActif = this.planDeTravailCabane;
                this.miniJeu = "burger war";
                this.montrerUI();
            });
            advancedTextureCabane.addControl(buttonCabane);


            let balancoire = this.scene.getNodeByName("Balancoire");
            //let solAireJeu = this.scene.getNodeByName("Sol aire jeu");
            let tobogan = this.scene.getNodeByName("Tobogan");
            let tourniquet = this.scene.getNodeByName("Tourniquet");
            let tyrolienne = this.scene.getNodeByName("Tyrolienne");
            
            let cameraAirJeu = new BABYLON.ArcRotateCamera("camera air jeu", 3.4, 1.33, 18, new BABYLON.Vector3(35, 5, 26), this.scene);
            this.planDeTravailAirJeu = new Construction([[balancoire, [false, true, true, true]], [tobogan, [false, false, false, true]], [tourniquet, [false, true, true, true]], [tyrolienne, [false, false, true, true]]], ["Construisez votre parc pour enfants \n un peu comme Disney mais avec que 4 trucs", "Debloquer une affreuse tyrolienne", "Débloquer une super cabane"], 3, cameraAirJeu);
            
            let ecranAirJeu = this.scene.getNodeByName("Ecran air jeu");
            let advancedTextureAirJeu = BABYLON.GUI.AdvancedDynamicTexture.CreateForMesh(ecranAirJeu);
            let buttonAirJeu = BABYLON.GUI.Button.CreateSimpleButton("but3", "Do you want more?");
            buttonAirJeu.width = 1;
            buttonAirJeu.height = 1;
            buttonAirJeu.color = "white";
            buttonAirJeu.fontSize = 50;
            buttonAirJeu.background = "green";
            buttonAirJeu.onPointerUpObservable.add(() => {
                this.planDeTravailActif = this.planDeTravailAirJeu;
                this.miniJeu = "spongebob race";
                this.montrerUI();
            });
            advancedTextureAirJeu.addControl(buttonAirJeu);


            let potager = this.scene.getNodeByName("Potager");
            let puit = this.scene.getNodeByName("Puit");
                  
            let cameraPotager = new BABYLON.ArcRotateCamera("camera potager", 0.65, 1.5, 6, new BABYLON.Vector3(-11, 1.5, 11), this.scene);
            this.planDeTravailPotager = new Construction([[potager, [false, true, true]], [puit, [false, false, true]]], ["be green", "vert"], 5, cameraPotager);
            
            let ecranPotager = this.scene.getNodeByName("Ecran potager");
            let advancedTexturePotager = BABYLON.GUI.AdvancedDynamicTexture.CreateForMesh(ecranPotager);
            let buttonPotager = BABYLON.GUI.Button.CreateSimpleButton("but4", "The night's not over");
            buttonPotager.width = 1;
            buttonPotager.height = 1;
            buttonPotager.color = "white";
            buttonPotager.fontSize = 50;
            buttonPotager.background = "green";
            buttonPotager.onPointerUpObservable.add(() => {
                this.planDeTravailActif = this.planDeTravailPotager;
                this.miniJeu = "pendu";
                this.montrerUI();
            });
            advancedTexturePotager.addControl(buttonPotager);


            this.estPret = true;
        });



        this.doitMontrerNouvelObjet = false;
        this.anglePourTournerAutourObjet = 0;
        this.aMontreObjet = false;

        this.scene.registerBeforeRender(() => {
            if(this.doitMontrerNouvelObjet)
            {
                this.scene.activeCamera = this.cameraPourTournerAutourObjet;

                let vitesse = 1.6;
                let rot = vitesse*ENGINE.getDeltaTime()/1000;
                this.anglePourTournerAutourObjet += rot;
                this.cameraPourTournerAutourObjet.alpha += rot;//.rotate(this.pivotPourTournerAutourObjet, rot, BABYLON.Space.LOCAL);
                if (this.anglePourTournerAutourObjet >= 6.28 && !this.aMontreObjet)
                {
                    this.planDeTravailActif.interagir();
                    this.aMontreObjet = true;
                }
                if (this.anglePourTournerAutourObjet >= 12.56)
                {
                    this.doitMontrerNouvelObjet = false;
                    this.anglePourTournerAutourObjet = 0;
                    this.aMontreObjet = false;

                    this.scene.activeCamera = this.camera;
                }
            }
        });
    }


    gagner()
    {
        this.cameraPourTournerAutourObjet = this.planDeTravailActif.getCamera();
        this.doitMontrerNouvelObjet = true;
    }

    perdre()
    {

    }



    creerUI()
    {
        this.advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");

        this.panneau = new BABYLON.GUI.Grid();
        this.panneau.addRowDefinition(0.8);
        this.panneau.addRowDefinition(100, true);
        this.panneau.addRowDefinition(0.1);
        this.panneau.addRowDefinition(100, true);
        this.panneau.addRowDefinition(0.1);
        this.panneau.addColumnDefinition(1);

        this.panneau.width = "80%";
        this.panneau.height = "80%";
        this.panneau.background = "#1388AF";
        this.panneau.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
        this.panneau.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_CENTER;

        
        this.texte = new BABYLON.GUI.TextBlock();
        this.texte.width = "800px";
        this.texte.height = "400px";
        this.texte.text = "truc";
        this.texte.color = "white";
        this.texte.fontSize = 30;
        this.panneau.addControl(this.texte, 0, 0);

        this.boutonRetour = BABYLON.GUI.Button.CreateSimpleButton("but", "Retour");
        this.boutonRetour.width = "200px";
        this.boutonRetour.height = "100px";
        this.boutonRetour.background = "#FF0000";
        this.boutonRetour.cornerRadius = 30;
        this.boutonRetour.fontSize = 30;
        this.boutonRetour.color = "white";
        this.boutonRetour.onPointerUpObservable.add(() => {
            this.cacherUI();
        });
        this.panneau.addControl(this.boutonRetour, 1, 0);

        this.boutonJouer = BABYLON.GUI.Button.CreateSimpleButton("but", "Jouer");
        this.boutonJouer.width = "200px";
        this.boutonJouer.height = "100px";
        this.boutonJouer.background = "#FF0000";
        this.boutonJouer.cornerRadius = 30;
        this.boutonJouer.fontSize = 30;
        this.boutonJouer.color = "white";
        this.boutonJouer.onPointerUpObservable.add(() => {
            aller(this.miniJeu);
            this.cacherUI();
        });
        this.panneau.addControl(this.boutonJouer, 3, 0);
    }

    montrerUI()
    {
        this.texte.text = this.planDeTravailActif.getDescription();
        this.advancedTexture.addControl(this.panneau);
    }

    cacherUI()
    {
        this.advancedTexture.removeControl(this.panneau);
    }


    lancer()
    {
        this.musique = new BABYLON.Sound("musique", "musiques/I Hate U All - Pleasantries.mp3", this.scene, null, { loop: true, autoplay: true });
        this.scene.attachControl();
        this.enCours = true;
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