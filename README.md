
use cinema_database;

-- Table: Roles
CREATE TABLE Roles (
    id int AUTO_INCREMENT NOT NULL,
    role_name varchar(50) NOT NULL,
    CONSTRAINT Roles_pk PRIMARY KEY (id)
);

-- Table: City
CREATE TABLE City (
    id int AUTO_INCREMENT NOT NULL,
    city_name varchar(255) NOT NULL,
    CONSTRAINT City_pk PRIMARY KEY (id)
);

CREATE INDEX idx_city_name ON City(city_name);

-- Table: Client
CREATE TABLE Client (
    id int AUTO_INCREMENT NOT NULL,
    first_name varchar(100) NOT NULL,
    last_name varchar(100) NOT NULL,
    phone varchar(20) NOT NULL,
    mail varchar(255) NOT NULL UNIQUE,
    role_id int NOT NULL,
    CONSTRAINT Client_pk PRIMARY KEY (id),
    CONSTRAINT Client_Role FOREIGN KEY (role_id) REFERENCES Roles (id)
);

CREATE INDEX idx_client_phone ON Client(phone);
CREATE INDEX idx_client_mail ON Client(mail);

-- Table: Movie
CREATE TABLE Movie (
    id int AUTO_INCREMENT NOT NULL,
    title varchar(255) NOT NULL,
    type varchar(255) NOT NULL,
    duration int NOT NULL,
    Language varchar(100) NOT NULL,
    format varchar(20) NOT NULL,
    poster_url varchar(255) NOT NULL,
    CONSTRAINT Movie_pk PRIMARY KEY (id)
);

-- Table: Promotions
CREATE TABLE Promotions (
    id int AUTO_INCREMENT NOT NULL,
    title varchar(255) NOT NULL,
    discount decimal(4,2) NOT NULL,
    CONSTRAINT Promotions_pk PRIMARY KEY (id)
);

-- Table: Hall
CREATE TABLE Hall (
    id int AUTO_INCREMENT NOT NULL,
    hall_name varchar(100) NOT NULL,
    total_seats int NOT NULL,
    CONSTRAINT Hall_pk PRIMARY KEY (id)
);

-- Table: MoviePromotions
CREATE TABLE MoviePromotions (
    Movies_id int NOT NULL,
    Promotions_id int NOT NULL,
    additional_info text NOT NULL,
    CONSTRAINT MoviePromotions_pk PRIMARY KEY (Movies_id, Promotions_id),
    CONSTRAINT MoviePromotions_Movies FOREIGN KEY (Movies_id) REFERENCES Movie (id),
    CONSTRAINT MoviePromotions_Promotions FOREIGN KEY (Promotions_id) REFERENCES Promotions (id)
);

-- Table: Shows
CREATE TABLE Shows (
    id int AUTO_INCREMENT NOT NULL,
    Movies_id int NOT NULL,
    show_time datetime NOT NULL,
    City_id int NOT NULL,
    Hall_id int NOT NULL,
    CONSTRAINT Shows_pk PRIMARY KEY (id),
    CONSTRAINT Shows_Movies FOREIGN KEY (Movies_id) REFERENCES Movie (id),
    CONSTRAINT Shows_City FOREIGN KEY (City_id) REFERENCES City (id),
    CONSTRAINT Shows_Hall FOREIGN KEY (Hall_id) REFERENCES Hall (id)
);

-- Table: ShowPromotions
CREATE TABLE ShowPromotions (
    Show_id int NOT NULL,
    Promotion_id int NOT NULL,
    additional_info text NOT NULL,
    CONSTRAINT ShowPromotions_pk PRIMARY KEY (Show_id, Promotion_id),
    CONSTRAINT ShowPromotions_Show FOREIGN KEY (Show_id) REFERENCES Shows (id),
    CONSTRAINT ShowPromotions_Promotion FOREIGN KEY (Promotion_id) REFERENCES Promotions (id)
);

-- Table: AvailableSeats
CREATE TABLE AvailableSeats (
    id int AUTO_INCREMENT NOT NULL,
    Shows_id int NOT NULL,
    seat_number varchar(10) NOT NULL,
    is_available boolean NOT NULL DEFAULT true,
    CONSTRAINT AvailableSeats_pk PRIMARY KEY (id),
    CONSTRAINT AvailableSeats_Shows FOREIGN KEY (Shows_id) REFERENCES Shows (id) ON DELETE CASCADE
);

