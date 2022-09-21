import add from "../add";

describe("Add", () => {
	it("should add two numbers", () => {
		const expected = 3;
		const actual = add(1, 2);
		expect(expected).toEqual(actual);
	});
});
