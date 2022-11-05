import { readdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import pkg from "./package.json" assert { type: "json" };
import { swc } from "rollup-plugin-swc3";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function glob(pattern) {
	try {
		const files = await readdir(pattern, { withFileTypes: true });
		return files.filter(file => file.isFile()).map(({ name }) => name);
	} catch (err) {
		return [];
	}
}

const config = (await glob(path.resolve(__dirname, "src"))).map(filename => ({
	external(id) {
		return [
			...Object.keys({
				...(pkg.dependencies ?? {}),
				...(pkg.peerDependencies ?? {}),
			}),
		].some(key => id.startsWith(key) || id.startsWith("."));
	},
	input: `src/${filename}`,
	output: [
		{
			file: `dist/${filename.split(".")[0]}.js`,
			sourcemap: true,
			format: "cjs",
		},
		{
			file: `dist/${filename.split(".")[0]}.mjs`,
			sourcemap: true,
			format: "es",
		},
	],
	plugins: [
		swc({
			sourceMaps: true,
			jsc: {
				transform: {
					react: {
						runtime: "automatic",
					},
				},
			},
		}),
	],
}));

export default config;
