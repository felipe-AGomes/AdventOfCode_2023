let a = [1, 2, 3, 4, 5];

for (let i = 0; i < 10; i++) {
	let first;
	let secont;
	let nova;
	if (i === 2) {
		first = a.slice(0, i + 1);
		secont = a.slice(i + 1);
		nova = [100, 101, 102];
	}
	console.log(a[i]);
	if (first && secont && nova) {
		a = [...first, ...nova, ...secont];
	}
}
