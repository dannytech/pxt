namespace pxtmelody {
    export class MelodyArray {
        // check that array is 9x8 
        private tempo: number = 120;
        private width: number = 8;
        private height: number = 8;
        private melody: boolean[][]; 

        // constructor
        constructor(tempo?: number) {
            if (tempo) this.tempo = tempo;
            // set all elements to false
            this.melody = new Array(this.width);
            for (var i = 0; i < this.width; i++) {
                this.melody[i] = new Array(this.height).fill(false);
            }
        }
        
        // setValue

        // getValue
        public getArray(): boolean[][] {
            return this.melody;
        }

        public setArray(array: boolean[][]): void {
            this.melody = array;
        }

        public getColor(row: number): number {
            // TODO
            return 0;
        }

        public getValue(row: number, col: number): boolean {
            return this.melody[row][col];
        }

        public getWidth(): number {
            return this.width;
        }

        public getHeight(): number {
            return this.height;
        }

        public copy(): boolean[][] {
            let copy = new MelodyArray();
            copy.setArray(this.getArray());
            return copy.getArray();
        }

        public updateMelody(row: number, col: number) {
            this.melody[row][col] = this.melody[row][col]? false:true;
        }


        // function to turn into string?
    }

    export function stringRepresentation(melodyArray: MelodyArray): string {
        let stringMelody: string = "";
        let melody = melodyArray.getArray();
        let queues: string[][];
        queues = new Array(melodyArray.getWidth());
        let numMelodies = 0;
        // create queues of notes
        for (var i = 0; i < melodyArray.getHeight(); i++) {
            let noteCount = 0;
            for (var j = 0; j < melodyArray.getWidth(); j++) {
                if (melody[j][i]) {
                    queues[i].push(noteConversion(j));
                    noteCount++;
                }
            }
            if (noteCount > numMelodies) {
                numMelodies = noteCount;
            }
        }
        // create strings of melodies
        for (var j = 0; j < numMelodies; j++) {
            for (var i = 0; i < melodyArray.getWidth(); i++) {
                if (queues[i] && queues[i].length > 1) { // if there is an element
                    stringMelody += " " + queues[i].pop();
                } else {
                    stringMelody += " R"; // add rest if there is no selection for the note
                }
            }
            stringMelody += "\n";
        }

        return stringMelody;
    }

    export function noteConversion(rowNum: number): string {
        let note: string = "";
        switch(rowNum) {
            case 0: note = "C"; break;
            case 1: note = "D"; break;
            case 2: note = "E"; break;
            case 3: note = "F"; break;
            case 4: note = "G"; break;
            case 5: note = "A"; break;
            case 6: note = "B"; break;
            case 7: note = "C5"; break;
        }
        return note;
    }
}