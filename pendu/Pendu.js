class Pendu
{
    constructor()
    {
        this.scene = new BABYLON.Scene(ENGINE);
        this.scene.createDefaultCameraOrLight(true, true, true);
        this.camera = new BABYLON.ArcRotateCamera("camera", 4, 1.268, 40, new BABYLON.Vector3(0, 0, -10), this.scene);
        this.scene.registerBeforeRender(() => {

            let vitesse = 0.5;
            let rot = vitesse*ENGINE.getDeltaTime()/1000;
            this.camera.alpha += rot;//.rotate(this.pivotPourTournerAutourObjet, rot, BABYLON.Space.LOCAL);
        });
        this.scene.activeCamera = this.camera;


        //this.scene.debugLayer.show();

        this.mots = ["fashion crochet criminels", "je veux pas mourir", "torture", "assassins", "les moutons ont des droits", "satan a creer le crochet", "lets all love shrek", "zigounette"];
        this.alphabet = ["a", "z", "e", "r", "t", "y", "u", "i", "o", "p", "q", "s", "d", "f", "g", "h", "j", "k", "l", "m", "w", "x", "c", "v", "b", "n"];
        this.enCours = false;

        this.UI = new PenduUI();
        for(let i=0; i<26; i++)
        {  
            this.UI.listeBoutonsLettres[i].onPointerClickObservable.add(() => {
                this.testerLettre(this.alphabet[i]);
            });
        }

        
        this.scene.onKeyboardObservable.add((kbInfo) => {
            if(this.enCours && kbInfo.type == BABYLON.KeyboardEventTypes.KEYDOWN)
            {
                this.testerLettre(kbInfo.event.key);     
            }
        });


        BABYLON.SceneLoader.ImportMeshAsync("", "models/", "bateau.glb", this.scene);
    }


    testerLettre(lettre)
    {
        if(!this.enCours)
        {
            alert("la partie est finie");
            return;
        }

        if(!this.alphabet.includes(lettre))
        {
            alert("lettre illegale");
            return;
        }

        if(this.lettresTestees.includes(lettre))
        {
            alert("lettre deja testee");
            return;
        }
        this.lettresTestees.push(lettre);

        //Si la lettre est dans le mot
        if(this.motADecouvrir.includes(lettre))
        {
            for(let i=0; i < this.motADecouvrir.length; i++)
            {
                if(this.motADecouvrir.charAt(i) == lettre)
                {
                    this.morceauxDecouverts[i] = lettre;
                }
            }            
            this.UI.texte.text = this.morceauxDecouverts.join("");


            //La partie est finie : victoire
            if(!this.morceauxDecouverts.includes("-"))
            {
                this.enCours = false;
                this.UI.montrerBoutonGagne()
                joueurAGagne();
            }
        }

        else
        {
            this.nombreDErreurs++;

            this.UI.montrerImage(this.nombreDErreurs);
            this.UI.texteErreurs.text = 10 - this.nombreDErreurs + " vies restantes";

            if (this.nombreDErreurs == 10)
            {
                this.UI.texte.text = "Le mot était :\n" + this.motADecouvrir;
                this.enCours = false;
                this.UI.montrerBoutonPerdu();
                joueurAPerdu();
            }
        }
    }


    lancer()
    {
        this.musique = new BABYLON.Sound("musique", "musiques/le pénitencier.mp3", this.scene, null, { loop: true, autoplay: true });
        this.scene.attachControl();
        
        this.nombreDErreurs = 0;
        this.motADecouvrir = this.mots[Math.floor(Math.random() * this.mots.length)];
        this.lettresTestees = [];
        this.morceauxDecouverts = [];
        for(let i=0; i<this.motADecouvrir.length; i++)
        {
            if(this.motADecouvrir[i] == " ")
            {
                this.morceauxDecouverts.push(" ");
            }
            else
            {
                this.morceauxDecouverts.push("-");
            }
        }

        this.UI.cacherBoutonGagne();
        this.UI.cacherBoutonPerdu();
        this.UI.texte.text = this.morceauxDecouverts.join("");
        this.UI.texteErreurs.text = "10 vie restantes";
        this.UI.montrerImage(0);

        this.enCours = true;
    }

    arreter()
    {
        this.scene.detachControl();
        this.musique.dispose();
    }

    getScene()
    {
        return this.scene;
    }
}