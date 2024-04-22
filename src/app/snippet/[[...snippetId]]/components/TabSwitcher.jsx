import FileHeader from './FileHeader';

export default function TabSwitcher({
  terminalView,
  setTerminalView,
  webView,
  setWebView,
  fileIndex,
  setFileIndex,
  files
}) {
  return (
    <div
      className={`${files.length === 1 ? 'lg:hidden' : ''} col-span-2 flex w-[98%] lg:w-full`}
    >
      <div className="flex-1 space-x-2 ">
        {files.map((file, index) => (
          <FileHeader
            key={file.language}
            onClick={() => {
              setFileIndex(index);
              setWebView(false);
              setTerminalView(false);
            }}
            disabled={fileIndex === index && !(webView || terminalView)}
          >
            {file.language}
          </FileHeader>
        ))}
      </div>
      <div className="flex-1 text-right lg:text-left space-x-2">
        {(files.length === 3 ? ['Console', 'Preview'] : ['Terminal']).map(
          (value) => (
            <FileHeader
              key={value}
              onClick={() =>
                value === 'Preview'
                  ? (setWebView(true), setTerminalView(false))
                  : (setTerminalView(true), setWebView(false))
              }
              disabled={value === 'Preview' ? webView : terminalView}
            >
              {value}
            </FileHeader>
          )
        )}
      </div>
    </div>
  );
}
