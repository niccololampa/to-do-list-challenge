export default function FilterComponent(props) {
  const { count, filter, onFilter, onClear } = props;

  return (
    <div className="flex">
      <div className="m-2 p-3">{count ? count : 0} left!</div>
      <button
        className={
          (filter == undefined ? "border-2 border-red-800 " : "") +
          "hover:border-red-800 m-2 p-2"
        }
        onClick={() => {
          onFilter(undefined);
        }}
      >
        All
      </button>

      <button
        className={
          (filter == true ? "border-2 border-red-800 " : "") +
          " hover:border-red-800 m-2 p-2"
        }
        onClick={() => {
          onFilter(true);
        }}
      >
        Active
      </button>
      <button
        className={
          (filter == false ? "border-2 border-red-800 " : "") +
          "  hover:border-red-800 m-2 p-2"
        }
        onClick={() => {
          onFilter(false);
        }}
      >
        Completed
      </button>
      <button
        className="hover:bottom-border-red-800 m-2 p-2 hover:underline"
        onClick={onClear}
      >
        Clear completed
      </button>
    </div>
  );
}
