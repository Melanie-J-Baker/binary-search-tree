import Tree from "./tree.js";

//Create a BST from an array of random nos. Can create function that returns array of random numbers if you wish
const randomArr = (length) => {
  return Array.from({ length: length }, () => Math.floor(Math.random() * 100));
};

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

const tree = new Tree(randomArr(10));
prettyPrint(tree.root);
console.log("Balanced: ", tree.isBalanced());
console.log("Level Order: ", tree.levelOrder());
console.log("Preorder: ", tree.preorder());
console.log("Postorder: ", tree.postorder());
console.log("Inorder: ", tree.inorder());

tree.insert(350);
tree.insert(600);
tree.insert(900);
prettyPrint(tree.root);
console.log("Balanced: ", tree.isBalanced());
tree.rebalance();
prettyPrint(tree.root);
console.log("Balanced: ", tree.isBalanced());
console.log("Level Order: ", tree.levelOrder());
console.log("Preorder: ", tree.preorder());
console.log("Postorder: ", tree.postorder());
console.log("Inorder: ", tree.inorder());
