import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'markMatchedWords'
})
export class MarkMatchedWordsPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    let output = "";
    if(arg != ""){
      let outputList = [];
      let wordsList = value.split(" ");
      wordsList.forEach(function (item, index) {
        let indexOf = item.toLowerCase().indexOf(arg.toLowerCase());
        if( indexOf > -1){
          let k = item.substring(indexOf, item.length);
          let found = k.substring(0, arg.length);
          let replaced = item.replace(found, "<strong>"+found+"</strong>");
          outputList.push(replaced);
        }else{
          outputList.push(item);
        }
      });
      output = outputList.join(" ");
    }else{
      output = value;
    }
    return output;
  }

}
