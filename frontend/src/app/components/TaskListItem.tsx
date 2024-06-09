export default function TaskLIstIem(props) {
  const { task, onCompleted, onDelete, index } = props;

  return (
    <div className="">
      <input
        id="default-radio-1"
        type="checkbox"
        value=""
        name="default-radio"
        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
        checked={task.completed}
        onChange={() => onCompleted(index, !task.completed)}
      />
      <label
        htmlFor="default-radio-1"
        className="ms-2 text-xl font-medium text-gray-800"
      >
        <span className={task.completed ? "line-through" : ""}>
          {task.taskName}
        </span>
      </label>
      <button
        type="button"
        className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
        onClick={() => onDelete(index)}
      >
        X
      </button>
    </div>
  );
}