-- Table: Tickets
CREATE TABLE Tickets (
    id int AUTO_INCREMENT NOT NULL,
    Shows_id int NOT NULL,
    Client_id int NOT NULL,
    seat_number varchar(10) NOT NULL,
    CONSTRAINT Tickets_pk PRIMARY KEY (id),
    CONSTRAINT Tickets_Shows FOREIGN KEY (Shows_id) REFERENCES Shows (id) ON DELETE CASCADE,
    CONSTRAINT Tickets_Client FOREIGN KEY (Client_id) REFERENCES Client (id),
    CONSTRAINT Tickets_Seat UNIQUE (Shows_id, seat_number)
);

-- Insert default roles
INSERT INTO Roles (role_name) VALUES ('Client'), ('Admin');
INSERT INTO City (city_name) VALUES ('Warszawa'), ('Kraków'), ('Gdańsk'), ('Wrocław');

INSERT INTO Client (first_name, last_name, phone, mail, role_id) VALUES
    ('Jan', 'Kowalski', '123456789', 'jan.kowalski@wp.com', 1),
    ('Anna', 'Nowak', '987654321', 'anna.nowak@gmail.com', 1),
    ('Piotr', 'Wiśniewski', '555123456', 'piotr.wisniewski@onet.com', 1),
    ('Maria', 'Zielińska', '666654321', 'maria.zielinska@gmail.com', 1);
    
    
    
    
    -- Insert movies
INSERT INTO Movie (title, type, duration, Language, format, poster_url) VALUES
    ('Avengers: Infinity War', 'Action', 149, 'English', '3D', 'assets/movie-posters/avengers.jpg'),
    ('The Batman', 'Action', 176, 'English', '2D', 'assets/movie-posters/batman.png'),
    ('Harry Potter and the Deathly Hallows: Part 2', 'Fantasy', 130, 'English', '2D', 'assets/movie-posters/harry-potter.jpg'),
    ('The Shawshank Redemption', 'Drama', 142, 'English', '2D', 'assets/movie-posters/shawshank.jpg'),
    ('Star Wars: Episode I - The Phantom Menace', 'Sci-Fi', 136, 'English', '2D', 'assets/movie-posters/star-wars.jpeg'),
    ('Titanic', 'Romance', 195, 'English', '2D', 'assets/movie-posters/titanic.jpg'),
    ('The Wolf of Wall Street', 'Biography', 180, 'English', '2D', 'assets/movie-posters/wolf-off-wallstreet.jpeg');
    
    
    INSERT INTO Hall (hall_name, total_seats) VALUES
    ('Sala 1', 100),
    ('Sala 2', 150),
    ('Sala 3', 120),
    ('Sala 4', 200);

-- Insert promotions
INSERT INTO Promotions (title, discount) VALUES
    ('Weekend Discount', 10.00),
    ('Student Discount', 15.00),
    ('Holiday Special', 20.00);

-- Insert shows
INSERT INTO Shows (Movies_id, show_time, City_id, Hall_id) VALUES
    (1, '2024-10-10 18:00:00', 1, 1),
    (2, '2024-10-11 20:00:00', 2, 2),
    (3, '2024-10-12 16:00:00', 3, 3),
    (4, '2024-10-13 19:30:00', 4, 4),
    (5, '2024-10-14 17:00:00', 1, 2);

-- Insert available seats for shows
INSERT INTO AvailableSeats (Shows_id, seat_number, is_available) VALUES
    (1, 'A1', true),
    (1, 'A2', true),
    (1, 'A3', true),
    (2, 'B1', true),
    (2, 'B2', true),
    (3, 'C1', true),
    (3, 'C2', true),
    (4, 'D1', true),
    (4, 'D2', true),
    (5, 'E1', true),
    (5, 'E2', true);

-- Insert tickets
INSERT INTO Tickets (Shows_id, Client_id, seat_number) VALUES
    (1, 1, 'A1'),
    (2, 2, 'B1'),
    (3, 3, 'C1'),
    (4, 4, 'D1');

ALTER TABLE Shows
ADD COLUMN start_time TIME NOT NULL,
ADD COLUMN day_of_week VARCHAR(20) NOT NULL;

INSERT INTO Shows (Movies_id, show_time, start_time, day_of_week, City_id, Hall_id) VALUES
    (1, '2024-10-10 18:00:00', '18:00:00', 'Thursday', 1, 1),
    (2, '2024-10-11 20:00:00', '20:00:00', 'Friday', 2, 2),
    (3, '2024-10-12 16:00:00', '16:00:00', 'Saturday', 3, 3),
    (4, '2024-10-13 19:30:00', '19:30:00', 'Sunday', 4, 4),
    (5, '2024-10-14 17:00:00', '17:00:00', 'Monday', 1, 2);


