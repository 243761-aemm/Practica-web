import { query } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  const res = await query('SELECT * FROM vw_customer_value ORDER BY total_gastado DESC');
  return NextResponse.json(res.rows);
}