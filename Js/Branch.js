
class Branch {

	#id;
	#location;
	#numOfEmployees;
	#maxPeople;

	constructor(id, location, numOfEmployees, maxPeople) {
		this.#id = id;
		this.#location = location;
		this.#numOfEmployees = numOfEmployees;
		this.#maxPeople = maxPeople;
	}

	get id() {

		return this.#id;
	}

	get location() {
		
		return this.#location;
	}

	get numOfEmployees() {
		
		return this.#numOfEmployees;
	}

	get maxPeople() {
		
		return this.#maxPeople;
	}
}