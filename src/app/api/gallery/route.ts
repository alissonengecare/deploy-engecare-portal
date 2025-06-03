import { NextResponse } from 'next/server';
import galleryData from '@/data/mocks/galleryData.json';

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function GET() { // Removed unused parameter
  await delay(500); // Simulate network latency
  try {
    // In a real API, you would fetch data from a database or other sources
    return NextResponse.json(galleryData);
  } catch (error) {
    console.error("API Error fetching gallery data:", error);
    return NextResponse.json({ message: "Internal Server Error fetching gallery data" }, { status: 500 });
  }
}

