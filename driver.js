import Tree from "./tree.js";

//Create a BST from an array of random nos. Can create function that returns array of random numbers if you wish
const randomArr = (length) => {
    return Array.from({ length: length }, () => Math.floor(Math.random() * 100));
};

const prettyPrint = (node, prefix = '', isLeft = true) => {
    if (node.right !== null) {
        prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
    }
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
    if (node.left !== null) {
        prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
    }
}
    

const tree = new Tree(randomArr(10));
prettyPrint(tree.root);
console.log('Balanced:', tree.isBalanced());

// Confirm that tree is balanced by calling isBalanced

// Print out all elements in level, pre, post and in order

// Unbalance tree by adding several numbers > 100

// Confirm that tree is unbalanced by calling isBalanced

// Balance the tree by calling rebalance

// Confirm tree is balanced by calling isBalanced

// Print out all elements in level, pre, post, and in order