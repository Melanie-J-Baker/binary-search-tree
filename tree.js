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

    // delete function which accepts a value to delete (will have to deal with several cases such as when a node has children or not)
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

    /* levelOrder function which accepts another function as a parameter.
    Traverse tree in breadth-first level order and provide each node as argument to provided function.
    Can be implemented using iteration or recursion (try both!). Should return an array of values if no function is given. 
    Tip: Use an array acting as a queue to keep track of all child nodes that you have yet to traverse and to add new ones to list - last in first out*/
    levelOrder (callback) {
        // Start with address of root node in queue
        // As long as queue has at least one discovered node, we can take out a node from the front, visit it, and then enqueue it's children
        // Visit the root
        // Traverse to left and right children -> add to queue
        // Move to next level

    }

    /* inorder, preorder, and postorder functions that accept a function parameter. 
    Each should traverse tree in their respective depth-first order and yield each node to provided function given as an argument. 
    Functions shouold return an array of values if no function is given */
    
    // left root right - gives you a sorted list
    inorder (root = this.root, result = []) {
        if (root === null) return;
        if (root.left) this.inorder(root.left, result);
        result.push(root.data);
        if (root.right) this.inorder(root.right, result);
    }
    // root left right - for each node read data, go left until no more left - then go up and right
    preorder (callback) {
        if (!this.root) return [];
        const stack = [this.root];
        const result = [];
        while (stack.length != 0) {
            const node = stack.pop();
            if (node.right) stack.push(node.right);
            if (node.left) stack.push(node.left);
            if (callback) callback(node);
            result.push(node.data);
        }
        if (!callback) return result;
    };
        
    // left right root
    postorder (root = this.root, result = []) {
        if (root === null) return;
        if (root.left) this.postorder(root.left, result);
        if (root.right) this.postorder(root.right, result);
        result.push(root.data);
        return result;
    };

    // height function which accepts a node and returns its height (defined as no of edges in longest path from a given node to a leaf node)
    height (node = this.root) {
        if (node === null) return -1;
        const heightLeft = this.height(node.left);
        const heightRight = this.height(node.right);
        return Math.max(heightLeft, heightRight) + 1;
    }

    // depth function which accepts a node and returns its depth (defined as the no of edges in path from a given node tree's root node)
    depth (node, root = this.root, level = 0) {

    };

    // isBalanced function which checks if tree is balanced (difference between heights of left subtree and right subtree of every node is not more than 1)
    isBalanced (node = this.root) {

    };

    // rebalance function which rebalances an unbalanced tree. Tip: Use a traversal method to provide a new array to the buildTree function
    rebalance () {

    };
}

