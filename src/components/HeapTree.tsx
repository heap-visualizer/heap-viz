import React from 'react';
import { render } from 'react-dom';
import CytoscapeComponent from 'react-cytoscapejs';
import { MinHeap } from '../heap_classes/Heap';
import { ElementDefinition, ElementsDefinition } from 'cytoscape';

class GraphData implements ElementDefinition {
  data: { id: string; label: string; };
  position: { x: number; y: number; };

  constructor(id: string, label: string, x: number, y: number) {
    this.data = {
      id,
      label,
    }
    this.position = {
      x,
      y,
    }
  }
}

const HeapTree = (array: number[] = []) => {
  const heap = new MinHeap(array);

  const elements = heap.heap.reduce((acc: ElementDefinition[], curr: number, idx: number) => {
    const currNode = { data: { id: (idx + 1).toString(), label: `Index ${idx}` }, position: { x: idx * 100, y: idx * 100 } }
    acc.push(currNode);
    return acc;
  }, []);

  console.log(elements);
  elements.push({ data: { source: '1', target: '2', label: 'Edge from Node1 to Node2' } })

  const elements2 = [
    { data: { id: 'one', label: 'Node 1' }, position: { x: 0, y: 0 } },
    { data: { id: 'two', label: 'Node 2' }, position: { x: 100, y: 0 } },
    { data: { source: 'one', target: 'two', label: 'Edge from Node1 to Node2' } }
  ];

  console.log(elements2);

  return (
    <CytoscapeComponent elements={elements} style={{ width: '600px', height: '600px' }} />
  )
}

export default HeapTree;