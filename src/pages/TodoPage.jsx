import { useState, useEffect } from 'react';
import { Footer, Header, TodoCollection, TodoInput } from 'components';
import { createTodos, getTodos, patchTodos, deleteTodos } from '../api/todos';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const TodoPage = () => {
  const [inputValue, setInputValue] = useState('');
  const [todos, setTodos] = useState([]);
  const { isAuthenticated, currentMember } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [navigate, isAuthenticated]);

  function handleChange(value) {
    setInputValue(value);
  }

  async function handleAddTodo() {
    if (inputValue.length === 0) return;
    const data = await createTodos({
      title: inputValue,
      isDone: false,
    });

    setTodos((prevTodos) => {
      return [
        ...prevTodos,
        {
          title: data.title,
          isDone: data.isDone,
          id: data.id,
          isEdit: false,
        },
      ];
    });
    setInputValue('');
  }

  async function handleKeyDown() {
    if (inputValue.length === 0) return;
    const data = await createTodos({
      title: inputValue,
      isDone: false,
    });

    setTodos((prevTodos) => {
      return [
        ...prevTodos,
        {
          title: data.title,
          isDone: data.isDone,
          id: data.id,
          isEdit: false,
        },
      ];
    });
    setInputValue('');
  }

  async function handleToggleDone(id) {
    const currentTodo = todos.find((todo) => todo.id === id);
    try {
      await patchTodos({
        id,
        isDone: !currentTodo.isDone,
      });
    } catch (error) {
      console.error(error);
    }
    setTodos((prevTodos) => {
      return prevTodos.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            isDone: !todo.isDone,
          };
        }
        return todo;
      });
    });
  }

  function handleChangeMode({ id, isEdit }) {
    setTodos((prevTodos) => {
      return prevTodos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, isEdit };
        }
        return {
          ...todo,
          isEdit: false,
        };
      });
    });
  }

  async function handleSave({ id, title }) {
    try {
      await patchTodos({
        id,
        title,
      });
      setTodos((prevTodos) => {
        return prevTodos.map((todo) => {
          if (todo.id === id) {
            return { ...todo, title, isEdit: false };
          }
          return todo;
        });
      });
    } catch (error) {
      console.error(error);
    }
  }

  async function handleDelete(id) {
    try {
      await deleteTodos(id);
      setTodos((prevTodos) => {
        return prevTodos.filter((todo) => todo.id !== id);
      });
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    const getTodosAsync = async () => {
      try {
        const todos = await getTodos();
        setTodos(
          todos.map((todo) => ({
            ...todo,
            isEdit: false,
          })),
        );
      } catch (error) {
        console.error(error);
      }
    };
    getTodosAsync();
  }, []);

  return (
    <div>
      TodoPage
      <Header username={currentMember?.name} />
      <TodoInput
        inputValue={inputValue}
        onChange={handleChange}
        onAddTodo={handleAddTodo}
        onKeyDown={handleKeyDown}
      />
      <TodoCollection
        todos={todos}
        onToggleDone={handleToggleDone}
        onChangeMode={handleChangeMode}
        onSave={handleSave}
        onDelete={handleDelete}
      />
      <Footer number={todos.length} />
    </div>
  );
};

export default TodoPage;
