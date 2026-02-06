-- Revocar permisos por defecto en el esquema public
REVOKE ALL ON SCHEMA public FROM PUBLIC;
GRANT USAGE ON SCHEMA public TO PUBLIC;

-- Crear el rol de la aplicación (si no existe)
-- Nota: La contraseña debe coincidir con la que pongas en tu DATABASE_URL más adelante
DO $$ 
BEGIN 
  IF NOT EXISTS (SELECT FROM pg_catalog.pg_roles WHERE rolname = 'app_user') THEN
    CREATE ROLE app_user WITH LOGIN PASSWORD 'cafeteria123';
  END IF;
END $$;

-- Dar acceso de lectura SOLO a las vistas
GRANT SELECT ON vw_sales_daily TO app_user;
GRANT SELECT ON vw_top_products_ranked TO app_user;
GRANT SELECT ON vw_inventory_risk TO app_user;
GRANT SELECT ON vw_customer_value TO app_user;
GRANT SELECT ON vw_payment_mix TO app_user;

-- IMPORTANTE: El usuario app_user NO tiene GRANT SELECT sobre las tablas base
-- como 'products' o 'orders', cumpliendo con el requisito de seguridad.
