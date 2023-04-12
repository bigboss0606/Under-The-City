class Musique
{
    musique;



    constructor(scene){
        this.musique = new BABYLON.Sound("music", "musique/relaxing.mp3", scene, null, { loop: true, autoplay: true });
    }



    lanceLaMusique(nom, scene)
    {
        this.musique.dispose();
        this.musique = new BABYLON.Sound("music", "musique/" + nom, scene, null, { loop: true, autoplay: true });
    }
}
