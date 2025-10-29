import { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import StarIcon from '@mui/icons-material/Star';

// Lokala kategorier som matchar databasschema
const localCategories = [
  { id: 1, name: 'Arbete' },
  { id: 2, name: 'Skola' },
  { id: 3, name: 'Privat' },
  { id: 4, name: 'Viktig' },
];

export default function TodoApp() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  const addTask = () => {
    if (!input.trim()) return;

    setTasks([
      ...tasks,
      {
        id: Date.now(),
        title: input,
        completed: false,
        important: false,
        task_category_id: selectedCategoryId || null,
      },
    ]);
    setInput('');
    setSelectedCategoryId(null);
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const toggleImportant = (id) => {
    setTasks(
      tasks.map((t) => (t.id === id ? { ...t, important: !t.important } : t))
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  const categoryColor = (categoryId) => {
    const category = localCategories.find((c) => c.id === categoryId);
    if (!category) return 'bg-gray-100 text-gray-800';

    switch (category.name.toLowerCase()) {
      case 'arbete':
        return 'bg-blue-100 text-blue-700';
      case 'skola':
        return 'bg-purple-100 text-purple-700';
      case 'privat':
        return 'bg-gray-100 text-gray-800';
      case 'viktig':
        return 'bg-yellow-100 text-yellow-700';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-start justify-center">
      <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-lg min-h-[96vh] flex flex-col mt-0 sm:mt-4">
        <h1 className="text-2xl font-bold mb-8 text-gray-800 text-center">
          Mina uppgifter
        </h1>

        <div className="flex flex-col gap-2 mb-6">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Lägg till ny uppgift..."
            maxLength={32}
            className="w-full sm:flex-1 border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                addTask();
              }
            }}
          />

          <div className="flex gap-2 mt-2">
            <select
              value={selectedCategoryId || ''}
              onChange={(e) =>
                setSelectedCategoryId(
                  e.target.value ? Number(e.target.value) : null
                )
              }
              className="bg-gray-100 text-gray-800 border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 flex-1 hover:bg-gray-200 transition"
            >
              <option value="">Välj kategori</option>
              {localCategories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
            <button
              onClick={addTask}
              className="bg-indigo-600 text-white p-2 px-3 rounded-lg hover:bg-indigo-500 transition"
            >
              <AddIcon />
            </button>
          </div>
        </div>

        <ul className="space-y-2 flex-1">
          {tasks.length === 0 && (
            <p className="text-center text-gray-400 mt-4">
              Inga uppgifter än. Lägg till en ovan!
            </p>
          )}

          {tasks.map((task) => (
            <li
              key={task.id}
              className="flex justify-between items-center bg-gray-50 px-3 py-2 rounded-lg"
            >
              <div className="flex items-center gap-2">
                <button
                  onClick={() => toggleTask(task.id)}
                  className="text-green-500 hover:text-green-400 transition"
                >
                  {task.completed ? (
                    <CheckCircleIcon />
                  ) : (
                    <RadioButtonUncheckedIcon className="text-gray-400" />
                  )}
                </button>

                <span
                  className={`
                    ${task.completed ? 'line-through text-green-400' : 'text-gray-800'}
                    ${task.important && !task.completed ? 'text-yellow-500 font-medium' : ''}
                  `}
                >
                  {task.title}
                </span>

                {task.task_category_id && (
                  <span
                    className={`ml-2 text-sm px-2 py-1 rounded-full ${categoryColor(task.task_category_id)}`}
                  >
                    {
                      localCategories.find(
                        (c) => c.id === task.task_category_id
                      )?.name
                    }
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => toggleImportant(task.id)}
                  className={`hover:text-yellow-400 transition ${
                    task.important ? 'text-yellow-500' : 'text-gray-300'
                  }`}
                >
                  <StarIcon />
                </button>
                <button
                  onClick={() => deleteTask(task.id)}
                  className="text-red-500 hover:text-red-600 transition"
                >
                  <DeleteIcon />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
