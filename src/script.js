import Player from './entities/player';
import { shuffle } from './utils';
const app = {};

app.canvas = document.getElementById('game');
app.canvas.width = window.innerWidth;
app.canvas.height = window.innerHeight;
app.ctx = app.canvas.getContext('2d');
app.player = new Player(0);
app.tilesX = Math.ceil(app.canvas.width / 32);
app.tilesY = Math.ceil(app.canvas.height / 32);

const getRandomElmFromArray = arr => arr[Math.floor(Math.random() * arr.length)];

const createRandomArrayFromLength = (array, length) => { 
	const arr = [];
	for(let i = 0; i < length; i++) {
		arr.push(getRandomElmFromArray(array));
	}
	return arr;
};

app.setUpMap = function() {
	let tiles = createRandomArrayFromLength([0, 32, 64], app.tilesY * app.tilesX);
	
	return () => {
		for (let x = 0; x < app.tilesX; x++) {
			for (let y = 0; y < app.tilesY; y++) {
				app.ctx.drawImage(
					app.mapImages,
					tiles[x + app.tilesY + y],
					0,
					32,
					32,
					x * 32,
					y * 32,
					32,
					32);
			}
		}
	};
};

app.getRandomNumber = () => Math.floor(Math.random() * 100);

app.setUpRandomPlants = () => {
	const randomTilesX = createRandomArrayFromLength([0], app.tilesX);
	const randomTilesY = createRandomArrayFromLength([0,32],app.tilesY);
	//All the 0's are used to add more gaps in the random plants
	//Must be a better way to do this. 
	let tiles = createRandomArrayFromLength([0,0,0,0,0,1,2],app.tilesY * app.tilesX);

	return () => {
		for (let x = 0; x < app.tilesX; x++) {
			for (let y = 0; y < app.tilesY; y++) {
				if(tiles[x * app.tilesY + y] !== 0) {
					app.ctx.drawImage(
						app.plantImages,
						tiles[x * app.tilesY + y],
						0,
						32,
						32,
						x * 32,
						y * 32,
						32,
						32);
				}
			}
		}
	};
};


app.gameLoop = function() {

	app.ctx.fillStyle = 'white';
	// app.ctx.fillRect(0,0,window.innerWidth,window.innerHeight);
	app.renderMap();
	app.renderPlants();
	app.player.render(app.ctx);
	app.frame = requestAnimationFrame(app.gameLoop);
	
};

app.loadImages = function(path,key) {
	return new Promise((resolve, reject) => {
		if(app[key] === undefined) {
			app[key] = new Image();
		}
		app[key].src = path;
		app[key].onload = resolve;
	})
};

app.renderMap = app.setUpMap();
app.renderPlants = app.setUpRandomPlants();

app.init = function() {
	Promise.all([
			app.loadImages('public/imgs/hyptosis_tile-art-batch-3-small.png','mapImages'),
			app.loadImages('public/imgs/plants.png','plantImages')
	])
		.then(_ => {
			app.renderMap()
			app.renderPlants();
		})
		.then(app.gameLoop);
};

window.onload = app.init;

window.app = app;