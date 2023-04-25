class BikiniBottom
{
    scene;


    constructor(){
        this.scene = new BABYLON.Scene(ENGINE);
        //this.scene.collisionsEnabled = true;
        //this.scene.debugLayer.show();


        const UI = new BikiniBottomUI();
        this.scene.onBeforeRenderObservable.add(() => {
            UI.setTextFPS(Math.round(ENGINE.getFps()));  
        });



        const camera = new BABYLON.FreeCamera("camera", new BABYLON.Vector3(-60, 2, 0), this.scene);
        camera.attachControl(CANVAS, true);

        /*camera.applyGravity = true;
        camera.checkCollisions = true;
        camera.ellipsoid = new BABYLON.Vector3(0.3,0.9,0.3);
        camera.minZ = 0.45;
        camera.speed = 0.5;
        camera.angularSensibility = 4000;*/

        camera.keysUp.push(87);
        camera.keysUp.push(90);
        camera.keysRight.push(68);
        camera.keysDown.push(83);
        camera.keysLeft.push(81);



        const light1 = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), this.scene);
        const light2 = new BABYLON.PointLight("light2", new BABYLON.Vector3(-4, 3, 4), this.scene);
        light2.intensity = 10;
        const light3 = new BABYLON.PointLight("light3", new BABYLON.Vector3(-4, 3, -4), this.scene);
        light3.intensity = 10;
        const light4 = new BABYLON.PointLight("light4", new BABYLON.Vector3(4, 3, 0), this.scene);
        light4.intensity = 10;



        BABYLON.SceneLoader.ImportMeshAsync("", "Bikini Bottom/", "Bikini Bottom.glb", this.scene);


 
        let burger;
        BABYLON.SceneLoader.ImportMeshAsync("", "resto/", "burger.babylon", this.scene).then((newMeshes) => {
            burger = this.scene.getMeshByName("Burger");

            let burger2 = new Ennemi(burger.createInstance("burger2"), new BABYLON.Vector3(-33, 0.75, -9), 235, [[90, 180], [180, 180]], 0.1, this.scene);
            let burger3 = new Ennemi(burger.createInstance("burger3"), new BABYLON.Vector3(-41, 0.75, 1), 205, [[120, 180], [240, 180]], 0.1, this.scene);
            let burger4 = new Ennemi(burger.createInstance("burger4"), new BABYLON.Vector3(-27, 0.75, -24), 250, [[80, 180], [160, 180]], 0.1, this.scene);
            let burger5 = new Ennemi(burger.createInstance("burger5"), new BABYLON.Vector3(-3, 0.75, -38), 185, [[120, 180], [240, 180]], 0.1, this.scene);
            let burger6 = new Ennemi(burger.createInstance("burger6"), new BABYLON.Vector3(2, 0.75, -38), 185, [[120, 180], [240, 180]], 0.1, this.scene);
            let burger7 = new Ennemi(burger.createInstance("burger7"), new BABYLON.Vector3(35, 0.75, -33), 280, [[85, 180], [170, 180]], 0.1, this.scene);
            let burger8 = new Ennemi(burger.createInstance("burger8"), new BABYLON.Vector3(36, 0.75, -6), 0, [[90, 180], [180, 180]], 0.1, this.scene);
            let burger1 = new Ennemi(burger, new BABYLON.Vector3(30, 0.75, 46), 220, [[75, 180], [150, 180]], 0.2, this.scene);

        });
    }


    getScene()
    {
        return this.scene;
    }
}
