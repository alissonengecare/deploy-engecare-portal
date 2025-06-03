import { NextResponse } from 'next/server';
import dashboardData from '@/data/mocks/dashboardData.json';

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function GET() { // Removed unused parameter
  await delay(500); // Simulate network latency
  try {
    // In a real API, you would fetch data from a database or other sources
    return NextResponse.json(dashboardData);
  } catch (error) {
    console.error("API Error fetching dashboard data:", error);
    return NextResponse.json({ message: "Internal Server Error fetching dashboard data" }, { status: 500 });
  }
}

