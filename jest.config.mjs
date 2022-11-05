import { defaults } from "jest-config";

const jestConfig = {
	...defaults,
	testMatch: ["**/?(*.)test.ts?(x)"],
	transform: {
		"^.+\\.(t|j)sx?$": [
			"@swc/jest",
			{
				jsc: {
					transform: {
						react: {
							runtime: "automatic",
						},
					},
				},
			},
		],
	},
	testEnvironment: "jsdom",
	transformIgnorePatterns: ["/node_modules/(?!(nanoid)/)"],
	extensionsToTreatAsEsm: [".ts", ".tsx"],
};

export default jestConfig;
