const sha256 = require("js-sha256");

const document =
  "Give 50 BTC from my wallet 1A1zP1eP5QGefi2DMPTfTL4SLmv7DivfNa to Bob";

const hash = sha256(document);

console.log(
  `Alice hashes her document and recors the following hash value to the blockchain: ${hash}`
);

if (sha256(document) === hash) {
  console.log("Document is legit! :)");
} else {
  console.log("woah thats a fake document!");
}

const fake =
  "Give 50 BTC from my wallet 1A1zP1eP5QGefi2DMPTfTL4SLmv7DivfNa to Eve";

if (sha256(fake) === hash) {
  console.log("Document is legit! :)");
} else {
  console.log("woah thats a fake document!");
}
