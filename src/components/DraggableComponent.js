// src/components/DraggableComponent.js
import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

const DraggableComponent = ({ component, index }) => {
  return (
    <Draggable draggableId={component.id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="p-4 mb-2 bg-indigo-200 rounded shadow"
        >
          {component.label}
        </div>
      )}
    </Draggable>
  );
};

export default DraggableComponent;
