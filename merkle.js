const { MerkleTree } = require("merkletreejs");
const crypto = require("crypto");

let leaves;
let tree;
let layers;
let root;
let proof;
let verified;

function sha256(data) {
  // The crypto.createHash() method is used to create Hash instances.
  // That can be used to generate hash digests usin gthe given algorithm , 'sha256'
  // Update method: Updates the hash content with the given data
  // Calculates the digest of all of the data passed to the hashed (using the hash.update() method)
  return crypto.createHash("sha256").update(data).digest();
}

const createLeaves = () => {
  leaves = ["a", "b", "c"].map((x) => sha256(x));
  console.log("========= Leaves =========");
  console.log(leaves);
};

// Constructs a new Merkle Tree with the hashed leaves and the hashing function
const createTree = () => {
  tree = new MerkleTree(leaves, sha256);
  console.log("========= Tree =========");
  console.log(tree);
};

//  Returns an array of all layers of Merkle Tree, including leaves and root
const getLeaves = () => {
  leaves = tree.getLeaves();
  console.log("========= Leaves =========");
  console.log(leaves);
};

// Returns array of all layers of Merkle Tree, including leaves and root.
const getLayers = () => {
  layers = tree.getLayers();
  console.log("========= Layers =========");
  console.log(layers);
};

// Returns the Merkle root hash
const getRoot = () => {
  root = tree.getRoot();
  console.log("========= Root =========");
  console.log(root);
};

// Returns the proof for a target leaf
const getProof = () => {
  proof = tree.getProof(leaves[2]);
  console.log("========= Proof =========");
  console.log(proof);
};

// Returns true if the proof path (array of hashes) can connect the target node to the Merkle root
// proof: The proof that should connect target node, which is leaves[2] to Merkle root.
// Then we are comparing this proof back to the hashed target node
const verifyNode = () => {
  verified = tree.verify(proof, leaves[1], root);
  console.log("Verified to be: ");
  console.log(verified);
};

createLeaves();
createTree();
getLeaves();
getLayers();
getRoot();
getProof();
verifyNode();
