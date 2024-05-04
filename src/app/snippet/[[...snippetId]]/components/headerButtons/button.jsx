export function HeaderButton({ colorClass, text, Svg, ...otherProps }) {
  return (
    <button
      {...otherProps}
      className={`px-2 rounded-sm flex gap-2 ${colorClass}`}
    >
      {Svg && <Svg className="h-4 w-4 self-center" />}
      <span className="hidden md:inline lg:hidden xl:inline">{text}</span>
    </button>
  );
}

export function FileHeader({ text, ...props }) {
  return (
    <button
      {...props}
      className="text-[#1e1e1e] bg-[#fffffe] dark:text-[#fffffe] dark:bg-[#1e1e1e] px-2 pb-2 border-solid border-blue-400 border-0 disabled:border-t-2"
    >
      {text}
    </button>
  );
}
