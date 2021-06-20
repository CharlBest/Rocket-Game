import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  one = [
    3000,
    2000,
    2000,
    1000,
    500
  ];

  intervalCounterId: any;
  millisecondsRan = 0;
  activeIndex = 0;
  heightPercentage = 0;
  scoreMessage = '.';
  score = 0;
  countDown = 1;
  gameOver = false;

  ngOnInit() {
    this.count();
  }

  count() {
    const id = setInterval(() => {
      if (this.countDown >= 3) {
        this.move(this.one[this.activeIndex]);
        clearInterval(id);
        this.countDown++;
      } else {
        this.countDown++;
      }
    }, 1000);
  }

  proceed() {
    if (this.gameOver) {
      this.reset();
    }

    const milisecondsToRun = this.one[this.activeIndex];

    if (this.millisecondsRan >= (milisecondsToRun / 2) && this.millisecondsRan <= milisecondsToRun) {
      this.caculateAccuracy();
      clearInterval(this.intervalCounterId);
      this.activeIndex++;
      this.move(this.one[this.activeIndex]);
    }
  }

  move(milisecondsToRun: number) {
    this.millisecondsRan = 0;

    this.intervalCounterId = setInterval(() => {
      if (this.millisecondsRan >= milisecondsToRun) {
        clearInterval(this.intervalCounterId);
        this.scoreMessage = 'GAME OVER';
        this.gameOver = true;
      } else {
        this.millisecondsRan += 10;
        this.heightPercentage = this.millisecondsRan / milisecondsToRun * 100;
      }
    }, 10);
  }

  caculateAccuracy() {
    const percent = this.millisecondsRan / this.one[this.activeIndex] * 100;

    if (percent > 90 && percent <= 100) {
      this.scoreMessage = 'Perfect';
      this.score += 100;
    } else if (percent > 80 && percent <= 90) {
      this.scoreMessage = 'Awesome';
      this.score += 80;
    } else if (percent > 70 && percent <= 80) {
      this.scoreMessage = 'Great';
      this.score += 60;
    } else if (percent > 60 && percent <= 70) {
      this.scoreMessage = 'Good';
      this.score += 40;
    } else if (percent > 50 && percent <= 60) {
      this.scoreMessage = 'OK';
      this.score += 20;
    }
  }

  reset() {
    this.millisecondsRan = 0;
    this.activeIndex = 0;
    this.heightPercentage = 0;
    this.scoreMessage = '.';
    this.score = 0;
    this.countDown = 1;
    this.gameOver = false;

    this.count();
  }
}
