import { query } from '@/lib/db';
import { NextResponse } from 'next/server';

const ITEMS_PER_PAGE = 5;

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get('page') || '1');
  const offset = (page - 1) * ITEMS_PER_PAGE;

  // Obtener datos paginados
  const res = await query(
    `SELECT * FROM vw_customer_value ORDER BY total_gastado DESC LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}`
  );

  // Obtener el total de registros para determinar si hay más páginas
  const countRes = await query('SELECT COUNT(*) as total FROM vw_customer_value');
  const total = countRes.rows[0].total;
  const hasNext = offset + ITEMS_PER_PAGE < total;

  return NextResponse.json({
    data: res.rows,
    page,
    hasNext,
    total
  });
}