export interface Obstacles {
	x: number;
	y: number;
	width: number;
	height: number;
	update: Function;
}

export interface PlayerPosition {
	x: number;
	y: number;
}

export interface SingleObstacles {
	sX: number;
	sY: number;
	sWidth: number;
	sHeight: number;
	width: number;
	height: number;
}
