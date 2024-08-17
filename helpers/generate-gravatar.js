import crypto from "crypto";
import gravatar from "gravatar";

export const getGravatarUrl = (email) => {
  const trimmedEmail = email.trim().toLowerCase();
  const hash = crypto.createHash("sha256").update(trimmedEmail).digest("hex");
  const avatarURL = gravatar.url(hash, {
    s: "200",
    r: "g",
    d: "identicon",
  });
  return avatarURL;
};
