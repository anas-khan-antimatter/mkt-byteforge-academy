import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, program, experience, reason } = body;

    // Basic validation
    const errors: string[] = [];
    if (!name || typeof name !== "string" || name.trim().length < 2) {
      errors.push("Name is required (at least 2 characters)");
    }
    if (!email || typeof email !== "string" || !email.includes("@")) {
      errors.push("A valid email address is required");
    }
    if (!phone || typeof phone !== "string" || phone.trim().length < 5) {
      errors.push("A valid phone number is required");
    }
    const validPrograms = ["software-engineering", "data-science-ai", "ux-design-research"];
    if (!validPrograms.includes(program)) {
      errors.push("Please select a valid program");
    }
    if (!experience || typeof experience !== "string" || experience.trim().length < 10) {
      errors.push("Please tell us about your background (at least 10 characters)");
    }
    if (!reason || typeof reason !== "string" || reason.trim().length < 10) {
      errors.push("Please share why you want to join (at least 10 characters)");
    }

    if (errors.length > 0) {
      return NextResponse.json({ error: errors.join("; ") }, { status: 400 });
    }

    // In production, this would save to a database.
    // For the demo, we return success.

    return NextResponse.json({
      success: true,
      message: "Application received successfully. Our team will review and reach out within 3–5 business days.",
      applicant: {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        program,
      },
    });
  } catch (e: unknown) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Invalid request" },
      { status: 400 }
    );
  }
}

// Handle GET for ship probe
export async function GET() {
  return NextResponse.json({
    status: "ok",
    endpoint: "apply",
    methods: ["POST"],
  });
}