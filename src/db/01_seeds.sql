INSERT INTO users (first_name, last_name, address, city, province, email)
VALUES ('Mickey', 'Mouse', '100 Minnie Street', 'Calgary', 'Alberta', 'mickeymouse@mail.com'),
('Donald', 'Duck', '200 Daisy Street', 'Toronto', 'Ontario', 'donaldduck@mail.com'),
('Bruce', 'Wayne', '1 Gotham Rd', 'Gotham City', 'Ontario', 'brucewayne@mail.com');

INSERT INTO charities (name, address, city, province, short_description, long_description, qr_img_url)
VALUES ('Slumdogs', '101 Dalmations Lane', 'Calgary', 'Alberta', 'We look after street dogs and find them new homes!', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', null),
('Feed me!', '2 Meals on Wheels Road', 'Vancouver', 'British Columbia', 'Helping deliver meals to seniors and disabled clients.', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', null);

INSERT INTO employees (first_name, last_name, charity_id)
VALUES ('Indiana', 'Jones', 1),
('Hans', 'Solo', 2);

INSERT INTO donations (amount_cents, user_id, charity_id, employee_id)
VALUES (5000, 1, 1, 1),
(4000, 1, 2, 1),
(10000, 2, 1, 2),
(5000, 2, 2, 2),
(2000, 3, 2, 1),
(3500, 3, 1, 2);