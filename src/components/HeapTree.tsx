import React, { useEffect, useState } from 'react';
import CytoscapeComponent from 'react-cytoscapejs';
import { Heap, MinHeap } from '../heap_classes/Heap';
import { ElementDefinition, ElementsDefinition } from 'cytoscape';
import { useAppSelector } from '../utils/hooks';
import { ProgressPlugin } from 'webpack';

function nodesAndEdges(inputHeap: Heap): ElementDefinition[] {
  const { heap } = inputHeap;
  const middle = 300;
  const range: number[] = [middle];
  const firstNode = { data: { id: (0).toString(), label: `Val: ${heap[0]}` }, position: { x: middle, y: 50 } }
  const nodes: ElementDefinition[] = [firstNode];
  const edges: ElementDefinition[] = [];
  const levels = Math.floor(Math.log2(heap.length));
  for (let i = 1; i < heap.length; i++) {
    const shift = ((i + 1) % 2) ? 1 : -1;
    const parent = Math.floor((i - 1) / 2)
    const parentNode = nodes[parent];
    const { position } = parentNode;
    const xpos = position.x + shift * range[parent] / 2;
    range.push(range[parent] / 2);
    const currNode = { data: { id: (i).toString(), label: `Val: ${heap[i]}` }, position: { x: xpos, y: position.y + (500 / levels) } }
    nodes.push(currNode);

    edges.push({ data: { source: `${parent}`, target: `${i}`, label: `Edge from ${parent} to ${i}` } })
  }
  return nodes.concat(edges);
}

const HeapTree = (inputHeap: Heap) => {

  const [heap, setHeap] = useState(inputHeap);
  // This will launch only if propName value has chaged.
  useEffect(() => { setHeap(inputHeap) }, [inputHeap]);

  const elements = nodesAndEdges(heap);

  return (
    <CytoscapeComponent key={heap.heap.length.toString()} elements={elements} style={{ width: '600px', height: '600px' }} />
  )
}

export default HeapTree;