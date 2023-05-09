/* Build a Node class/factory. Should have attribute for data it stores as well as its left and right children */
export class Node {
    constructor(key = null, left = null, right = null) {
      this.key = key;
      this.left = left;
      this.right = right;
    }
}