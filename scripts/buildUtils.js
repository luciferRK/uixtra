import fs from "fs";

/**
 * Retrieves the component folders from the specified entry directory.
 *
 * @param {string} entry - The entry directory path.
 * @returns {string[]} - An array of component folder names.
 */
export const getComponentsFolders = (entry) => {
	const dirs = fs.readdirSync(entry);
	const dirsWithoutIndex = dirs.filter(
		(name) => name !== "index.ts" && name !== "utils"
	);
	return dirsWithoutIndex;
};
