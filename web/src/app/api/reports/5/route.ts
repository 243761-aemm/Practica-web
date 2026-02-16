import { query } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  const res = await query('SELECT * FROM vw_payment_mix');
  return NextResponse.json(res.rows);
}