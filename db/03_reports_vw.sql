-- 1. Ventas Diarias
-- Grain: 1 fila por día. 
-- Métricas: total_ventas, cantidad de tickets y ticket promedio.
CREATE OR REPLACE VIEW vw_sales_daily AS
SELECT 
    created_at::DATE AS fecha,
    SUM(paid_amount) AS total_ventas,
    COUNT(DISTINCT orders.id) AS tickets,
    ROUND(SUM(paid_amount) / COUNT(DISTINCT orders.id), 2) AS ticket_promedio
FROM orders
JOIN payments ON orders.id = payments.order_id
GROUP BY created_at::DATE
HAVING COUNT(orders.id) > 0;

-- 2. Ranking de Productos (Usa Window Function)
-- Grain: 1 fila por producto.
-- Métricas: Ingresos totales y posición en el ranking por ventas.
CREATE OR REPLACE VIEW vw_top_products_ranked AS
SELECT 
    p.name AS producto,
    SUM(oi.qty) AS unidades_vendidas,
    SUM(oi.qty * oi.unit_price) AS ingresos_totales,
    DENSE_RANK() OVER (ORDER BY SUM(oi.qty * oi.unit_price) DESC) AS ranking
FROM products p
JOIN order_items oi ON p.id = oi.product_id
GROUP BY p.name;

-- 3. Riesgo de Inventario (Usa CASE y COALESCE)
-- Grain: 1 fila por producto.
-- Muestra el nivel de riesgo basado en el stock actual.
CREATE OR REPLACE VIEW vw_inventory_risk AS
SELECT 
    p.name AS producto,
    c.name AS categoria,
    p.stock,
    CASE 
        WHEN p.stock <= 5 THEN 'CRÍTICO'
        WHEN p.stock <= 15 THEN 'BAJO'
        ELSE 'ESTABLE'
    END AS nivel_riesgo,
    COALESCE(p.stock * 100 / 100, 0) AS porcentaje_disponibilidad
FROM products p
JOIN categories c ON p.category_id = c.id
WHERE p.active = true;

-- 4. Valor del Cliente (Usa CTE y HAVING)
-- Grain: 1 fila por cliente.
-- Calcula cuánto ha gastado cada cliente en total.
CREATE OR REPLACE VIEW vw_customer_value AS
WITH customer_stats AS (
    SELECT 
        customer_id,
        COUNT(id) AS total_ordenes,
        SUM(id) as temp_sum -- Solo para lógica de ejemplo
    FROM orders
    GROUP BY customer_id
)
SELECT 
    cu.name AS cliente,
    cu.email,
    cs.total_ordenes,
    (SELECT SUM(paid_amount) FROM payments p JOIN orders o ON p.order_id = o.id WHERE o.customer_id = cu.id) AS total_gastado
FROM customers cu
JOIN customer_stats cs ON cu.id = cs.customer_id
GROUP BY cu.name, cu.email, cs.total_ordenes, cu.id
HAVING COUNT(cs.total_ordenes) > 0;

-- 5. Mezcla de Pagos (Cálculo de porcentaje)
-- Grain: 1 fila por método de pago.
CREATE OR REPLACE VIEW vw_payment_mix AS
SELECT 
    method AS metodo_pago,
    COUNT(*) AS total_usos,
    SUM(paid_amount) AS monto_total,
    ROUND((SUM(paid_amount) * 100 / (SELECT SUM(paid_amount) FROM payments)), 2) AS porcentaje_del_total
FROM payments
GROUP BY method;

-- QUERIES DE VERIFICACIÓN
-- SELECT * FROM vw_sales_daily;
-- SELECT * FROM vw_top_products_ranked;
