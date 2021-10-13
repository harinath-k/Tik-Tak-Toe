import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  box: any[] = [];
  boxCount: number = 3;
  testCases: any[] = [];
  currentPlayer: number = 1;
  gameFinished: boolean = false;
  enteredCount: number = 0;
  ngOnInit() {
    if(this.boxCount > 2) {
      this.testCases = [];
      this.resetGame();
      this.formTestcases();
    } else {
      alert('Enter a valid number');
    }
  }
  resetGame() {
    this.box = [];
    this.currentPlayer = 1;
    this.gameFinished = false;
    this.enteredCount = 0;
    var row: any = Array.from(Array(this.boxCount).keys());
    row.fill('.', 0, this.boxCount);
    for (let i = 0; i < this.boxCount; i++) {
      this.box.push(JSON.parse(JSON.stringify(row)));
    }
  }
  formTestcases() {
    // horizontal and vertical check
    for (let i = 0; i < this.boxCount; i++) {
      var horizontal = [];
      var vertical = [];
      for (let j = 0; j < this.boxCount; j++) {
        horizontal.push({ x: i, y: j });
        vertical.push({ x: j, y: i });
      }
      this.testCases.push(horizontal);
      this.testCases.push(vertical);
    }
    // diagonal check
    var leftDiagonal = [];
    var rightDiagonal = [];
    for (
      let i = 0, j = this.boxCount - 1;
      i < this.boxCount, j >= 0;
      i++, j--
    ) {
      leftDiagonal.push({ x: i, y: i });
      rightDiagonal.push({ x: i, y: j });
    }
    this.testCases.push(leftDiagonal);
    this.testCases.push(rightDiagonal);
  }
  clicked(i: number, j: number) {
    if (this.box[i][j] === '.') {
      if (!this.gameFinished) {
        this.box[i][j] = this.currentPlayer === 1 ? 'X' : 'O';
        this.currentPlayer = this.currentPlayer === 1 ? 2 : 1;
        this.enteredCount++;
        this.checkTestcases();
      }
    }
  }
  checkTestcases() {
    for (let j = 0; j < this.testCases.length; j++) {
      let cas = this.testCases[j];
      let symbol: string = '';
      let count = 0;
      for (let i = 0; i < cas.length; i++) {
        let x = cas[i].x;
        let y = cas[i].y;
        if (this.box[x][y] && this.box[x][y] !== '.') {
          if (i === 0) {
            symbol = this.box[x][y];
          }
          if (this.box[x][y] === symbol) {
            count++;
          } else {
            break;
          }
        }
      }
      if (count === cas.length) {
        this.gameFinished = true;
        setTimeout(() => {
          alert(`Player ${symbol === 'X' ? '1' : '2'} win`);
        }, 100);
      }
    }
    if ((this.enteredCount-1 === this.boxCount * this.boxCount-1) && !this.gameFinished) {
      alert('Good try players..');
    }
  }
}
