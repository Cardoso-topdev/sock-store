import React from 'react';
import Task from './Task';
import { Droppable } from 'react-beautiful-dnd';

const grid = 1;
const getListStyle = (isDraggingOver) => ({
  background: isDraggingOver ? '#6ebfb5' : '#e1e1e1',
  padding: grid,

  height: '400px',
  overflowY: 'auto',
  transition: 'background-color 0.2s ease',
});

export default function Column({ column, tasks }) {
  return (
    <div>
      <h3>{column.title}</h3>

      <Droppable droppableId={column.id}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            style={getListStyle(snapshot.isDraggingOver)}
            {...provided.droppableProps}
          >
            {tasks.map((task, index) => (
              <Task key={task.id} task={task} index={index} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}
