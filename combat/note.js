class Note
{
    mesh;
    estRate;

    constructor(ligne, mesh)
    {        
        //this.lignes = [0.84, 0.42, 0, -0.42, -0.84];
        
        this.mesh = mesh;

        this.ligne = ligne;
        this.mesh.position.x *= -1;
        this.estRate = false;
    }

    avancer()
    {
        this.mesh.position.z += 0.1;
    }

    setEstRateTrue()
    {
        this.estRate = true;
    }

    getEstRate()
    {
        return this.estRate;
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