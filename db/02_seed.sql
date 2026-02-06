
INSERT INTO categories (name) VALUES ('Café'), ('Repostería'), ('Sándwiches'), ('Bebidas Frías');


INSERT INTO products (name, category_id, price, stock) VALUES 
('Espresso', 1, 30.00, 50),
('Latte Vainilla', 1, 55.00, 40),
('Capuchino Grande', 1, 60.00, 35),
('Mocha Blanco', 1, 65.00, 20),
('Americano Intenso', 1, 35.00, 100),
('Flat White', 1, 58.00, 25),
('Frappé de Caramelo', 4, 75.00, 30),
('Té Helado Limón', 4, 40.00, 60),
('Smoothie Fresa', 4, 80.00, 15),
('Muffin Arándanos', 2, 35.00, 10),
('Galleta Avena', 2, 25.00, 45),
('Pastel de Zanahoria', 2, 50.00, 8),
('Panini Pollo', 3, 95.00, 12),
('Sándwich Jamón Serrano', 3, 120.00, 5),
('Bagel Clásico', 3, 45.00, 3),
('Croissant Mantequilla', 2, 30.00, 25);


INSERT INTO customers (name, email) VALUES 
('Juan Perez', 'juan@gmail.com'),
('Maria Lopez', 'maria@gmail.com'),
('Carlos Ruiz', 'cruiz@hotmail.com'),
('Ana Garcia', 'ana.g@gmail.com'),
('Luis Diaz', 'luisd@yahoo.com'),
('Elena Sanz', 'esanz@outlook.com'),
('Roberto Meza', 'rmeza@gmail.com'),
('Sofia Vaca', 'svaca@gmail.com');



INSERT INTO orders (customer_id, status, channel) VALUES (1, 'completed', 'physical_store');
INSERT INTO order_items (order_id, product_id, qty, unit_price) VALUES (1, 1, 10, 30.00); -- Compra mucho Espresso
INSERT INTO payments (order_id, method, paid_amount) VALUES (1, 'cash', 300.00);


INSERT INTO orders (customer_id, status, channel) VALUES (2, 'completed', 'app');
INSERT INTO order_items (order_id, product_id, qty, unit_price) VALUES (2, 7, 5, 75.00); -- Frappés
INSERT INTO payments (order_id, method, paid_amount) VALUES (2, 'card', 375.00);


INSERT INTO orders (customer_id, status, channel) VALUES (3, 'completed', 'app');
INSERT INTO order_items (order_id, product_id, qty, unit_price) VALUES (3, 14, 4, 120.00); 
INSERT INTO payments (order_id, method, paid_amount) VALUES (3, 'card', 480.00);


INSERT INTO orders (customer_id, status, channel) VALUES (4, 'completed', 'physical_store'), (5, 'completed', 'app'), (6, 'completed', 'physical_store'), (7, 'completed', 'app'), (8, 'completed', 'physical_store');
INSERT INTO order_items (order_id, product_id, qty, unit_price) VALUES (4, 2, 1, 55.00), (5, 3, 2, 60.00), (6, 10, 3, 35.00), (7, 13, 1, 95.00), (8, 5, 5, 35.00);
INSERT INTO payments (order_id, method, paid_amount) VALUES (4, 'cash', 55.00), (5, 'card', 120.00), (6, 'cash', 105.00), (7, 'app', 95.00), (8, 'cash', 175.00);
