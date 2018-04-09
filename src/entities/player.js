class Player {
	constructor(spriteStart) {
		this.height = 32;
		this.width = 32;
		this.image = new Image();
		this.image.src = 'public/imgs/multi-link.png';
		this.x = window.innerWidth / 2 - 16;
		this.y = window.innerHeight / 2 - 16;
		this.spriteStart = spriteStart;
		this.positions = {
			down: {
				x: this.spriteStart,
				y: 0
			},
			up: {
				x: this.spriteStart,
				y: 96
			},
			left: {
				x: this.spriteStart,
				y: 32
			},
			right: {
				x: this.spriteStart,
				y: 64
			}
		};
		this.currentPos = 'right'
		this.events();
	}
	events() {
		document.addEventListener('keydown', (e) => {
			if (e.keyCode === 39) {
				this.currentPos = 'right';
				this.x += 32;
				this.positions.right.x += 32;
				if (this.positions.right.x > 64) this.positions.right.x = this.spriteStart;
			}
			if (e.keyCode === 40) {
				this.currentPos = 'down';
				this.y += 32;
				this.positions.down.x += 32;
				if (this.positions.down.x > 64) this.positions.down.x = this.spriteStart;
			}
			if (e.keyCode === 37) {
				this.currentPos = 'left';
				this.x -= 32;
				this.positions.left.x += 32;
				if (this.positions.left.x > 64) this.positions.left.x = this.spriteStart;
			}
			if (e.keyCode === 38) {
				this.currentPos = 'up';
				this.y -= 32;
				this.positions.up.x += 32;
				if (this.positions.up.x > 64) this.positions.up.x = this.spriteStart;
			}
		});
	}
	render(ctx) {
		const position = this.positions[this.currentPos];
		ctx.drawImage(
			this.image,
			//Players position
			position.x,
			position.y,
			//Height of sprite
			this.height,
			this.width,
			//Position on image
			this.x,
			this.y,
			//Size of image
			32,
			32);
	}
}

export default Player;