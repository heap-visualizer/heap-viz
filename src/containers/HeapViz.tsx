// import path from 'path/posix';
import React from 'react';
import { Navigate } from 'react-router-dom';
import SavedProjects from '../components/SavedProjects';
import { useAppSelector } from '../utils/hooks';
import MaxHeapComponent from './MaxHeap';
import MinHeapComponent from './MinHeap';
import OptionsPanel from './OptionsPanel';

const HeapViz = () => {
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
  return (
    <div id="heapViz" className="heapViz">
      <div className="heapVizNav">
        <OptionsPanel />
      </div>
      <div className="mainCols">
        <div className="saved">
          <SavedProjects />
        </div>

        <div className="vizContainer">
          <div>
            <MinHeapComponent />
          </div>
          <div>
            <MaxHeapComponent />
          </div>
        </div>
      </div>
      {!isLoggedIn && <Navigate to="/" />}
    </div>
  );
};

export default HeapViz;
