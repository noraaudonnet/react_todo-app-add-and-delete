import React from 'react';
import { Todo } from '../../types/Todo';
import classNames from 'classnames';
import { Status } from '../../types/Status';
import * as todosService from '../../api/todos';

type Props = {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  statusFilter: Status;
  setStatusFilter: (newStatus: Status) => void;
  setErrorMessage: (errorMessage: string) => void;
};

export const Footer: React.FC<Props> = ({
  todos,
  setTodos,
  statusFilter,
  setStatusFilter,
  setErrorMessage,
}) => {
  const activeTodosCount = todos.filter(todo => !todo.completed).length;
  const complitedTodosCount = todos.filter(todo => todo.completed).length;

  function removeTodo(todoId: number) {
    setTodos(currentTodos => currentTodos.filter(todo => todo.id !== todoId));

    return todosService
      .deleteTodo(todoId)
      .then(() => {})
      .catch(error => {
        setErrorMessage(`Unable to delete a todo`);
        throw error;
      });
  }

  const handleClearButton = () => {
    const completedTodos = todos.filter(todo => todo.completed);

    completedTodos.forEach(todo => removeTodo(todo.id));
  };

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {activeTodosCount} items left
      </span>
      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={classNames('filter__link', {
            selected: statusFilter === Status.All,
          })}
          data-cy="FilterLinkAll"
          onClick={() => setStatusFilter(Status.All)}
        >
          {Status.All}
        </a>

        <a
          href="#/active"
          className={classNames('filter__link', {
            selected: statusFilter === Status.Active,
          })}
          data-cy="FilterLinkActive"
          onClick={() => setStatusFilter(Status.Active)}
        >
          {Status.Active}
        </a>

        <a
          href="#/completed"
          className={classNames('filter__link', {
            selected: statusFilter === Status.Completed,
          })}
          data-cy="FilterLinkCompleted"
          onClick={() => setStatusFilter(Status.Completed)}
        >
          {Status.Completed}
        </a>
      </nav>
      {!!complitedTodosCount && (
        <button
          type="button"
          className="todoapp__clear-completed"
          data-cy="ClearCompletedButton"
          onClick={handleClearButton}
        >
          Clear completed
        </button>
      )}
    </footer>
  );
};
