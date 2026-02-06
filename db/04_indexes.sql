-- 1. Índice para mejorar la búsqueda por nombre de producto
-- Útil para: vw_top_products_ranked cuando se filtra por nombre.
CREATE INDEX idx_products_name ON products(name);

-- 2. Índice para acelerar el filtrado por fechas en las ventas
-- Útil para: vw_sales_daily al filtrar por rango de fechas.
CREATE INDEX idx_orders_created_at ON orders(created_at);

-- 3. Índice de clave foránea para optimizar los JOINs de categorías
-- Útil para: vw_inventory_risk al unir productos con sus categorías.
CREATE INDEX idx_products_category_id ON products(category_id);

-- QUERY DE VERIFICACIÓN PARA TU README:
-- EXPLAIN ANALYZE SELECT * FROM vw_top_products_ranked WHERE producto ILIKE '%Cafe%';
