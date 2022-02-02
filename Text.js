import Sprite from './Sprite.js';

class Text extends Sprite {
  constructor(x, y, color, font) {
    super(x, y, 0, 0, color);
    this.font = font;
  }

  render(ctx, message) {
    ctx.font = this.font;
    ctx.fillStyle = this.color;
    ctx.fillText(message, this.x, this.y);
  }
}

export default Text;
