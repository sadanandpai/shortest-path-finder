export const problem = {
  id: 1,
  name: "Sum",
  statement:
    "Implement a function <strong>sum</strong>, that sums the given 2 numbers.",
  description: "",
  difficulty: "medium",
  languages: ["javascript"],
  examples: [
    {
      input: "1, 2",
      output: "3",
    },
    {
      input: "7, -5",
      output: "2",
    },
    {
      input: "0, -10",
      output: "-10",
    },
  ],
  sampleInput: "1, 2",
  code: `/**
* @param {number} num1
* @param {number} num2
* @return {number}
*/
export default function sum(num1, num2) {
  // write your code here and return

}
`,
  solution: `/**
* @param {number} num1
* @param {number} num2
* @return {number}
*/
export default function sum(num1, num2) {
  return num1 + num2;
}
`,
  testCode: (num1 = 1, num2 = 2) => `import userSolution from './code';
import systemSolution from './solution';

describe('inputTest', () => {
  test('should check if sum of 2 positive numbers is correct', () => {
    expect(userSolution(${num1}, ${num2})).toEqual(systemSolution(${num1}, ${num2}));
  });
});`,
};
