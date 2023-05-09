/* Build a Node class/factory. Should have attribute for data it stores as well as its left and right children */
export class Node {
    constructor (data = null, left = null, right = null) {
      this.data = data;
      this.left = left;
      this.right = right;
    }
}