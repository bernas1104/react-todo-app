import { Trash } from 'phosphor-react';
import styles from './Task.module.css';
import { Checkbox } from './Checkbox';
import { useState } from 'react';

export interface TaskType {
  description: string;
  completed: boolean;
}

interface TaskProps {
  task: TaskType;
  onDeleteTask: (taskToDelete: TaskType) => void;
  onCheckedTask: (taskToCheck: TaskType) => void;
}

export function Task({ task, onDeleteTask, onCheckedTask }: TaskProps) {
  const [checked, setChecked] = useState(task.completed);

  function onChecked(checked: boolean) {
    setChecked(checked);
    onCheckedTask(task);
  }

  function handleDeleteTask() {
    onDeleteTask(task);
  }

  return (
    <li className={styles.task}>
      <Checkbox
        checked={checked}
        taskDescription={task.description}
        onChecked={onChecked}
      />
      <button title='Deletar tarefa' onClick={handleDeleteTask}>
        <Trash size={24} />
      </button>
    </li>
  )
}
