import { query } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  const res = await query('SELECT * FROM vw_inventory_risk');
  return NextResponse.json(res.rows);
}