CREATE TABLE TicketPrice (
    id INT AUTO_INCREMENT PRIMARY KEY,
    ticket_type ENUM('ulgowy', 'normalny', 'senior') NOT NULL,
    day_of_week ENUM('Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek', 'Sobota', 'Niedziela') NOT NULL,
    price DECIMAL(10,2) NOT NULL,

);

INSERT INTO TicketPrice (ticket_type, day_of_week, price) VALUES ('normalny', 'Poniedziałek', 16.00);
INSERT INTO TicketPrice (ticket_type, day_of_week, price) VALUES ('normalny', 'Wtorek', 24.00);
INSERT INTO TicketPrice (ticket_type, day_of_week, price) VALUES ('normalny', 'Środa', 19.00);
INSERT INTO TicketPrice (ticket_type, day_of_week, price) VALUES ('normalny', 'Czwartek', 26.00);
INSERT INTO TicketPrice (ticket_type, day_of_week, price) VALUES ('normalny', 'Piątek', 30.00);
INSERT INTO TicketPrice (ticket_type, day_of_week, price) VALUES ('normalny', 'Sobota', 30.00);
INSERT INTO TicketPrice (ticket_type, day_of_week, price) VALUES ('normalny', 'Niedziela', 30.00);

INSERT INTO TicketPrice (ticket_type, day_of_week, price) VALUES ('ulgowy', 'Poniedziałek', 16.00);
INSERT INTO TicketPrice (ticket_type, day_of_week, price) VALUES ('ulgowy', 'Wtorek', 24.00);
INSERT INTO TicketPrice (ticket_type, day_of_week, price) VALUES ('ulgowy', 'Środa', 19.00);
INSERT INTO TicketPrice (ticket_type, day_of_week, price) VALUES ('ulgowy', 'Czwartek', 24.00);
INSERT INTO TicketPrice (ticket_type, day_of_week, price) VALUES ('ulgowy', 'Piątek', 28.00);
INSERT INTO TicketPrice (ticket_type, day_of_week, price) VALUES ('ulgowy', 'Sobota', 28.00);
INSERT INTO TicketPrice (ticket_type, day_of_week, price) VALUES ('ulgowy', 'Niedziela', 28.00);

INSERT INTO TicketPrice (ticket_type, day_of_week, price) VALUES ('senior', 'Poniedziałek', 16.00);
INSERT INTO TicketPrice (ticket_type, day_of_week, price) VALUES ('senior', 'Wtorek', 16.00);
INSERT INTO TicketPrice (ticket_type, day_of_week, price) VALUES ('senior', 'Środa', 16.00);
INSERT INTO TicketPrice (ticket_type, day_of_week, price) VALUES ('senior', 'Czwartek', 16.00);
INSERT INTO TicketPrice (ticket_type, day_of_week, price) VALUES ('senior', 'Piątek', 26.00);
INSERT INTO TicketPrice (ticket_type, day_of_week, price) VALUES ('senior', 'Sobota', 26.00);
INSERT INTO TicketPrice (ticket_type, day_of_week, price) VALUES ('senior', 'Niedziela', 26.00);





-- Trigger to update AvailableSeats when a ticket is purchased
DELIMITER $$
CREATE TRIGGER after_ticket_insert
AFTER INSERT ON Tickets
FOR EACH ROW
BEGIN
    UPDATE AvailableSeats
    SET is_available = false
    WHERE Shows_id = NEW.Shows_id AND seat_number = NEW.seat_number;
END$$
DELIMITER ;

----- dodawanie insertow z data na najblizszy tydzien, od 25 pazdziernika(piatek)
DELIMITER $$

CREATE EVENT add_weekly_showtimes
ON SCHEDULE EVERY 1 WEEK
STARTS '2024-10-25 00:00:00'
DO
BEGIN
    -- Najpierw usuwamy stare dane starsze niż 7 dni
    DELETE FROM Shows
    WHERE show_time < CURDATE() - INTERVAL 7 DAY;
    
    -- Następnie dodajemy nowe wpisy z przesunięciem dat o 7 dni
    INSERT INTO Shows (Movies_id, show_time, City_id, Hall_id, day_of_week)
    SELECT Movies_id, DATE_ADD(show_time, INTERVAL 7 DAY), City_id, Hall_id, day_of_week
    FROM Shows
    WHERE show_time BETWEEN '2024-10-18 00:00:00' AND '2024-10-24 23:59:59';
END $$

DELIMITER ;