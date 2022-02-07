import Sprite from './Sprite.js';

class Brick extends Sprite {
  constructor(x, y, width = 75, height = 20, color = '#0095DD') {
    super(x, y, width, height, color);
    this.colors = ['#b5179e', '#560bad', '#480ca8', '#3f37c9', '#4895ef', '#4cc9f0'];
    this.color = this.colors[Math.floor(Math.random() * this.colors.length)];
    // console.log(this.colors[Math.floor(Math.random() * this.colors.length)]);
    // console.log(Math.random() * this.colors.length);
    this.status = 1;
  }
}

export default Brick;
