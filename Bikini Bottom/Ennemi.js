class Ennemi
{
    mesh;
    chemin;
    temps;
    p;
    estVivant;
    experience;

    notes;


    constructor(mesh, position, rotation, chemin, vitesse, notes)
    {
        this.chemin = chemin;
        this.mesh = mesh;
        this.mesh.position = position;
        this.mesh.rotate(BABYLON.Vector3.Up(), BABYLON.Tools.ToRadians(rotation));
        this.temps = 0;
        this.p = 0;
        this.vitesse = vitesse;
        this.estVivant = true;
        this.experience = 10;
        this.notes = notes;
    }

    avancer()
    {
        if (this.estVivant)
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
    }

    getMesh()
    {
        return this.mesh;
    }
    
    getNotes()
    {
        return this.notes;
    }

    detruire()
    {
        this.estVivant = false;
        this.mesh.dispose();
    }
}