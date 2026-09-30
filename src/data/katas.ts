export type Kata = {
  id: string;
  title: string;
  description: string;
  difficulty: "easy" | "medium" | "hard";
  starterCode: string;
  tests: { input: string; expected: string }[];
  hint: string;
};

export const katas: Kata[] = [
  {
    id: "reverse-string",
    title: "Reverse a String",
    description:
      "Write a function `reverse(str)` that returns the reversed version of the input string.",
    difficulty: "easy",
    starterCode:
      "function reverse(str) {\n  // Your code here\n  return str;\n}",
    tests: [
      { input: "hello", expected: "olleh" },
      { input: "Byteforge", expected: "egrofetyB" },
      { input: "racecar", expected: "racecar" },
      { input: "a", expected: "a" },
      { input: "", expected: "" },
    ],
    hint: "Try using .split(''), .reverse(), and .join('')",
  },
  {
    id: "fizzbuzz",
    title: "FizzBuzz",
    description:
      "Write a function `fizzbuzz(n)` that returns an array of strings from 1 to n, replacing multiples of 3 with 'Fizz', multiples of 5 with 'Buzz', and multiples of both with 'FizzBuzz'.",
    difficulty: "easy",
    starterCode:
      "function fizzbuzz(n) {\n  const result = [];\n  // Your code here\n  return result;\n}",
    tests: [
      { input: "5", expected: '["1","2","Fizz","4","Buzz"]' },
      { input: "3", expected: '["1","2","Fizz"]' },
      { input: "15", expected: '["1","2","Fizz","4","Buzz","Fizz","7","8","Fizz","Buzz","11","Fizz","13","14","FizzBuzz"]' },
    ],
    hint: "Use the modulo operator (%) to check divisibility.",
  },
  {
    id: "palindrome",
    title: "Palindrome Checker",
    description:
      "Write a function `isPalindrome(str)` that returns `true` if the input string is a palindrome (reads the same forwards and backwards), ignoring case and non-alphanumeric characters.",
    difficulty: "medium",
    starterCode:
      "function isPalindrome(str) {\n  // Your code here\n  return true;\n}",
    tests: [
      { input: "racecar", expected: "true" },
      { input: "A man, a plan, a canal: Panama", expected: "true" },
      { input: "hello", expected: "false" },
      { input: "12321", expected: "true" },
      { input: "", expected: "true" },
    ],
    hint: "Clean the string with .replace(/[^a-zA-Z0-9]/g, '').toLowerCase() first.",
  },
  {
    id: "two-sum",
    title: "Two Sum",
    description:
      "Write a function `twoSum(nums, target)` that returns the indices of the two numbers that add up to the target. Each input has exactly one solution.",
    difficulty: "medium",
    starterCode:
      "function twoSum(nums, target) {\n  // Your code here\n  return [0, 0];\n}",
    tests: [
      { input: "[2,7,11,15], 9", expected: "[0,1]" },
      { input: "[3,2,4], 6", expected: "[1,2]" },
      { input: "[3,3], 6", expected: "[0,1]" },
    ],
    hint: "Use a hash map (object) to store seen values for O(n) solution.",
  },
  {
    id: "anagram",
    title: "Valid Anagram",
    description:
      "Write a function `isAnagram(s, t)` that returns `true` if `t` is an anagram of `s`.",
    difficulty: "easy",
    starterCode:
      "function isAnagram(s, t) {\n  // Your code here\n  return true;\n}",
    tests: [
      { input: '"anagram", "nagaram"', expected: "true" },
      { input: '"rat", "car"', expected: "false" },
      { input: '"listen", "silent"', expected: "true" },
      { input: '"", ""', expected: "true" },
    ],
    hint: "Sort both strings and compare, or count character frequencies.",
  },
];