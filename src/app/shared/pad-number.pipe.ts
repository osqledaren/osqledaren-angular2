import {Pipe, PipeTransform} from "@angular/core";
import {forEach} from "@angular/router/src/utils/collection";

/**
 * Pads number to a number of digits with leading zero
 */
@Pipe({name: 'padNumber'})
export class PadNumberPipe implements PipeTransform {
    transform(value: number | string, digits: number): string {

        let padding: string;

        for (let i = 0; i < digits; i++){
            padding += "0";
        }

        let padded: string = ( padding + value.toString()).slice(-2);

        return padded;
    }
}
