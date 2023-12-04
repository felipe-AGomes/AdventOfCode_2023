const input = `Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11`;

class CardsService {
	games = [];
	constructor(cards) {
		this.games = cards.split('\n').map((game) => {
			const reviewer = game
				.match(/\d: ([\d\s]+) \|/)[1]
				.split(' ')
				.filter((number) => number !== '')
				.map((number) => Number(number));
			const play = game
				.match(/\| ([\d\s]+)$/)[1]
				.split(' ')
				.filter((number) => number !== '')
				.map((number) => Number(number));
			return {
				reviewer,
				play,
			};
		});
	}

	processPoints() {
		const result = [];
		for (let i = 0; i < this.games.length; i++) {
			const game = this.games[i];
			const numbers = game.reviewer.filter((reviewerNumber) => {
				return game.play.some((playNumber) => playNumber === reviewerNumber);
			});

			if (numbers.length > 0) {
				const copyGames = [...this.games];
				const firstStep = copyGames.slice(0, i + 1);
				const secondStep = copyGames.slice(i + 1);
				this.games = [
					...firstStep,
					...numbers.map((_, j) => copyGames[i + j + 1]),
					...secondStep,
				];

				result.push(numbers);
			}
		}

		return result;
	}
}

const cardsService = new CardsService(input);

console.log(cardsService.processPoints());
/*
console.log(
	cardsService
		.processPoints()
		.reduce((acc, curr) => acc + curr.reduce((acc, curr, i) => 2 ** i, 0), 0),
);
*/
