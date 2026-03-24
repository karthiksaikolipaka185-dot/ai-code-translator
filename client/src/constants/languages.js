export const LANGUAGES = [
  { id: "c", name: "C", extension: ".c" },
  { id: "cpp", name: "C++", extension: ".cpp" },
  { id: "csharp", name: "C#", extension: ".cs" },
  { id: "java", name: "Java", extension: ".java" },
  { id: "python", name: "Python", extension: ".py" }
];

export const MONACO_LANGUAGE_MAP = {
  c: "c",
  cpp: "cpp",
  csharp: "csharp",
  java: "java",
  python: "python"
};

export const STARTER_CODE = {
  c: `#include <stdio.h>\n\nint main() {\n    printf("Hello World\\n");\n    return 0;\n}`,
  cpp: `#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << "Hello World" << endl;\n    return 0;\n}`,
  csharp: `using System;\n\nclass Program {\n    static void Main() {\n        Console.WriteLine("Hello World");\n    }\n}`,
  java: `public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello World");\n    }\n}`,
  python: `print("Hello World")`
};
