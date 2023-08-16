import { Task, TaskType } from './Task';
import { useState } from 'react';
import clipboard from '../assets/clipboard.svg';

import styles from './Dashboard.module.css';
import { Input } from './Input';

export function Dashboard() {
  const [tasks, setTasks] = useState<TaskType[]>([]);
  const [createdTasks, setCreatedTasks] = useState(0);
  const [completedTasks, setCompletedTasks] = useState(0);

  function onTaskCreated(description: string) {
    setTasks([...tasks, { description, completed: false }]);
    setCreatedTasks(tasks.length + 1);
  }

  function onDeleteTask(taskToDelete: TaskType) {
    const tasksWithoutDeletedOne = tasks.filter(
      task => task.description !== taskToDelete.description
    );

    setTasks([...tasksWithoutDeletedOne]);
    setCreatedTasks(tasksWithoutDeletedOne.length);
    setCompletedTasks(
      tasksWithoutDeletedOne.filter(task => task.completed)
        .length
    );
  }

  function onCheckedTask(taskToCheck: TaskType) {
    tasks.forEach(task => {
      if (task.description === taskToCheck.description) {
        task.completed = !task.completed
      }
    });

    setTasks([...tasks]);
    setCompletedTasks(tasks.filter(task => task.completed).length);
  }

  const hasAvailableTasks = tasks.length !== 0;

  function renderNoTasksAvailable() {
    return (
      <>
        <img src={clipboard} alt="Clipboard Image" />
        <p><strong>Você ainda não tem tarefas cadastradas</strong></p>
        <p>Crie tarefas e organize seus itens a fazer</p>
      </>
    );
  }

  function renderAvailableTasks() {
    return (
      <ul>
        {
          tasks.map(task => (
            <Task
              key={task.description}
              task={task}
              onDeleteTask={onDeleteTask}
              onCheckedTask={onCheckedTask}
            />
          ))
        }
      </ul>
    );
  }

  return (
    <>
      <Input onTaskCreated={onTaskCreated} />

      <div className={styles.dashboard}>
        <header>
          <div className={styles.createdTasksCounter}>
            Tarefas criadas
            <span>{createdTasks}</span>
          </div>

          <div className={styles.completedTasksCounter}>
            Concluídas
            <span>{completedTasks}</span>
          </div>
        </header>

        { !hasAvailableTasks && <hr /> }

        <div className={styles.tasksList}>
          {
            (!hasAvailableTasks) && renderNoTasksAvailable()
          }
          {
            (hasAvailableTasks) && renderAvailableTasks()
          }
        </div>
      </div>
    </>
  )
}
