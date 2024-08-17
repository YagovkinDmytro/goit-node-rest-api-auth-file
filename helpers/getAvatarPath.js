import * as fs from "node:fs/promises";
import path from "node:path";

const avatarsPath = path.resolve("public", "avatars");

export const getAvatarPath = async (data) => {
  const { path: oldPath, filename } = data;
  const newPath = path.join(avatarsPath, filename);
  const avatarPath = path.join("avatars", filename);

  await fs.rename(oldPath, newPath);

  return avatarPath;
};
