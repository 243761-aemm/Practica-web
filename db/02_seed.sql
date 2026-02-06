-- Insertar Categorías
INSERT INTO categories (name) VALUES ('Café'), ('Repostería'), ('Sándwiches');

-- Insertar Productos
INSERT INTO products (name, category_id, price, stock) VALUES 
('Americano', 1, 35.00, 100),
('Capuchino', 1, 45.00, 80),
('Croissant', 2, 30.00, 20),
('Bagel de Lujo', 3, 85.00, 5), -- Stock bajo para probar vw_inventory_risk
('Muffin de Chocolate', 2, 25.00, 15);

-- Insertar Clientes
INSERT INTO customers (name, email) VALUES 
('Juan Perez', 'juan@gmail.com'),
('Maria Lopez', 'maria@gmail.com');

-- Insertar Órdenes y Pagos (Simulando ventas de hoy)
INSERT INTO orders (customer_id, status, channel) VALUES (1, 'completed', 'physical_store');
INSERT INTO order_items (order_id, product_id, qty, unit_price) VALUES (1, 1, 2, 35.00);
INSERT INTO payments (order_id, method, paid_amount) VALUES (1, 'cash', 70.00);

INSERT INTO orders (customer_id, status, channel) VALUES (2, 'completed', 'app');
INSERT INTO order_items (order_id, product_id, qty, unit_price) VALUES (2, 2, 1, 45.00);
INSERT INTO payments (order_id, method, paid_amount) VALUES (2, 'card', 45.00);
