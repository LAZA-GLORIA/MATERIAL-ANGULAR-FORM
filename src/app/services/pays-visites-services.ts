import { Injectable } from "@angular/core";
import { PaysVisites } from "../models/pays-vistes.model";

@Injectable({
    providedIn: 'root'
})

export class PaysVisitesService {

  paysVisites: string[] = ["France", "Allemagne", "Pays-Bas"]; 


    // paysVisites: PaysVisites[] = [
    //   {
    //   //  id: 1,
    //     name:"France"
    //   },
    //   {
    //    // id: 2,
    //     name:"Allemagne"
    //   },
    //   {
    //    // id: 3,
    //     name:"Pays-Bas"
    //   }     
    //   ]; 

      getAllPaysVisites() {
        return this.paysVisites;
      }

}