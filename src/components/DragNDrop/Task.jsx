import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

const grid = 1;

const getItemStyle = (isDragging, draggableStyle) => ({
  userSelect: 'none',
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,
  marginBottom: '1rem',

  background: isDragging ? '#3282b8' : '',

  ...draggableStyle,
});

export default function Task({ task, index }) {
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className='dndtask'
          style={getItemStyle(
            snapshot.isDragging,
            provided.draggableProps.style
          )}
          isDragging={snapshot.isDragging}
        >
          {task.content}
        </div>
      )}
    </Draggable>
  );
}
