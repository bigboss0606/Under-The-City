class Note
{
    mesh;
    positionX;
    positionY;
    positionZ;

    constructor(ligne, mat, scene)
    {        
        this.lignes = [0.84, 0.42, 0, -0.42, -0.84];
        this.couleurs = [(1, 0, 0), (1, 1, 0), (0, 1, 0), (0, 1, 1), (0, 0, 1)];

        this.ligne = ligne;
        this.positionX = this.lignes[this.ligne];
        this.positionY = 1.8;
        this.positionZ = -1;

        this.mesh = BABYLON.MeshBuilder.CreateSphere("sphere", {diameter:0.3}, scene);
        this.mesh.position = new BABYLON.Vector3(this.positionX, this.positionY, this.positionZ);
        this.mesh.scaling = new BABYLON.Vector3(1, 0.5, 2);
        
        this.mesh.material = mat;
    }

    avancer()
    {
        this.positionZ += 0.1;
        this.mesh.position = new BABYLON.Vector3(this.positionX, this.positionY, this.positionZ);
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