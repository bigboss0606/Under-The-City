class Note
{
    mesh;
    positionX;
    positionY;
    positionZ;

    constructor(ligne, scene)
    {        
        this.lignes = [-1.2, -0.6, 0, 0.6, 1.2];

        this.ligne = ligne;
        this.positionX = this.lignes[this.ligne];
        this.positionY = 2;
        this.positionZ = -1;

        this.mesh = BABYLON.MeshBuilder.CreateSphere("sphere", {diameter:0.3}, scene);
        this.mesh.position = new BABYLON.Vector3(this.positionX, this.positionY, this.positionZ);
        this.mesh.scaling = new BABYLON.Vector3(1, 1, 2);
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