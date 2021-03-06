import React, { useEffect, useState } from 'react';
import CytoscapeComponent from 'react-cytoscapejs';
import { Heap, MinHeap } from '../heap_classes/Heap';
import { ElementDefinition, ElementsDefinition } from 'cytoscape';

function nodesAndEdges(inputHeap: Heap): ElementDefinition[] {
  const { heap } = inputHeap;
  const step = 550 / heap.length;
  const start = 300 - (step * (heap.length - 1) / 2)
  const nodes: ElementDefinition[] = [];
  const edges: ElementDefinition[] = [];
  for (let i = 0; i < heap.length; i++) {
    const currNode = { data: { id: (i).toString(), label: `${heap[i]}` }, position: { x: start + i * step, y: 50 } }
    nodes.push(currNode);
    if (i > 0) {
      edges.push({ data: { source: `${i - 1}`, target: `${i}`, label: `Edge from ${i - 1} to ${i}` } })
    }
  }
  return nodes.concat(edges);
}

export interface HeapComponentProps {
  inputHeap: Heap;
  length: string;
}

const HeapArray = (props: HeapComponentProps) => {
  const { inputHeap, length } = props;

  const elements = nodesAndEdges(inputHeap);

  return (
    <>
      <CytoscapeComponent key={length} elements={elements} style={{ width: '600px', height: '100px' }} />
    </>
  )
}

export default HeapArray;