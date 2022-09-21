import { defaults } from "jest-config";

const jestConfig = {
	...defaults,
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
	transformIgnorePatterns: ["/node_modules/(?!(nanoid)/)"],
	extensionsToTreatAsEsm: [".ts", ".tsx"],
};

export default jestConfig;
