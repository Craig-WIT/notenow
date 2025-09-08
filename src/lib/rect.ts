export default class Rect {
	x: number;
	y: number;
	width: number;
	height: number;

	constructor(_x: number, _y: number, _width: number, _height: number) {
		this.x = _x;
		this.y = _y;
		this.width = _width;
		this.height = _height;
	}

	getArea() {
		return this.width * this.height;
	}
}