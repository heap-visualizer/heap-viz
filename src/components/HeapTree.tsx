import React from 'react';
import { render } from 'react-dom';
import CytoscapeComponent from 'react-cytoscapejs';
import { Heap, MinHeap } from '../heap_classes/Heap';
import { ElementDefinition, ElementsDefinition } from 'cytoscape';

function nodesAndEdges(inputHeap: Heap): ElementDefinition[] {
  const { heap } = inputHeap;
  const middle = Math.floor(heap.length / 2) * 50;
  const range: number[] = [middle];
  const firstNode = { data: { id: (0).toString(), label: `Val: ${heap[0]}` }, position: { x: middle, y: 0 } }
  const nodes: ElementDefinition[] = [firstNode];
  const edges: ElementDefinition[] = [];
  for (let i = 1; i < heap.length; i++) {
    const shift = ((i + 1) % 2) ? 1 : -1;
    const parent = Math.floor((i - 1) / 2)
    const parentNode = nodes[parent];
    const { position } = parentNode;
    const xpos = position.x + shift * range[parent];
    range.push(range[parent] / 2);
    const currNode = { data: { id: (i).toString(), label: `Val: ${heap[i]}` }, position: { x: xpos, y: position.y + 100 } }
    nodes.push(currNode);

    edges.push({ data: { source: `${parent}`, target: `${i}`, label: `Edge from ${parent} to ${i}` } })
  }
  return nodes.concat(edges);
}


const HeapTree = (array: number[] = []) => {
  const heap = new MinHeap(array);

  const elements = nodesAndEdges(heap);

  console.log(elements);

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