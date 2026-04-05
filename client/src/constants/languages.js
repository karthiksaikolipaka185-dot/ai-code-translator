export const LANGUAGES = [
  { id: "auto", name: "Auto-Detect", extension: "" },
  { id: "javascript", name: "JavaScript", extension: ".js" },
  { id: "typescript", name: "TypeScript", extension: ".ts" },
  { id: "python", name: "Python", extension: ".py" },
  { id: "java", name: "Java", extension: ".java" },
  { id: "cpp", name: "C++", extension: ".cpp" },
  { id: "go", name: "Go", extension: ".go" },
  { id: "rust", name: "Rust", extension: ".rs" },
  { id: "c", name: "C", extension: ".c" },
  { id: "csharp", name: "C#", extension: ".cs" }
];

export const MONACO_LANGUAGE_MAP = {
  auto: "plaintext",
  javascript: "javascript",
  typescript: "typescript",
  python: "python",
  java: "java",
  cpp: "cpp",
  go: "go",
  rust: "rust",
  c: "c",
  csharp: "csharp"
};

export const STARTER_CODE = {
  auto: `// Paste your code here for auto-detection`,
  javascript: `function greet() {\n    console.log("Hello World");\n}\n\ngreet();`,
  typescript: `function greet(name: string): string {\n    return \`Hello \${name}\`;\n}\n\nconsole.log(greet("World"));`,
  python: `def greet():\n    print("Hello World")\n\ngreet()`,
  java: `public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello World");\n    }\n}`,
  cpp: `#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << "Hello World" << endl;\n    return 0;\n}`,
  go: `package main\n\nimport "fmt"\n\nfunc main() {\n    fmt.Println("Hello World")\n}`,
  rust: `fn main() {\n    println!("Hello World");\n}`,
  c: `#include <stdio.h>\n\nint main() {\n    printf("Hello World\\n");\n    return 0;\n}`,
  csharp: `using System;\n\nclass Program {\n    static void Main() {\n        Console.WriteLine("Hello World");\n    }\n}`
};
