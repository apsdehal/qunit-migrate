module.exports = Queue;

function Node(data) {
  this.data = data;
  this.next = null;
}

function Queue() {
  this.head = null;
  this.tail = null;
}

Queue.prototype.enqueue = function(data) {
  var newNode = new Node(data);

  if (this.head === null) {
    this.head = newNode;
    this.tail = newNode;
  } else {
    this.tail.next = newNode;
    this.tail = newNode;
  }
}

Queue.prototype.dequeue = function() {
  var newNode;
  if (this.head !== null) {
    newNode = this.head.data;
    this.head = this.head.next;
  }
  return newNode;
}

Queue.prototype.top = function() {
  var value;
  if (this.head !== null) {
    value = this.head.data;
  } else {
    value = null;
  }
  return value;
}