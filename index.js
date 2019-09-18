const { map } = require("ramda");
const Blockchain = require("./bc");

const bc = new Blockchain();

for (let i = 1; i <= 10; i++) {
  bc.addBlock({
    name: `Block #${i}`
  });
}
console.log(bc.chainIsValid());
console.log(bc.chain);
