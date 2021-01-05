class Node {
  constructor (value, parentNode = null, prereq = null) {
    this.children = []
    this.value = value
    this.parent = parentNode
    this.prereq = prereq
  }

  addChild (value, prereq) {
    const node = new Node(value, this, prereq)
    this.children.push(node)
    return node
  }
}

export default Node
