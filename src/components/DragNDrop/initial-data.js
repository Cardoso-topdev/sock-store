const initialData = {
  task: {
    'task-1': { id: 'task-1', content: 'take out trash' },
    'task-2': { id: 'task-2', content: 'take out trash 2' },
    'task-3': { id: 'task-3', content: 'take out trash 3' },
    'task-4': { id: 'task-4', content: 'take out trash 4' },
  },
  columns: {
    'column-1': {
      id: 'column-1',
      title: 'todo  list',
      taskIds: ['task-1', 'task-2', 'task-3'],
    },
    'column-2': {
      id: 'column-2',
      title: 'in progress',
      taskIds: ['task-4'],
    },
    'column-3': {
      id: 'column-3',
      title: 'done',
      taskIds: [],
    },
  },

  columnOrder: ['column-1', 'column-2', 'column-3'],
};

export default initialData;
