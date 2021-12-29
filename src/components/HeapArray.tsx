import React from 'react';
import CytoscapeComponent from 'react-cytoscapejs';
import { Heap, MinHeap } from '../heap_classes/Heap';
import { ElementDefinition, ElementsDefinition } from 'cytoscape';

function nodesAndEdges(inputHeap: Heap): ElementDefinition[] {
  const { heap } = inputHeap;
  const step = 550 / heap.length;
  const nodes: ElementDefinition[] = [];
  const edges: ElementDefinition[] = [];
  for (let i = 0; i < heap.length; i++) {
    const currNode = { data: { id: (i).toString(), label: `${heap[i]}` }, position: { x: i * step + 50, y: 50 } }
    nodes.push(currNode);
    if (i > 0) {
      edges.push({ data: { source: `${i - 1}`, target: `${i}`, label: `Edge from ${i - 1} to ${i}` } })
    }
  }
  return nodes.concat(edges);
}

const HeapArray = (heap: Heap) => {
  const elements = nodesAndEdges(heap);

  return (
    <CytoscapeComponent elements={elements} style={{ width: '600px', height: '100px' }} />
  )
}

export default HeapArray;