import { Check } from 'phosphor-react';

import styles from './Checkbox.module.css';

interface CheckboxProps {
  checked: boolean;
  taskDescription: string;
  onChecked: (checked: boolean) => void;
}

export function Checkbox({
  taskDescription,
  checked,
  onChecked,
}: CheckboxProps) {
  function handleTaskCompleted() {
    onChecked(!checked);
  }

  return (
    <label
      htmlFor='foo'
      className={
        checked ?
          `${styles.checkbox} ${styles.checkedTask}` :
          styles.checkbox
      }
    >
      <span
        className={
          checked ?
            `${styles.checkmark} ${styles.checked}` :
            (styles.checkmark)
        }
        onClick={handleTaskCompleted}
      >
        { checked && <Check size={16} weight='bold' />}
      </span>
      { taskDescription }
    </label>
  )
}
