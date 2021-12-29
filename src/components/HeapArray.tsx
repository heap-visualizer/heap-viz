import React, { useEffect, useState } from 'react';
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

export interface HeapArrayProps {
  inputHeap: Heap;
  length: string;
}

const HeapArray = (props: HeapArrayProps) => {

  console.log('component', props);
  const { inputHeap, length } = props;
  const [heap, setHeap] = useState(inputHeap);
  // This will launch only if propName value has chaged.
  useEffect(() => { setHeap(inputHeap) }, [inputHeap]);

  const elements = nodesAndEdges(heap);

  return (
    <><CytoscapeComponent key={length} elements={elements} style={{ width: '600px', height: '100px' }} />
    <div>length = {length}</div></>
  )
}

export default HeapArray;