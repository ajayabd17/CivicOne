import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { state, issue_text } = body;

    if (!state) {
      return NextResponse.json(
        { status: 'state_required', message: 'Please select your state to proceed.' },
        { status: 400 }
      );
    }

    // Simulate a delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Simulate backend responses for different states
    if (state === 'Not Found State') {
      return NextResponse.json({ error: 'Not Found' }, { status: 404 });
    }

    if (state === 'Server Error State') {
      return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }

    // Simulate a successful response
    const successResponse = {
      portal_id: 123,
      portal_name: `Official Portal for ${state}`,
      portal_url: `https://example.gov.in/${state.toLowerCase().replace(/[\s&]/g, '-')}`,
      instructions: `On the portal homepage, look for the 'File a Complaint' or 'Grievance Redressal' section. You may need to create an account to proceed. Based on your issue: "${
        issue_text || 'No issue described.'
      }"`,
      reasoning: `This portal is designated by the government of ${state} as the primary channel for civic issues related to public infrastructure and services.`,
    };

    return NextResponse.json(successResponse);
  } catch (error) {
    return NextResponse.json({ error: 'Bad Request' }, { status: 400 });
  }
}
