import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface University {
  id: string
  namear: string
  nameen: string
  colleges: {[key:string]:College}
}
export interface College {
  id: string
  namear: string
  nameen: string
  departments: {[key:string]:Department}
}
export interface Department {
  id: string
  namear: string
  nameen: string
}


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class MohserModule {
  physics1: Department = {
    id:"",
    namear:"",
    nameen:""
  }
  biology1: Department = {
    id: "55im2F3YU69KNvXq7gbB",
    namear: "علوم الحياة",
    nameen: "Biology"
  }
  science1:College = {
    id:"0OglVgU5ZoCToFF4kUwN",
    namear:"كلية العلوم",
    nameen:"College of Science",
    departments:{"a":this.physics1, "b":this.biology1}
  }
  managbus1:College = {
    id:"11ClYZa4CzW92onzENMa",
    namear:"كلية الادارة الاقتصاد",
    nameen:"",
    departments:{}
  }
  dent1:College = {
    id:"6eEZhWNwgFXOkltc781h",
    namear:"كلية طب الاسنان",
    nameen:"",
    departments:{}
  }
  qedu1:College = {
    id:"8AeXAwEZXZGejDZs7uSF",
    namear:"كلية التربية-قرنة",
    nameen:"",
    departments:{}
  }
  sport1:College = {
    id:"FOZaaV7pFW3240sEGV50",
    namear:"كلية الرياضة والتربية البدنية",
    nameen:"",
    departments:{}
  }
  zahra1:College = {
    id:"FsoY4ptf96dsRfMxpeqi",
    namear:"كلية طب الزهراء",
    nameen:"",
    departments:{}
  }
  qmangbus1:College = {
    id:"Iumf6O4pXyl7rrzhzLPf",
    namear:"كلية الادارة والاقتصاد - قرنة",
    nameen:"",
    departments:{}
  }
  it1:College = {
    id:"OASQyf1x5jTPgEHluR2j",
    namear:"كلية علوم الحاسوب وتكنلوجيا المعلومات",
    nameen:"",
    departments:{}
  }
  law1:College = {
    id:"TMr9hw1SL5d0q0z2cnBf",
    namear:"كلية القانون",
    nameen:"",
    departments:{}
  }
  nurs1:College = {
    id:"Xik9r6FDoJEZfCrG6xHt",
    namear:"كلية التمريض",
    nameen:"",
    departments:{}
  }
  marinsci1:College = {
    id:"qgqZYaNznDniz7khgEh1",
    namear:"كلية علوم البحار",
    nameen:"",
    departments:{}
  }
  puresci1:College = {
    id:"ecPx82NnDWdoB1aETdCt",
    namear:"كلية التربية للعلوم الصرفة",
    nameen:"",
    departments:{}
  }
  edugirls1:College = {
    id:"fwEpnjYvqswgCBPRikvE",
    namear:"كلية التربية للبنات",
    nameen:"",
    departments:{}
  }
  pharm1:College = {
    id:"gXF6ph0m7bTAyCUvbkzH",
    namear:"كلية الصيدلة",
    nameen:"",
    departments:{}
  }
  vet1:College = {
    id:"gxLBKHLRYaTspMYTjKvc",
    namear:"كلية الطب البيطري",
    nameen:"",
    departments:{}
  }
  eng1:College = {
    id:"iwYyk9U6yquaAYnrmyiT",
    namear:"كلية الهندسة",
    nameen:"",
    departments:{}
  }
  eduhuman1:College = {
    id:"mTIsbfG49g4NSDmp6Yiy",
    namear:"كلية التربية للعلوم الانسانية",
    nameen:"",
    departments:{}
  }
  finart1:College = {
    id:"n72o2mOGadegV231MZei",
    namear:"كلية الفنون الجميلة",
    nameen:"",
    departments:{}
  }
  agr1:College = {
    id:"tVBLDFDotxNG1hVpa3Ov",
    namear:"كلية الزراعة",
    nameen:"",
    departments:{}
  }
  med1:College = {
    id:"uzmekZZIKYPmKeVTUFFa",
    namear:"كلية الطب",
    nameen:"",
    departments:{}
  }
  art1:College = {
    id:"vtZJ14uNvaQtOzkqNpht",
    namear:"كلية الآداب",
    nameen:"",
    departments:{}
  }
  basrah:University = {
    id: "JN0Pn7NcEpXjMnONDuUV",
    namear: "جامعة البصرة",
    nameen: "University of Basrah",
    colleges:{
      "0OglVgU5ZoCToFF4kUwN":this.science1,
      "11ClYZa4CzW92onzENMa":this.managbus1,
      "6eEZhWNwgFXOkltc781h":this.dent1,
      "8AeXAwEZXZGejDZs7uSF":this.qedu1,
      "FOZaaV7pFW3240sEGV50":this.sport1,
      "FsoY4ptf96dsRfMxpeqi":this.zahra1,
      "Iumf6O4pXyl7rrzhzLPf":this.qmangbus1,
      "OASQyf1x5jTPgEHluR2j":this.it1,
      "TMr9hw1SL5d0q0z2cnBf":this.law1,
      "Xik9r6FDoJEZfCrG6xHt":this.nurs1,
      "ecPx82NnDWdoB1aETdCt":this.puresci1,
      "fwEpnjYvqswgCBPRikvE":this.edugirls1,
      "gXF6ph0m7bTAyCUvbkzH":this.pharm1,
      "gxLBKHLRYaTspMYTjKvc":this.vet1,
      "iwYyk9U6yquaAYnrmyiT":this.eng1,
      "mTIsbfG49g4NSDmp6Yiy":this.eduhuman1,
      "n72o2mOGadegV231MZei":this.finart1,
      "qgqZYaNznDniz7khgEh1":this.marinsci1,
      "tVBLDFDotxNG1hVpa3Ov":this.agr1,
      "uzmekZZIKYPmKeVTUFFa":this.med1,
      "vtZJ14uNvaQtOzkqNpht":this.art1,
    }
  }
  currentUniversity:University = this.basrah;
 }
