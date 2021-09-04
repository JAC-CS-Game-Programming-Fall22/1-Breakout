import Graphic from "./Graphic.js";
import SoundPool from "./SoundPool.js";
import StateMachine from "./StateMachine.js";
import TitleScreenState from "./states/TitleScreenState.js";

export const canvas = document.querySelector('canvas');
export const context = canvas.getContext('2d');

export const CANVAS_WIDTH = canvas.width;
export const CANVAS_HEIGHT = canvas.height;

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
};

export const sounds = {
	// paddleHit: new Audio('./sounds/paddle_hit.wav'),
	paddleHit: new SoundPool('./sounds/paddle_hit.wav', 5, 0.5),
};

/**
 * The state machine we'll be using to transition between various states
 * in our game instead of clumping them together in our update and draw methods.
 *
 * Current game state can be any of the following:
 *   1. 'title-screen' (the beginning of the game, where we're told to press Enter)
 */
export const stateMachine = new StateMachine();

stateMachine.add('title-screen', new TitleScreenState());
