export function color_from_name(name: string) {
	const x = parseInt(name.slice(0, 3), 16) / 0x1000;
	const y = parseInt(name.slice(3, 6), 16) / 0x1000;
	let hue, sat;
	if (y < x && y != 0) {
		hue = x / y / 2;
		sat = y;
	}
	else if (y >= x && y != 1) {
		hue = x / (1 - y) / 2 + 0.5;
		sat = 1 - y;
	}
	else {
		hue = sat = 0;
	}
	sat = Math.pow(sat, 1 / 2.2);
	return `hsl(${Math.floor(hue * 360)}, ${Math.floor(sat * 100)}%, 40%)`;
}
