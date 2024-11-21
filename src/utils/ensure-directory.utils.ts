import fs from "fs";

export const ensureDirectoryExists = (filePath: string): void => {
  if (!fs.existsSync(filePath)) {
    fs.mkdirSync(filePath, { recursive: true });
  }
};

export default ensureDirectoryExists;
