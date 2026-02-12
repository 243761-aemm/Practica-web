import { query } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  const res = await query('SELECT * FROM vw_top_products_ranked LIMIT 10');
  return NextResponse.json(res.rows);
}