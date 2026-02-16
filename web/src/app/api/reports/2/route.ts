import { query } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const searchQuery = searchParams.get('query');

  let sql = 'SELECT * FROM vw_top_products_ranked';
  
  if (searchQuery) {
    sql += ` WHERE producto ILIKE '%${searchQuery}%'`;
  }
  
  sql += ' LIMIT 10';
  
  const res = await query(sql);
  return NextResponse.json(res.rows);
}