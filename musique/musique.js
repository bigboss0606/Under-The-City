class Musique
{
    musique;



    constructor(){
        this.musique = null;
    }



    lanceLaMusique(nom, scene)
    {
        if (this.musique)
        {
            this.musique.dispose();
        }
        this.musique = new BABYLON.Sound("music", "musique/" + nom, scene, null, { loop: true, autoplay: true });
    }
}
