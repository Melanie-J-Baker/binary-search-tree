import Node from "./node.js";
/* Tree class/factory which accepts an array when initialised. Should have a root attribute which uses the return value of buildTree */
export default class Tree {
    constructor (arr) {
        this.root = this.buildTree(arr);
    }

    // Sort and remove duplicates
    prepareArr (arr) {
        const sorted = [...new Set(arr.sort((a, b) => a - b))];
        return sorted;
    }

    // buildTree function which takes an array of data and turns it into a balanced BST full of Node objects appropriately placed
    buildTree (arr) {
        //sort array and remove duplicates
        const prepared = this.prepareArr(arr);
        if (prepared.length === 0) return null;
        let mid = Math.floor(prepared.length / 2);
        let node = new Node(
            prepared[mid],
            this.buildTree(prepared.slice(0, mid)),
            this.buildTree(prepared.slice(mid + 1))
        );
        return node;
        //return level 0 root node
    }

    // insert function which accepts a value to insert
    insert (value, root = this.root) {
        if (root === null) return new Node(value);
        if (value < root.data) {
            root.left = insert(root.left, value);
        } else if (value > root.data) {
            root.right = insert(root.right, value);
        }
        return root;
    }

    // delete function - accepts value to delete
    delete (value, root = this.root) {
        if (root === null) {
            return root;
        } else if (root.data < value) {
            root.right = this.delete(value, root.right);
        } else if (root.data > value) {
            root.left = this.delete(value, root.left);
        } else {
            if (root.left === null) {
                return root.right;
            } else if (root.right === null) {
                return root.left;
            } else {
                const nextSmallest = (root) => {
                    let smallest = root.data;
                    let newRoot = root;
                    while (newRoot.left !== null) {
                        smallest = root.left.data;
                        newRoot = root.left;
                    }
                    return smallest;
                }
                root.data = nextSmallest(root.right);
                // Remove copied node from nextSmallest()
                root.right = this.delete(root.data, root.right);
            }
        }
        return root;
    }

    // find function which accepts a value and returns node with given value
    find (value, root = this.root) {
        if (root == null || root.data == value) return root;
        if (root.data < value) return this.find(value, root.right);
        return this.find(value, root.left);
    }

    /* levelOrder function which accepts function as a parameter.
    Traverse tree in breadth-first level order and provide each node as argument to provided function.
    Return array of values if no function is given */
    levelOrder (callback) {
        if (!this.root) return [];
        const q = [this.root];
        const result = [];
        while (q.length != 0) {
            let lvl = [];
            let qLength = q.length;
            for (let i = 0; i < qLength; i++) {
                const current = q.shift();
                lvl.push(current.data);
                if (current.left) q.push(current.left);
                if (current.right) q.push(current.right);
                if (callback) callback(current);
            }
            result.push(lvl);
        }
        if (!callback) return result;
    }

    /* inorder, preorder, and postorder functions that accept a function parameter. 
    Traverse tree in respective depth-first order and yield each node to provided function. 
    Functions should return an array of values if no function is given */
    
    // left root right - gives a sorted list
    inorder (root = this.root, callback, result = []) {
        if (!this.root) return [];
        if (root === null) return;
        this.inorder(root.left, callback, result);
        callback ? callback(root) : result.push(root.data);
        this.inorder(root.right, callback, result);
        if (result) return result;
    }
    // root left right
    preorder (callback) {
        if (!this.root) return [];
        const stack = [this.root];
        const result = [];
        while (stack.length != 0) {
            const current = stack.pop();
            if (current.right) stack.push(current.right);
            if (current.left) stack.push(current.left);
            if (callback) callback(current);
            result.push(current.data);
        }
        if (!callback) return result;
    };
        
    // left right root
    postorder (callback) {
        if (!this.root) return [];
        const stack = [this.root];
        const result = [];
        while (stack.length !== 0) {
            const current = stack.pop();
            if (current.left) stack.push(current.left);
            if (current.right) stack.push(current.right);
            if (callback) callback(current);
            result.push(current.data);
        }
        if (!callback) return result.reverse();
    };

    // height function which accepts a node and returns its height (no of edges in longest path from a given node to a leaf node)
    height (node = this.root) {
        if (node === null) return -1;
        const heightLeft = this.height(node.left);
        const heightRight = this.height(node.right);
        return Math.max(heightLeft, heightRight) + 1;
    }

    // depth function which accepts a node and returns its depth (defined as the no of edges in path from a given node tree's root node)
    depth (node, root = this.root, lvl = 0) {
        if (!node) return null;
        if (root === null) return 0;
        if (root.data === node.data) return lvl;
        let total = this.depth(node, root.left, lvl + 1);
        if (total !== 0) return total;
        return this.depth(node, root.right, lvl + 1);
    };

    // isBalanced function which checks if tree is balanced (difference between heights of left subtree and right subtree of every node is not more than 1)
    isBalanced (node = this.root) {
        const heightLeft = this.height(node.left);
        const heightRight = this.height(node.right);
        const difference = Math.abs(heightLeft - heightRight);
        if (difference < 2) {
            return true;
        } else {
            return false;
        }
    };

    // rebalance function which rebalances an unbalanced tree. 
    // Tip: Use a traversal method to provide a new array to the buildTree function
    rebalance () {

    };
}

