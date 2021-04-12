
class Bus {

	#id;
	#model;
	#maxCapacity;
	#ltrPerKm;

	constructor(id, model, maxCapacity, ltrPerKm) {
		this.#id = id;
		this.#model = model;
		this.#maxCapacity = maxCapacity;
		this.#ltrPerKm = ltrPerKm;
	}

	get id() {

		return this.#id;
	}

	get model() {

		return this.#model;
	}

	get maxCapacity() {

		return this.#maxCapacity;
	}

	get ltrPerKm() {

		return this.#ltrPerKm;
	}
}