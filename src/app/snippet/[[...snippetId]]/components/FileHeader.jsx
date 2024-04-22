export default function FileHeader(props) {
  return (
    <button
      {...props}
      className="py-1 px-2 bg-[#fffffe] dark:bg-[#1e1e1e] cursor-pointer disabled:bg-zinc-500 disabled:text-white dark:disabled:bg-white dark:disabled:text-black rounded-lg"
    >
      {props.children}
    </button>
  );
}
