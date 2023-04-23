class Ennemi
{
    mesh;
    chemin;
    temps;
    p;
    scene;
    estVivant;


    constructor(mesh, position, rotation, chemin, vitesse, scene)
    {
        this.chemin = chemin;
        this.mesh = mesh;
        this.mesh.position = position;
        this.mesh.rotate(BABYLON.Vector3.Up(), BABYLON.Tools.ToRadians(rotation));
        this.temps = 0;
        this.p = 0;
        this.vitesse = vitesse;
        this.scene = scene;
        this.estVivant = true;


        this.scene.onBeforeRenderObservable.add(() => {
            if (this.estVivant)
            {
                this.mesh.moveWithCollisions(this.mesh.forward.scaleInPlace(this.vitesse));
                this.temps++;

                if (this.temps == this.chemin[this.p][0])
                {
                    this.mesh.rotate(BABYLON.Vector3.Up(), BABYLON.Tools.ToRadians(this.chemin[this.p][1]));
                    this.p++;

                    if (this.p == this.chemin.length)
                    {
                        this.p = 0;
                        this.temps = 0;
                    }
                }
            }
        });


        this.mesh.actionManager = new BABYLON.ActionManager(this.scene);
        this.mesh.actionManager.registerAction(
            new BABYLON.ExecuteCodeAction(
                BABYLON.ActionManager.OnPickTrigger,
                () => {allerAuCombat(this);
                }
            )
        );
    }

    detruire()
    {
        this.estVivant = false;
        this.mesh.dispose();
    }
}