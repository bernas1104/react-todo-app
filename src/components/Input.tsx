import { ChangeEvent, FormEvent, InvalidEvent, useState } from 'react';
import { PlusCircle } from 'phosphor-react';

import styles from './Input.module.css';

interface InputProps {
  onTaskCreated: (description: string) => void;
}

export function Input({ onTaskCreated }: InputProps) {
  const [newTask, setNewTask] = useState("");

  function handleCreateNewTask(e: FormEvent) {
    e.preventDefault();
    onTaskCreated(newTask);
    setNewTask("");
  }

  function handleNewTaskChange(e: ChangeEvent<HTMLInputElement>) {
    e.target.setCustomValidity("");
    setNewTask(e.target.value);
  }

  function handleInvalidNewTask(e: InvalidEvent<HTMLInputElement>) {
    e.target.setCustomValidity("Tarefa deve ser descrita!");
  }

  return (
    <form className={styles.input} onSubmit={handleCreateNewTask}>
      <input
        type='text'
        name='task'
        value={newTask}
        placeholder='Adicione uma nova tarefa'
        onChange={handleNewTaskChange}
        onInvalid={handleInvalidNewTask}
        required
      />
      <button type='submit'>
        Criar
        <PlusCircle size={16} />
      </button>
    </form>
  )
}
