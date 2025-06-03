import { NextResponse } from 'next/server';
import documentsData from '@/data/mocks/documentsData.json';

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function GET() { // Removed unused parameter
  await delay(500); // Simulate network latency
  try {
    // In a real API, you would fetch data from a database or other sources
    return NextResponse.json(documentsData);
  } catch (error) {
    console.error("API Error fetching documents data:", error);
    return NextResponse.json({ message: "Internal Server Error fetching documents data" }, { status: 500 });
  }
}

