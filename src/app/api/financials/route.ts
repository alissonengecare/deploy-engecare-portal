import { NextResponse } from 'next/server';
import financialData from '@/data/mocks/financialData.json';

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function GET() { // Removed unused parameter
  await delay(500); // Simulate network latency
  try {
    // In a real API, you would fetch data from a database or other sources
    return NextResponse.json(financialData);
  } catch (error) {
    console.error("API Error fetching financial data:", error);
    return NextResponse.json({ message: "Internal Server Error fetching financial data" }, { status: 500 });
  }
}

