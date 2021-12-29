export interface Heap {
  heap: number[];

  buildHeap(array: number[]): number[];

  siftUp(start: number): number[];
  
  siftDown(start: number, end: number): number[];

  remove(): number;

  insert(val: number): void;

  peek(): number;

}

export class MaxHeap implements Heap {
  heap: number[];

  constructor(array: number[] = []) {
    this.heap = this.buildHeap(array);
  }

  buildHeap(array: number[]) {
    // Write your code here.
    this.heap = array;
    let i = array.length - 1;
    while (i > 0) {
      const parent = Math.floor((i - 1) / 2); // parent node
      this.siftDown(parent, array.length - 1);
      i -= 2;
    }
    return array;
  }

  siftUp(start: number) {
    let currIdx = start; // inserted
    let parent = Math.floor((currIdx - 1) / 2); // parent
    while (this.heap[currIdx] > this.heap[parent]) {
      swap(this.heap, parent, currIdx);
      currIdx = parent;
      parent = Math.floor((currIdx - 1) / 2);
    }
    return this.heap;
  }

  siftDown(start: number, end: number) {
    let parent = start;
    let left = parent * 2 + 1;
    while (left <= end) {
      const right = parent * 2 + 2 <= end ? parent * 2 + 2 : -1;
      let swapIdx;
      if (right !== -1 && this.heap[right] > this.heap[left]) {
        swapIdx = right;
      } else {
        swapIdx = left;
      }
      if (this.heap[swapIdx] > this.heap[parent]) {
        swap(this.heap, parent, swapIdx);
        parent = swapIdx;
        left = parent * 2 + 1;
      } else break;
    }
    return this.heap;
  }

  remove() {
    swap(this.heap, 0, this.heap.length - 1);
    const result = this.heap.pop();
    this.siftDown(0, this.heap.length - 1);
    return result;
  }

  insert(val: number) {
    this.heap.push(val);
    this.siftUp(this.heap.length - 1);
  }

  peek() {
    return this.heap[0];
  }
}

export class MinHeap implements Heap {
  heap: number[];

  constructor(array: number[] = []) {
    this.heap = this.buildHeap(array);
  }

  buildHeap(array: number[]) {
    // Write your code here.
    this.heap = array;
    let i = array.length - 1;
    while (i > 0) {
      const parent = Math.floor((i - 1) / 2); // parent node
      this.siftDown(parent, array.length - 1);
      i -= 2;
    }
    return array;
  }

  siftUp(start: number) {
    let currIdx = start; // inserted
    let parent = Math.floor((currIdx - 1) / 2); // parent
    while (this.heap[currIdx] < this.heap[parent]) {
      swap(this.heap, parent, currIdx);
      currIdx = parent;
      parent = Math.floor((currIdx - 1) / 2);
    }
    return this.heap;
  }
  siftDown(start: number, end: number) {
    let parent = start;
    let left = parent * 2 + 1;
    while (left <= end) {
      const right = parent * 2 + 2 <= end ? parent * 2 + 2 : -1;
      let swapIdx;
      if (right !== -1 && this.heap[right] < this.heap[left]) {
        swapIdx = right;
      } else {
        swapIdx = left;
      }
      if (this.heap[swapIdx] < this.heap[parent]) {
        swap(this.heap, parent, swapIdx);
        parent = swapIdx;
        left = parent * 2 + 1;
      } else break;
    }
    return this.heap;
  }
  remove() {
    swap(this.heap, 0, this.heap.length - 1);
    const result = this.heap.pop();
    this.siftDown(0, this.heap.length - 1);
    return result;
  }
  insert(val: number) {
    this.heap.push(val);
    this.siftUp(this.heap.length - 1);
  }
  peek() {
    return this.heap[0];
  }
}

export function swap(array: any[], i: number, j: number) {
  const temp = array[i];
  array[i] = array[j];
  array[j] = temp;
  return array;
}

// const min = new MinHeap([5, 10, 7, 1, 4, 6, 9, 12]);
// console.log(min);
// console.log(min.peek());
// console.log(min.remove());
// console.log(min);
// console.log(min.insert(0));
// console.log(min);

// const max = new MaxHeap([5, 10, 7, 1, 4, 6, 9, 12]);
// console.log(max);
// console.log(max.peek());
// console.log(max.remove());
// console.log(max);
// console.log(max.insert(15));
// console.log(max);
// console.log(max.insert(7));
// console.log(max);