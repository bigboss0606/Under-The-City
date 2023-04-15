class Note
{
    mesh;
    positionX;
    positionY;
    positionZ;

    constructor(positionX, scene)
    {        
        this.positionX = positionX;
        this.positionY = 2;
        this.positionZ = -1;

        this.mesh = BABYLON.MeshBuilder.CreateSphere("sphere", {diameter:0.3}, scene);
        this.mesh.position = new BABYLON.Vector3(this.positionX, this.positionY, this.positionZ);
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