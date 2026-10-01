import { NextResponse } from "next/server";

interface TestResult {
  name: string;
  passed: boolean;
  message: string;
}

interface KataResponse {
  passed: number;
  failed: number;
  tests: TestResult[];
}

const TEST_CASES: { args: [number, number]; expected: number }[] = [
  { args: [1, 2], expected: 3 },
  { args: [0, 0], expected: 0 },
  { args: [-1, 5], expected: 4 },
  { args: [100, 200], expected: 300 },
  { args: [-5, -7], expected: -12 },
  { args: [1.5, 2.5], expected: 4 },
];

export async function GET() {
  return NextResponse.json({
    status: "ok",
    endpoint: "kata",
    methods: ["POST"],
    description: "Submit JS code for validation against test cases. POST with { code: string }",
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { code } = body;

    if (!code || typeof code !== "string") {
      return NextResponse.json(
        { error: "Missing or invalid 'code' field" },
        { status: 400 }
      );
    }

    // Validate code by trying to parse it
    const tests: TestResult[] = [];

    for (const tc of TEST_CASES) {
      try {
        // eslint-disable-next-line no-eval
        const fn = new Function("return " + code)();
        if (typeof fn !== "function") {
          tests.push({
            name: `add(${tc.args[0]}, ${tc.args[1]})`,
            passed: false,
            message: "Your code did not export a function. Ensure you define 'function add(a, b) { ... }'",
          });
          continue;
        }
        const result = fn(tc.args[0], tc.args[1]);
        const passed = Math.abs(result - tc.expected) < 0.001;
        tests.push({
          name: `add(${tc.args[0]}, ${tc.args[1]}) == ${tc.expected}`,
          passed,
          message: passed ? "" : `Expected ${tc.expected}, got ${result}`,
        });
      } catch (e: unknown) {
        tests.push({
          name: `add(${tc.args[0]}, ${tc.args[1]})`,
          passed: false,
          message: e instanceof Error ? e.message : "Unknown error",
        });
      }
    }

    const passed = tests.filter((t) => t.passed).length;
    const failed = tests.filter((t) => !t.passed).length;

    const response: KataResponse = {
      passed,
      failed,
      tests,
    };

    return NextResponse.json(response);
  } catch (e: unknown) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Invalid request" },
      { status: 400 }
    );
  }
}