const lrs = require("lrs");

// 3 people generate their public/private key pairs;
const alice = lrs.gen();
const bob = lrs.gen();
const eve = lrs.gen();
const jake = lrs.gen();

// Store all the public keys in a group array
const group = [alice, bob, eve].map((m) => m.publicKey);

// Alice signs a message on behalf of one of the 3
const document = {
  line1: "blah blah blah",
  line2: false,
};
const signed1 = lrs.sign(group, alice, "Group Signing");

// Anyone is able to verify that one of them signed that message
const verified = lrs.verify(group, signed1, "Group Signing");
console.log("The sign has been verified as " + verified);

const signed2 = lrs.sign(group, alice, "Signing again");

const compared = lrs.link(signed1, signed2);

if (compared) {
  console.log("Both signatures are from the same person");
} else {
  console.log("Both signatures are not from the same person");
}
