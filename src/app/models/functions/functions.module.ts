import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class FunctionsModule { 
  now(){
    let cd = new Date();
    let mm = cd.getMonth()+1;
    let m = "" + mm
    m.length == 1? m="0"+m : m=m;
    let d = "" + cd.getDate()
    d.length == 1? d="0"+d : d=d;
    let nd = cd.getFullYear() + "-" + m + "-" + d
    return nd;
  }
  nowtime(){
    let t = new Date();
    let h = t.getHours();
    let m = t.getMinutes();
    let nt = h + ':' + m;
    return nt;
  }
  examtimestatus(ed, et, long){
    let int = new Date(ed+' ' + et).getTime()
    if(et){
      let inta = et.split(":")
      let int2 = parseInt(inta[0])+long + ':' + inta[1]
      let int3 = new Date(ed+' '+int2).getTime()
      let nt = new Date().getTime()
      if(int > nt){
        return 1
      }else if (int <= nt && int3 >= nt){
        return 2
      }else{
        return 3
      }
    }
  }
  morningevening(study){
    let r = 0;
    if(study == 'مسائي'){
      r = 1
    }
    return r;
  }
  convertstage(stage){
    let s = 1
    if(stage == 'المرحلة الثانية'){
      s = 2
    }else if(stage == 'المرحلة الثالثة'){
      s = 3
    }else if(stage == 'المرحلة الرابعة'){
      s = 4
    }else if(stage == 'المرحلة الخامسة'){
      s = 5
    }else if(stage == 'المرحلة السادسة'){
      s = 6
    }else if(stage == 'الدبلوم العالي'){
      s = 7
    }else if(stage == 'الماجستير'){
      s = 8
    }else if(stage == 'الدكتوراه'){
      s = 9
    }
    return s;
  }
  arday(rday){
    let day = new Date(rday).getDay()
    let d = ''
    if(day == 0){
      return 'الاحد';
    }else if(day == 1){
      return 'الاثنين';
    }else if(day == 2){
      return 'الثلاثاء';
    }else if(day == 3){
      return 'الاربعاء';
    }else if(day == 4){
      return 'الخميس';
    }else if(day == 5){
      return 'الجمعة';
    }else if(day == 6){
      return 'السبت';
    }
  }
}
