class Ennemi
{
    constructor(mesh, position, rotation, chemin, vitesse)
    {
        this.chemin = chemin;
        this.mesh = mesh;
        this.mesh.position = position;
        this.mesh.rotate(BABYLON.Vector3.Up(), BABYLON.Tools.ToRadians(rotation));
        this.temps = 0;
        this.p = 0;
        this.vitesse = vitesse;
    }

    avancer()
    {
        this.mesh.moveWithCollisions(this.mesh.forward.scaleInPlace(this.vitesse * ENGINE.getDeltaTime() / 1000));
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

    getMesh()
    {
        return this.mesh;
    }

    detruire()
    {
        this.mesh.dispose();
    }
}