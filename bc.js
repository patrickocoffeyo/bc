const hash = require("object-hash");
const { last, inc, dec, isEmpty, filter } = require("ramda");

class Block {
  constructor(index, timestamp, metadata, previousHash) {
    this.index = index;
    this.timestamp = timestamp;
    this.metadata = metadata;
    this.previousHash = previousHash;
    this.hash = this.calculateHash();
  }

  calculateHash() {
    return hash({
      index: this.index,
      timestamp: this.timestamp,
      metadata: this.metadata,
      previousHash: this.previousHash
    });
  }
}

class Blockchain {
  constructor() {
    this.chain = [this.createGenesisBlock()];
  }

  createGenesisBlock() {
    return new Block(0, Date.now(), {}, 0);
  }

  addBlock(metadata = {}) {
    const latest = last(this.chain);
    this.chain.push(
      new Block(inc(latest.index), Date.now(), metadata, latest.hash)
    );
  }

  chainIsValid() {
    // Find invalid blocks in the chain.
    const invalidBlocks = filter(block => {
      // If this is the genesis block, there is no need to validate.
      if (block.index === 0) {
        return false;
      }

      // Get the current block and previous block from the chain.
      const current = this.chain[block.index];
      const previous = this.chain[dec(block.index)];

      // Re-caclualte the current block's hash and check it against it's stored hash.
      const currentHashIsValid = current.hash === current.calculateHash();
      // Check the validity of the current block's previousHash.
      const previousHashIsValid = current.previousHash === previous.hash;

      // If both the current block and it's previous block are valid, false.
      return !currentHashIsValid || !previousHashIsValid;
    })(this.chain);
    return isEmpty(invalidBlocks);
  }
}

module.exports = Blockchain;
