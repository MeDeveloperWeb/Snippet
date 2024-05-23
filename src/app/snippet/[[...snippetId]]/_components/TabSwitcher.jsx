import { FileHeader } from './headerButtons/button';

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
      <div className="flex flex-1 space-x-[1px]">
        {files.map((file, index) => (
          <FileHeader
            key={file.language}
            onClick={() => {
              setFileIndex(index);
              setWebView(false);
              setTerminalView(false);
            }}
            disabled={fileIndex === index && !(webView || terminalView)}
            text={file.language}
          />
        ))}
      </div>
      <div className="flex flex-1 justify-end lg:justify-start lg:ml-4">
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
              text={value}
            />
          )
        )}
      </div>
    </div>
  );
}
