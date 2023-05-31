class Construction
{
    etat;
    listeBatiment; // De la forme [[bat1, [true, false, false]], [bat2, [false, true, false]], ..., [batn, [false, false, true]]
    etatMax;


    constructor(listeBatiment, descriptions, etatMax, camera)
    {
        this.etat = 0;
        this.listeBatiment = listeBatiment;
        this.descriptions = descriptions;
        this.etatMax = etatMax;     
        this.montrerLesBatiments();

        this.camera = camera;
    }


    getDescription()
    {
        if(this.etat != this.etatMax)
        {
            return this.descriptions[this.etat];
        }
        else
        {
            return "Vous avez complété \n cette construction";
        }
    }


    interagir()
    {
        if(this.etat < this.etatMax)
        {
            this.etat++;
        }
        this.montrerLesBatiments();
    }


    montrerLesBatiments()
    {
        for(let el of this.listeBatiment)
        {
            let show = el[1][this.etat]
            el[0].setEnabled(show);

            for(let mesh of el[0].getChildren())
            {
                mesh.checkCollisions = show;
            }

        }
    }


    getCamera()
    {
        return this.camera;
    }
}