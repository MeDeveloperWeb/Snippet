// c.js
export function c() {
  return `#include <stdio.h>\n\nint main() {\n\tprintf("Hello, World!");\n\treturn 0;\n}`;
}

// cpp.js
export function cpp() {
  return `#include <iostream>\n\nint main() {\n\tstd::cout << "Hello, World!";\n\treturn 0;\n}`;
}

// python.js
export function python() {
  return 'print("Hello, World!")';
}

// java.js
export function java() {
  return `public class Main {\n\tpublic static void main(String[] args) {\n\t\tSystem.out.println("Hello, World!");\n\t}\n}`;
}

// go.js
export function go() {
  return `package main\n\nimport "fmt"\n\nfunc main() {\n\tfmt.Println("Hello, World!")\n}`;
}

// csharp.js
export function csharp() {
  return `using System;\n\nclass Program\n{\n\tstatic void Main()\n\t{\n\t\tConsole.WriteLine("Hello, World!");\n\t}\n}`;
}

// javascript.js
export function javascript() {
  return 'console.log("Hello, World!");';
}

export function web() {
  const html = '<h1>Hello World!</h1>';

  const css =
    'h1 {\n\tbackground-image: linear-gradient(to left, violet, indigo, blue, green, yellow, orange, red);\n\t-webkit-background-clip: text;\n\t-webkit-text-fill-color: transparent;\n\ttext-align:center;\n}';

  const js =
    '// Run this Program and open Console to see the output.\nconsole.log("Hello World!")';

  return {
    html,
    css,
    js
  };
}

const defaultProgram = {
  c,
  cpp,
  python,
  java,
  go,
  csharp,
  javascript,
  web
};

export default defaultProgram;
