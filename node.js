/* Build a Node class/factory. Has attribute for data it stores as well as its left and right children */
export default class Node {
  constructor(data = null, left = null, right = null) {
    this.data = data;
    this.left = left;
    this.right = right;
  }
}
