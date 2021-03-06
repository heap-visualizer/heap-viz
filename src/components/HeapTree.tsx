import React, { useEffect, useState } from 'react';
import CytoscapeComponent from 'react-cytoscapejs';
import { Heap, MinHeap } from '../heap_classes/Heap';
import { ElementDefinition, ElementsDefinition } from 'cytoscape';
import { HeapComponentProps } from './HeapArray';

function nodesAndEdges(inputHeap: Heap): ElementDefinition[] {
  const { heap } = inputHeap;
  if (!heap.length) return [];
  const middle = 300;
  const range: number[] = [middle];
  const firstNode = {
    data: { id: (0).toString(), label: `${heap[0]}` },
    position: { x: middle, y: 50 },
  };
  const nodes: ElementDefinition[] = [firstNode];
  const edges: ElementDefinition[] = [];
  const levels = Math.floor(Math.log2(heap.length));
  for (let i = 1; i < heap.length; i++) {
    const shift = (i + 1) % 2 ? 1 : -1;
    const parent = Math.floor((i - 1) / 2);
    const parentNode = nodes[parent];
    const { position } = parentNode;
    const xpos = position ? position.x + (shift * range[parent]) / 2 : middle;
    const ypos = position ? position.y + 400 / levels : 50;
    range.push(range[parent] / 2);
    const currNode = {
      data: { id: i.toString(), label: `${heap[i]}` },
      position: { x: xpos, y: ypos },
    };
    nodes.push(currNode);

    edges.push({
      data: {
        source: `${parent}`,
        target: `${i}`,
        label: `Edge from ${parent} to ${i}`,
      },
    });
  }
  return nodes.concat(edges);
}

const HeapTree = (props: HeapComponentProps) => {
  const { inputHeap, length } = props;

  const elements = nodesAndEdges(inputHeap);

  return (
    <>
      <CytoscapeComponent
        key={length}
        elements={elements}
        style={{ width: '600px', height: '500px' }}
      />
    </>
  );
};

export default HeapTree;
