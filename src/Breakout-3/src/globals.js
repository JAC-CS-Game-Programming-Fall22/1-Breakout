import Graphic from "./Graphic.js";
import SoundPool from "./SoundPool.js";
import StateMachine from "./StateMachine.js";
import PlayState from "./states/PlayState.js";
import TitleScreenState from "./states/TitleScreenState.js";

export const canvas = document.querySelector('canvas');
export const context = canvas.getContext('2d');

export const CANVAS_WIDTH = canvas.width;
export const CANVAS_HEIGHT = canvas.height;

export const TILE_SIZE = 16;

export const keys = {};

canvas.addEventListener('keydown', event => {
	keys[event.key] = true;
});

canvas.addEventListener('keyup', event => {
	keys[event.key] = false;
});

const fonts = [
	new FontFace('Joystix', 'url(./fonts/Joystix.ttf)'),
];

fonts.forEach((font) => {
	font.load().then(font => {
		document.fonts.add(font);
	});
})

export const images = {
	background: new Graphic('./images/background.png', CANVAS_WIDTH, CANVAS_HEIGHT),
	spriteSheet: new Graphic('./images/sprite_sheet.png', 1152, 1536),
};

export const sounds = {
	brickHit: new SoundPool('./sounds/brick_hit.wav', 10, 0.5),
	paddleHit: new SoundPool('./sounds/paddle_hit.wav', 5, 0.5),
	pause: new SoundPool('./sounds/pause.wav', 5, 0.5),
	wallHit: new SoundPool('./sounds/wall_hit.wav', 5, 0.5),
};

/**
 * The state machine we'll be using to transition between various states
 * in our game instead of clumping them together in our update and draw methods.
 *
 * Current game state can be any of the following:
 *   1. 'title-screen' (the beginning of the game, where we're told to press Enter)
 *   2. 'play' (the ball is in play, bouncing between paddles)
 */
export const stateMachine = new StateMachine();

stateMachine.add('title-screen', new TitleScreenState());
stateMachine.add('play', new PlayState());
