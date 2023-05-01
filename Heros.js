class Heros
{
    pointDeVieMax;
    niveau;
    experience;


    constructor()
    {
        this.pointDeVieMax = 3;
        this.niveau = 1;
        this.experience = 0;
    }


    getPointDeVieMax()
    {
        return this.pointDeVieMax;
    }

    gagnerExperience(XP)
    {
        let texte;
        this.experience += XP;

        if (this.experience >= this.niveau*10)
        {
            this.experience -= this.niveau*10;
            this.niveau++;
            this.pointDeVieMax++;            
            texte = "Niveau " + this.niveau + " atteint!";
        }
        else
        {
            texte = "XP : " + this.experience + " / " + this.niveau * 10;
        }

        return texte;
    }
}