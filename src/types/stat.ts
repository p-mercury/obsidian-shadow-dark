export function getStatModifier(stat: number) {
	if (stat < 4) {
		return -4;
	} else if (stat < 6) {
		return -3;
	} else if (stat < 8) {
		return -2;
	} else if (stat < 10) {
		return -1;
	} else if (stat < 12) {
		return 0;
	} else if (stat < 14) {
		return +1;
	} else if (stat < 16) {
		return +2;
	} else if (stat < 18) {
		return +3;
	} else {
		return +4;
	}
}

export function getStatModifierString(stat: number) {
	if (stat < 4) {
		return "-4";
	} else if (stat < 6) {
		return "-3";
	} else if (stat < 8) {
		return "-2";
	} else if (stat < 10) {
		return "-1";
	} else if (stat < 12) {
		return "0";
	} else if (stat < 14) {
		return "+1";
	} else if (stat < 16) {
		return "+2";
	} else if (stat < 18) {
		return "+3";
	} else {
		return "+4";
	}
}
