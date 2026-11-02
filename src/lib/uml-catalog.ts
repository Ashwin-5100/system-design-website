export type UmlEntry = {
  slug: string;
  title: string;
  image: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  requirements: string[];
  classes: { name: string; role: string }[];
};

export const umlEntries: UmlEntry[] = [

{
  slug: "lld-designing-an-airline-management-system",
  title: `Designing an Airline Management System`,
  image: "/uml/airlinemanagementsystem-class-diagram.png",
  level: "Intermediate",
  requirements: [`The airline management system should allow users to search for flights based on source, destination, and date.`, `Users should be able to book flights, select seats, and make payments.`, `The system should manage flight schedules, aircraft assignments, and crew assignments.`, `The system should handle passenger information, including personal details and baggage information.`, `The system should support different types of users, such as passengers, airline staff, and administrators.`, `The system should be able to handle cancellations, refunds, and flight changes.`, `The system should ensure data consistency and handle concurrent access to shared resources.`, `The system should be scalable and extensible to accommodate future enhancements and new features.`],
  classes: [
    { name: `Flight`, role: `class represents a flight in the airline management system, with properties such as flight number, source, destination, departure time, arrival time, and available seats.` },
{ name: `Aircraft`, role: `class represents an aircraft, with properties like tail number, model, and total seats.` },
{ name: `Passenger`, role: `class represents a passenger, with properties such as ID, name, email, and phone number.` },
{ name: `Booking`, role: `class represents a booking made by a passenger for a specific flight and seat, with properties such as booking number, flight, passenger, seat, price, and booking status.` },
{ name: `Seat`, role: `class represents a seat on a flight, with properties like seat number, seat type, and seat status.` },
{ name: `Payment`, role: `class represents a payment made for a booking, with properties such as payment ID, payment method, amount, and payment status.` },
{ name: `FlightSearch`, role: `class provides functionality to search for flights based on source, destination, and date.` },
{ name: `BookingManager`, role: `class manages the creation and cancellation of bookings. It follows the Singleton pattern to ensure a single instance of the booking manager.` },
{ name: `PaymentProcessor`, role: `class handles the processing of payments. It follows the Singleton pattern to ensure a single instance of the payment processor.` },
{ name: `AirlineManagementSystem`, role: `class serves as the main entry point of the system, combining all the components and providing methods for flight management, booking, payment processing, and other operations.` }
  ],
},

{
  slug: "lld-designing-an-atm-system",
  title: `Designing an ATM System`,
  image: "/uml/atm-class-diagram.png",
  level: "Intermediate",
  requirements: [`The ATM system should support basic operations such as balance inquiry, cash withdrawal, and cash deposit.`, `Users should be able to authenticate themselves using a card and a PIN (Personal Identification Number).`, `The system should interact with a bank's backend system to validate user accounts and perform transactions.`, `The ATM should have a cash dispenser to dispense cash to users.`, `The system should handle concurrent access and ensure data consistency.`, `The ATM should have a user-friendly interface for users to interact with.`],
  classes: [
    { name: `Card`, role: `class represents an ATM card with a card number and PIN.` },
{ name: `Account`, role: `class represents a bank account with an account number and balance. It provides methods to debit and credit the account balance.` },
{ name: `Transaction`, role: `class is an abstract base class for different types of transactions, such as withdrawal and deposit. It is extended by WithdrawalTransaction and DepositTransaction classes.` },
{ name: `BankingService`, role: `class manages the bank accounts and processes transactions. It uses a thread-safe ConcurrentHashMap to store and retrieve account information.` },
{ name: `CashDispenser`, role: `class represents the ATM's cash dispenser and handles the dispensing of cash. It uses synchronization to ensure thread safety when dispensing cash.` },
{ name: `ATM`, role: `class serves as the main interface for ATM operations. It interacts with the BankingService and CashDispenser to perform user authentication, balance inquiry, cash withdrawal, and cash deposit.` },
{ name: `ATMDriver`, role: `class demonstrates the usage of the ATM system by creating sample accounts and performing ATM operations.` }
  ],
},

{
  slug: "lld-designing-a-car-rental-system",
  title: `Designing a Car Rental System`,
  image: "/uml/carrentalsystem-class-diagram.png",
  level: "Intermediate",
  requirements: [`The car rental system should allow customers to browse and reserve available cars for specific dates.`, `Each car should have details such as make, model, year, license plate number, and rental price per day.`, `Customers should be able to search for cars based on various criteria, such as car type, price range, and availability.`, `The system should handle reservations, including creating, modifying, and canceling reservations.`, `The system should keep track of the availability of cars and update their status accordingly.`, `The system should handle customer information, including name, contact details, and driver's license information.`, `The system should handle payment processing for reservations.`, `The system should be able to handle concurrent reservations and ensure data consistency.`],
  classes: [
    { name: `Car`, role: `class represents a car in the rental system, with properties such as make, model, year, license plate number, rental price per day, and availability status.` },
{ name: `Customer`, role: `class represents a customer, with properties like name, contact information, and driver's license number.` },
{ name: `Reservation`, role: `class represents a reservation made by a customer for a specific car and date range. It includes properties such as reservation ID, customer, car, start date, end date, and total price.` },
{ name: `PaymentProcessor`, role: `interface defines the contract for payment processing, and the CreditCardPaymentProcessor and PayPalPaymentProcessor classes are concrete implementations of the payment processor.` },
{ name: `RentalSystem`, role: `class is the core of the car rental system and follows the Singleton pattern to ensure a single instance of the rental system.` },
{ name: `RentalSystem`, role: `class provides methods for adding and removing cars, searching for available cars based on criteria, making reservations, canceling reservations, and processing payments.` },
{ name: `CarRentalSystem`, role: `class serves as the entry point of the application and demonstrates the usage of the car rental system.` }
  ],
},

{
  slug: "lld-designing-a-chess-game",
  title: `Designing a Chess Game`,
  image: "/uml/chessgame-class-diagram.png",
  level: "Advanced",
  requirements: [`The chess game should follow the standard rules of chess.`, `The game should support two players, each controlling their own set of pieces.`, `The game board should be represented as an 8x8 grid, with alternating black and white squares.`, `Each player should have 16 pieces: 1 king, 1 queen, 2 rooks, 2 bishops, 2 knights, and 8 pawns.`, `The game should validate legal moves for each piece and prevent illegal moves.`, `The game should detect checkmate and stalemate conditions.`, `The game should handle player turns and allow players to make moves alternately.`, `The game should provide a user interface for players to interact with the game.`],
  classes: [
    { name: `Piece`, role: `class is an abstract base class representing a chess piece. It contains common attributes such as color, row, and column, and declares an abstract method canMove to be implemented by each specific piece class.` },
{ name: `King**, **Queen**, **Rook**, **Bishop**, **Knight**, and **Pawn`, role: `classes extend the Piece class and implement their respective movement logic in the canMove method.` },
{ name: `Board`, role: `class represents the chess board and manages the placement of pieces. It provides methods to get and set pieces on the board, check the validity of moves, and determine checkmate and stalemate conditions.` },
{ name: `Player`, role: `class represents a player in the game and has a method to make a move on the board.` },
{ name: `Game`, role: `class orchestrates the overall game flow. It initializes the board, handles player turns, and determines the game result.` },
{ name: `ChessGame`, role: `class is the entry point of the application and starts the game.` }
  ],
},

{
  slug: "lld-designing-a-coffee-vending-machine",
  title: `Designing a Coffee Vending Machine`,
  image: "/uml/coffeevendingmachine-class-diagram.png",
  level: "Beginner",
  requirements: [`The coffee vending machine should support different types of coffee, such as espresso, cappuccino, and latte.`, `Each type of coffee should have a specific price and recipe (ingredients and their quantities).`, `The machine should have a menu to display the available coffee options and their prices.`, `Users should be able to select a coffee type and make a payment.`, `The machine should dispense the selected coffee and provide change if necessary.`, `The machine should track the inventory of ingredients and notify when they are running low.`, `The machine should handle multiple user requests concurrently and ensure thread safety.`],
  classes: [
    { name: `Coffee`, role: `class represents a coffee type with its name, price, and recipe (ingredients and their quantities).` },
{ name: `Ingredient`, role: `class represents an ingredient used in making coffee, with its name and quantity. It provides a synchronized method to update the quantity.` },
{ name: `Payment`, role: `class represents a payment made by a user, with the amount paid.` },
{ name: `CoffeeMachine`, role: `class is the main class that manages the coffee vending machine. It follows the Singleton pattern to ensure a single instance of the machine.` },
{ name: `CoffeeMachine`, role: `class initializes the coffee menu and ingredients in its constructor. It provides methods to display the menu, select a coffee, dispense coffee, and update ingredient quantities.` },
{ name: `CoffeeVendingMachine`, role: `class is the entry point of the application and demonstrates the usage of the coffee vending machine. It creates an instance of the machine, displays the menu, and simulates concurrent user requests using an ExecutorService.` }
  ],
},

{
  slug: "lld-designing-a-concert-ticket-booking-system",
  title: `Designing a Concert Ticket Booking System`,
  image: "/uml/concertticketbookingsystem-class-diagram.png",
  level: "Intermediate",
  requirements: [`The concert ticket booking system should allow users to view available concerts and their seating arrangements.`, `Users should be able to search for concerts based on various criteria such as artist, venue, date, and time.`, `Users should be able to select seats and purchase tickets for a specific concert.`, `The system should handle concurrent booking requests to avoid double-booking of seats.`, `The system should ensure fair booking opportunities for all users.`, `The system should handle payment processing securely.`, `The system should generate booking confirmations and send them to users via email or SMS.`, `The system should provide a waiting list functionality for sold-out concerts.`],
  classes: [
    { name: `Concert`, role: `class represents a concert event, with properties such as ID, artist, venue, date and time, and a list of seats.` },
{ name: `Seat`, role: `class represents a seat in a concert, with properties like ID, seat number, seat type, price, and status. It provides methods to book and release a seat.` },
{ name: `SeatType`, role: `enum represents the different types of seats available, such as regular, premium, and VIP.` },
{ name: `SeatStatus`, role: `enum represents the status of a seat, which can be available, booked, or reserved.` },
{ name: `Booking`, role: `class represents a booking made by a user for a specific concert and seats. It contains properties such as ID, user, concert, seats, total price, and status. It provides methods to confirm and cancel a booking.` },
{ name: `BookingStatus`, role: `enum represents the status of a booking, which can be pending, confirmed, or cancelled.` },
{ name: `User`, role: `class represents a user of the concert ticket booking system, with properties like ID, name, and email.` },
{ name: `ConcertTicketBookingSystem`, role: `class is the central component of the system. It follows the Singleton pattern to ensure a single instance of the system. It manages concerts, bookings, and provides methods to add concerts, search concerts, book tickets, and cancel bookings.` },
{ name: `SeatNotAvailableException`, role: `is a custom exception used to handle cases where a seat is not available for booking.` }
  ],
},

{
  slug: "lld-designing-a-university-course-registration-system",
  title: `Designing a University Course Registration System`,
  image: "/uml/courseregistrationsystem-class-diagram.png",
  level: "Advanced",
  requirements: [`The course registration system should allow students to register for courses and view their registered courses.`, `Each course should have a course code, name, instructor, and maximum enrollment capacity.`, `Students should be able to search for courses based on course code or name.`, `The system should prevent students from registering for courses that have reached their maximum enrollment capacity.`, `The system should handle concurrent registration requests from multiple students.`, `The system should ensure data consistency and prevent race conditions.`, `The system should be extensible to accommodate future enhancements and new features.`],
  classes: [
    { name: `Student`, role: `class represents a student in the course registration system, with properties such as ID, name, email, and a list of registered courses.` },
{ name: `Course`, role: `class represents a course offered in the system, with properties such as code, name, instructor, maximum capacity, and the number of enrolled students.` },
{ name: `Registration`, role: `class represents a registration record, associating a student with a course and capturing the registration timestamp.` },
{ name: `CourseRegistrationSystem`, role: `class is the main class that manages the course registration system. It follows the Singleton pattern to ensure only one instance of the system exists.` },
{ name: `CourseRegistrationDemo`, role: `class demonstrates the usage of the course registration system by creating courses and students, searching for courses, registering students for courses, and retrieving registered courses for a student.` }
  ],
},

{
  slug: "lld-designing-a-cricket-information-system-like-cricinfo",
  title: `Designing a Cricket Information System like CricInfo`,
  image: "/uml/cricinfo-class-diagram.png",
  level: "Advanced",
  requirements: [`The Cricinfo system should provide information about cricket matches, teams, players, and live scores.`, `Users should be able to view the schedule of upcoming matches and the results of completed matches.`, `The system should allow users to search for specific matches, teams, or players.`, `Users should be able to view detailed information about a particular match, including the scorecard, commentary, and statistics.`, `The system should support real-time updates of live scores and match information.`, `The system should handle concurrent access to match data and ensure data consistency.`, `The system should be scalable and able to handle a large volume of user requests.`, `The system should be extensible to accommodate new features and enhancements in the future.`],
  classes: [
    { name: `Match`, role: `class represents a cricket match, with properties such as ID, title, venue, start time, teams, status, and scorecard.` },
{ name: `Team`, role: `class represents a cricket team, with properties like ID, name, and a list of players.` },
{ name: `Player`, role: `class represents a cricket player, with properties such as ID, name, and role.` },
{ name: `Scorecard`, role: `class represents the scorecard of a match, containing team scores and a list of innings.` },
{ name: `Innings`, role: `class represents an innings in a match, with properties like ID, batting team, bowling team, and a list of overs.` },
{ name: `Over`, role: `class represents an over in an innings, containing a list of balls.` },
{ name: `Ball`, role: `class represents a ball bowled in an over, with properties such as ball number, bowler, batsman, and result.` },
{ name: `MatchStatus`, role: `enum represents the different statuses of a match, such as scheduled, in progress, completed, or abandoned.` },
{ name: `MatchService`, role: `class manages the matches in the system, providing methods to add, retrieve, and update match information. It follows the Singleton pattern to ensure a single instance of the service.` },
{ name: `ScorecardService`, role: `class manages the scorecards of matches, allowing the creation, retrieval, and update of scorecards and their associated data, such as innings and scores. It also follows the Singleton pattern.` },
{ name: `CricinfoSystem`, role: `class serves as the main entry point of the system, integrating the match and scorecard services and providing high-level methods for interacting with the system.` }
  ],
},

{
  slug: "lld-designing-a-digital-wallet-service",
  title: `Designing a Digital Wallet Service`,
  image: "/uml/digitalwalletservice-class-diagram.png",
  level: "Intermediate",
  requirements: [`The digital wallet should allow users to create an account and manage their personal information.`, `Users should be able to add and remove payment methods, such as credit cards or bank accounts.`, `The digital wallet should support fund transfers between users and to external accounts.`, `The system should handle transaction history and provide a statement of transactions.`, `The digital wallet should support multiple currencies and perform currency conversions.`, `The system should ensure the security of user information and transactions.`, `The digital wallet should handle concurrent transactions and ensure data consistency.`, `The system should be scalable to handle a large number of users and transactions.`],
  classes: [
    { name: `User`, role: `class represents a user of the digital wallet, with properties such as ID, name, email, password, and a list of accounts.` },
{ name: `Account`, role: `class represents a user's account within the digital wallet, with properties like ID, user, account number, currency, balance, and a list of transactions. It provides methods to deposit and withdraw funds.` },
{ name: `Transaction`, role: `class represents a financial transaction between two accounts, containing properties such as ID, source account, destination account, amount, currency, and timestamp.` },
{ name: `PaymentMethod`, role: `class is an abstract base class for different payment methods, such as credit cards and bank accounts. It defines the common properties and methods for processing payments.` },
{ name: `CreditCard`, role: `and **BankAccount** classes are concrete implementations of the PaymentMethod class, representing specific payment methods.` },
{ name: `Currency`, role: `enum represents different currencies supported by the digital wallet.` },
{ name: `CurrencyConverter`, role: `class provides a static method to convert amounts between different currencies based on predefined exchange rates.` },
{ name: `DigitalWallet`, role: `class is the central component of the digital wallet system. It follows the Singleton pattern to ensure only one instance of the digital wallet exists. It provides methods to create users, accounts, add payment methods, transfer funds, and retrieve transaction history. It handles concurrent access to shared resources using synchronization.` },
{ name: `DigitalWalletDemo`, role: `class demonstrates the usage of the digital wallet system by creating users, accounts, adding payment methods, depositing funds, transferring funds, and retrieving transaction history.` }
  ],
},

{
  slug: "lld-designing-an-elevator-system",
  title: `Designing an Elevator System`,
  image: "/uml/elevatorsystem-class-diagram.png",
  level: "Intermediate",
  requirements: [`The elevator system should consist of multiple elevators serving multiple floors.`, `Each elevator should have a capacity limit and should not exceed it.`, `Users should be able to request an elevator from any floor and select a destination floor.`, `The elevator system should efficiently handle user requests and optimize the movement of elevators to minimize waiting time.`, `The system should prioritize requests based on the direction of travel and the proximity of the elevators to the requested floor.`, `The elevators should be able to handle multiple requests concurrently and process them in an optimal order.`, `The system should ensure thread safety and prevent race conditions when multiple threads interact with the elevators.`],
  classes: [
    { name: `Direction`, role: `enum represents the possible directions of elevator movement (UP or DOWN).` },
{ name: `Request`, role: `class represents a user request for an elevator, containing the source floor and destination floor.` },
{ name: `Elevator`, role: `class represents an individual elevator in the system. It has a capacity limit and maintains a list of 4. requests. The elevator processes requests concurrently and moves between floors based on the requests.` },
{ name: `ElevatorController`, role: `class manages multiple elevators and handles user requests. It finds the optimal elevator to serve a request based on the proximity of the elevators to the requested floor.` },
{ name: `ElevatorSystem`, role: `class is the entry point of the application and demonstrates the usage of the elevator system.` }
  ],
},

{
  slug: "lld-designing-an-online-food-delivery-service-like-swiggy",
  title: `Designing an Online Food Delivery Service Like Swiggy`,
  image: "/uml/fooddeliveryservice-class-diagram.png",
  level: "Advanced",
  requirements: [`The food delivery service should allow customers to browse restaurants, view menus, and place orders.`, `Restaurants should be able to manage their menus, prices, and availability.`, `Delivery agents should be able to accept and fulfill orders.`, `The system should handle order tracking and status updates.`, `The system should support multiple payment methods.`, `The system should handle concurrent orders and ensure data consistency.`, `The system should be scalable and handle a high volume of orders.`, `The system should provide real-time notifications to customers, restaurants, and delivery agents.`],
  classes: [
    { name: `Customer`, role: `class represents a customer who can place orders. It contains customer details such as ID, name, email, and phone number.` },
{ name: `Restaurant`, role: `class represents a restaurant that offers menu items. It contains restaurant details such as ID, name, address, and a list of menu items. It provides methods to add and remove menu items.` },
{ name: `MenuItem`, role: `class represents an item on a restaurant's menu. It contains details such as ID, name, description, price, and availability status.` },
{ name: `Order`, role: `class represents an order placed by a customer. It contains order details such as ID, customer, restaurant, list of order items, status, and assigned delivery agent. It provides methods to add and remove order items, update order status, and assign a delivery agent.` },
{ name: `OrderItem`, role: `class represents an item within an order. It contains the selected menu item and the quantity ordered.` },
{ name: `OrderStatus`, role: `enum represents the different statuses an order can have, such as PENDING, CONFIRMED, PREPARING, OUT_FOR_DELIVERY, DELIVERED, and CANCELLED.` },
{ name: `DeliveryAgent`, role: `class represents a delivery agent who fulfills orders. It contains details such as ID, name, phone number, and availability status.` },
{ name: `FoodDeliveryService`, role: `class is the main class that manages the food delivery service. It follows the Singleton pattern to ensure only one instance of the service exists. It provides methods to register customers, restaurants, and delivery agents, retrieve available restaurants and menus, place orders, update order status, cancel orders, and assign delivery agents to orders. It also handles notifications to customers, restaurants, and delivery agents.` }
  ],
},

{
  slug: "lld-designing-a-hotel-management-system",
  title: `Designing a Hotel Management System`,
  image: "/uml/hotelmanagementsystem-class-diagram.png",
  level: "Intermediate",
  requirements: [`The hotel management system should allow guests to book rooms, check-in, and check-out.`, `The system should manage different types of rooms, such as single, double, deluxe, and suite.`, `The system should handle room availability and reservation status.`, `The system should allow the hotel staff to manage guest information, room assignments, and billing.`, `The system should support multiple payment methods, such as cash, credit card, and online payment.`, `The system should handle concurrent bookings and ensure data consistency.`, `The system should provide reporting and analytics features for hotel management.`, `The system should be scalable and handle a large number of rooms and guests.`],
  classes: [
    { name: `Guest`, role: `class represents a guest of the hotel, with properties such as ID, name, email, and phone number.` },
{ name: `Room`, role: `class represents a room in the hotel, with properties like ID, room type, price, and status. It provides methods to book, check-in, and check-out a room.` },
{ name: `RoomType`, role: `enum represents the different types of rooms available in the hotel.` },
{ name: `RoomStatus`, role: `enum represents the status of a room, which can be available, booked, or occupied.` },
{ name: `Reservation`, role: `class represents a reservation made by a guest for a specific room and date range. It contains properties such as ID, guest, room, check-in date, check-out date, and status. It provides a method to cancel a reservation.` },
{ name: `ReservationStatus`, role: `enum represents the status of a reservation, which can be confirmed or cancelled.` },
{ name: `Payment`, role: `interface defines the contract for processing payments. It is implemented by concrete payment classes like CashPayment and CreditCardPayment.` },
{ name: `HotelManagementSystem`, role: `class is the central component of the hotel management system. It follows the Singleton pattern to ensure only one instance of the system exists. It provides methods to add guests and rooms, book rooms, cancel reservations, check-in, check-out, and process payments. It also handles concurrent access to shared resources using synchronization.` },
{ name: `HotelManagementSystemDemo`, role: `class demonstrates the usage of the hotel management system by creating guests, rooms, booking a room, checking in, checking out, and cancelling a reservation.` }
  ],
},

{
  slug: "lld-designing-a-library-management-system",
  title: `Designing a Library Management System`,
  image: "/uml/librarymanagementsystem-class-diagram.png",
  level: "Intermediate",
  requirements: [`The library management system should allow librarians to manage books, members, and borrowing activities.`, `The system should support adding, updating, and removing books from the library catalog.`, `Each book should have details such as title, author, ISBN, publication year, and availability status.`, `The system should allow members to borrow and return books.`, `Each member should have details such as name, member ID, contact information, and borrowing history.`, `The system should enforce borrowing rules, such as a maximum number of books that can be borrowed at a time and loan duration.`, `The system should handle concurrent access to the library catalog and member records.`, `The system should be extensible to accommodate future enhancements and new features.`],
  classes: [
    { name: `Book`, role: `class represents a book in the library catalog, with properties such as ISBN, title, author, publication year, and availability status.` },
{ name: `Member`, role: `class represents a library member, with properties like member ID, name, contact information, and a list of borrowed books.` },
{ name: `LibraryManager`, role: `class is the core of the library management system and follows the Singleton pattern to ensure a single instance of the library manager.` },
{ name: `LibraryManagementSystemDemo`, role: `class serves as the entry point of the application and demonstrates the usage of the library management system.` }
  ],
},

{
  slug: "lld-designing-a-professional-networking-platform-like-linkedin",
  title: `Designing a Professional Networking Platform like LinkedIn`,
  image: "/uml/linkedin-class-diagram.png",
  level: "Intermediate",
  requirements: [],
  classes: [
    { name: `User`, role: `class represents a user in the LinkedIn system, containing properties such as ID, name, email, password, profile, connections, inbox, and sent messages.` },
{ name: `Profile`, role: `class represents a user's profile, containing properties such as profile picture, headline, summary, experiences, educations, and skills.` },
{ name: `Experience**, **Education**, and **Skill`, role: `classes represent different components of a user's profile.` },
{ name: `Connection`, role: `class represents a connection between two users, containing the user and the connection date.` },
{ name: `Message`, role: `class represents a message sent between users, containing properties such as ID, sender, receiver, content, and timestamp.` },
{ name: `JobPosting`, role: `class represents a job listing posted by an employer, containing properties such as ID, title, description, requirements, location, and post date.` },
{ name: `Notification`, role: `class represents a notification generated for a user, containing properties such as ID, user, notification type, content, and timestamp.` },
{ name: `NotificationType`, role: `enum defines the different types of notifications, such as connection request, message, and job posting.` },
{ name: `LinkedInService`, role: `class is the main class that manages the LinkedIn system. It follows the Singleton pattern to ensure only one instance of the service exists.` },
{ name: `LinkedInService`, role: `class provides methods for user registration, login, profile updates, connection requests, job postings, user and job search, messaging, and notifications.` },
{ name: `LinkedInDemo`, role: `class demonstrates the usage of the LinkedIn system by registering users, logging in, updating profiles, sending connection requests, posting job listings, searching for users and jobs, sending messages, and retrieving notifications.` }
  ],
},

{
  slug: "lld-designing-a-logging-framework",
  title: `Designing a Logging Framework`,
  image: "/uml/loggingframework-class-diagram.png",
  level: "Beginner",
  requirements: [`The logging framework should support different log levels, such as DEBUG, INFO, WARNING, ERROR, and FATAL.`, `It should allow logging messages with a timestamp, log level, and message content.`, `The framework should support multiple output destinations, such as console, file, and database.`, `It should provide a configuration mechanism to set the log level and output destination.`, `The logging framework should be thread-safe to handle concurrent logging from multiple threads.`, `It should be extensible to accommodate new log levels and output destinations in the future.`],
  classes: [
    { name: `LogLevel`, role: `enum defines the different log levels supported by the logging framework.` },
{ name: `LogMessage`, role: `class represents a log message with a timestamp, log level, and message content.` },
{ name: `LogAppender`, role: `interface defines the contract for appending log messages to different output destinations.` },
{ name: `ConsoleAppender**, **FileAppender**, and **DatabaseAppender`, role: `classes are concrete implementations of the LogAppender interface, supporting logging to the console, file, and database, respectively.` },
{ name: `LoggerConfig`, role: `class holds the configuration settings for the logger, including the log level and the selected log appender.` },
{ name: `Logger`, role: `class is a singleton that provides the main logging functionality. It allows setting the configuration, logging messages at different levels, and provides convenience methods for each log level.` },
{ name: `LoggingExample`, role: `class demonstrates the usage of the logging framework, showcasing different log levels, changing the configuration, and logging from multiple threads.` }
  ],
},

{
  slug: "lld-designing-a-lru-cache",
  title: `Designing a LRU Cache`,
  image: "/uml/lrucache-class-diagram.png",
  level: "Intermediate",
  requirements: [`The LRU cache should support the following operations:`, `The cache should have a fixed capacity, specified during initialization.`, `The cache should be thread-safe, allowing concurrent access from multiple threads.`, `The cache should be efficient in terms of time complexity for both put and get operations, ideally O(1).`],
  classes: [
    { name: `Node`, role: `class represents a node in the doubly linked list, containing the key, value, and references to the previous and next nodes.` },
{ name: `LRUCache`, role: `class implements the LRU cache functionality using a combination of a hash map (cache) and a doubly linked list (head and tail).` },
{ name: `LRUCacheDemo`, role: `class demonstrates the usage of the LRU cache by creating an instance of LRUCache with a capacity of 3, performing various put and get operations, and printing the results.` }
  ],
},

{
  slug: "lld-designing-a-movie-ticket-booking-system-like-bookmyshow",
  title: `Designing a Movie Ticket Booking System like BookMyShow`,
  image: "/uml/movieticketbookingsystem-class-diagram.png",
  level: "Advanced",
  requirements: [`The system should allow users to view the list of movies playing in different theaters.`, `Users should be able to select a movie, theater, and show timing to book tickets.`, `The system should display the seating arrangement of the selected show and allow users to choose seats.`, `Users should be able to make payments and confirm their booking.`, `The system should handle concurrent bookings and ensure seat availability is updated in real-time.`, `The system should support different types of seats (e.g., normal, premium) and pricing.`, `The system should allow theater administrators to add, update, and remove movies, shows, and seating arrangements.`, `The system should be scalable to handle a large number of concurrent users and bookings.`],
  classes: [
    { name: `Movie`, role: `class represents a movie with properties such as ID, title, description, and duration.` },
{ name: `Theater`, role: `class represents a theater with properties such as ID, name, location, and a list of shows.` },
{ name: `Show`, role: `class represents a movie show in a theater, with properties such as ID, movie, theater, start time, end time, and a map of seats.` },
{ name: `Seat`, role: `class represents a seat in a show, with properties such as ID, row, column, type, price, and status.` },
{ name: `SeatType`, role: `enum defines the different types of seats (normal or premium).` },
{ name: `SeatStatus`, role: `enum defines the different statuses of a seat (available or booked).` },
{ name: `Booking`, role: `class represents a booking made by a user, with properties such as ID, user, show, selected seats, total price, and status.` },
{ name: `BookingStatus`, role: `enum defines the different statuses of a booking (pending, confirmed, or cancelled).` },
{ name: `User`, role: `class represents a user of the booking system, with properties such as ID, name, and email.` },
{ name: `MovieTicketBookingSystem`, role: `class is the main class that manages the movie ticket booking system. It follows the Singleton pattern to ensure only one instance of the system exists.` },
{ name: `MovieTicketBookingDemo`, role: `class demonstrates the usage of the movie ticket booking system by adding movies, theaters, shows, booking tickets, and confirming or cancelling bookings.` }
  ],
},

{
  slug: "lld-designing-an-online-music-streaming-service-like-spotify",
  title: `Designing an Online Music Streaming Service Like Spotify`,
  image: "/uml/musicstreamingservice-class-diagram.png",
  level: "Advanced",
  requirements: [`The music streaming service should allow users to browse and search for songs, albums, and artists.`, `Users should be able to create and manage playlists.`, `The system should support user authentication and authorization.`, `Users should be able to play, pause, skip, and seek within songs.`, `The system should recommend songs and playlists based on user preferences and listening history.`, `The system should handle concurrent requests and ensure smooth streaming experience for multiple users.`, `The system should be scalable and handle a large volume of songs and users.`, `The system should be extensible to support additional features such as social sharing and offline playback.`],
  classes: [
    { name: `Song**, **Album**, and **Artist`, role: `classes represent the basic entities in the music streaming service, with properties such as ID, title, artist, album, duration, and relationships between them.` },
{ name: `User`, role: `class represents a user of the music streaming service, with properties like ID, username, password, and a list of playlists.` },
{ name: `Playlist`, role: `class represents a user-created playlist, containing a list of songs.` },
{ name: `MusicLibrary`, role: `class serves as a central repository for storing and managing songs, albums, and artists. It follows the Singleton pattern to ensure a single instance of the music library.` },
{ name: `UserManager`, role: `class handles user registration, login, and other user-related operations. It also follows the Singleton pattern.` },
{ name: `MusicPlayer`, role: `class represents the music playback functionality, allowing users to play, pause, skip, and seek within songs.` },
{ name: `MusicRecommender`, role: `class generates song recommendations based on user preferences and listening history. It follows the Singleton pattern.` },
{ name: `MusicStreamingService`, role: `class is the main entry point of the music streaming service. It initializes the necessary components, handles user requests, and manages the overall functionality of the service.` }
  ],
},

{
  slug: "lld-designing-an-online-auction-system",
  title: `Designing an Online Auction System`,
  image: "/uml/onlineauctionsystem-class-diagram.png",
  level: "Intermediate",
  requirements: [`The online auction system should allow users to register and log in to their accounts.`, `Users should be able to create new auction listings with details such as item name, description, starting price, and auction duration.`, `Users should be able to browse and search for auction listings based on various criteria (e.g., item name, category, price range).`, `Users should be able to place bids on active auction listings.`, `The system should automatically update the current highest bid and notify the bidders accordingly.`, `The auction should end when the specified duration is reached, and the highest bidder should be declared the winner.`, `The system should handle concurrent access to auction listings and ensure data consistency.`, `The system should be extensible to accommodate future enhancements and new features.`],
  classes: [
    { name: `User`, role: `class represents a user in the online auction system, with properties such as id, username, and email.` },
{ name: `AuctionStatus`, role: `enum defines the possible states of an auction listing, such as active and closed.` },
{ name: `AuctionListing`, role: `class represents an auction listing in the system, with properties like id, item name, description, starting price, duration, seller, current highest bid, and a list of bids.` },
{ name: `Bid`, role: `class represents a bid placed by a user on an auction listing, with properties such as id, bidder, amount, and timestamp.` },
{ name: `AuctionSystem`, role: `class is the core of the online auction system and follows the Singleton pattern to ensure a single instance of the auction system.` },
{ name: `AuctionSystemDemo`, role: `class serves as the entry point of the application and demonstrates the usage of the online auction system.` }
  ],
},

{
  slug: "lld-designing-an-online-shopping-system-like-amazon",
  title: `Designing an Online Shopping System Like Amazon`,
  image: "/uml/onlineshoppingservice-class-diagram.png",
  level: "Advanced",
  requirements: [`The online shopping service should allow users to browse products, add them to the shopping cart, and place orders.`, `The system should support multiple product categories and provide search functionality.`, `Users should be able to manage their profiles, view order history, and track order status.`, `The system should handle inventory management and update product availability accordingly.`, `The system should support multiple payment methods and ensure secure transactions.`, `The system should handle concurrent user requests and ensure data consistency.`, `The system should be scalable to handle a large number of products and users.`, `The system should provide a user-friendly interface for a seamless shopping experience.`],
  classes: [
    { name: `User`, role: `class represents a user in the online shopping service, with properties such as ID, name, email, password, and a list of orders.` },
{ name: `Product`, role: `class represents a product available for purchase, with properties like ID, name, description, price, and quantity. It provides methods to update the quantity and check product availability.` },
{ name: `Order`, role: `class represents an order placed by a user, containing properties such as ID, user, order items, total amount, and order status. It calculates the total amount based on the order items.` },
{ name: `OrderItem`, role: `class represents an item within an order, consisting of the product and the quantity ordered.` },
{ name: `OrderStatus`, role: `enum represents the different statuses an order can have, such as pending, processing, shipped, delivered, or cancelled.` },
{ name: `ShoppingCart`, role: `class represents the user's shopping cart, allowing them to add, remove, and update item quantities. It maintains a map of product IDs and order items.` },
{ name: `Payment`, role: `interface defines the contract for processing payments, with a concrete implementation CreditCardPayment.` },
{ name: `OnlineShoppingService`, role: `class is the central component of the online shopping service. It follows the Singleton pattern to ensure only one instance of the service exists. It provides methods to register users, add products, search products, place orders, and retrieve order information. It handles concurrent access to shared resources using synchronization.` },
{ name: `OnlineShoppingServiceDemo`, role: `class demonstrates the usage of the online shopping service by registering users, adding products, searching for products, placing orders, and viewing order history.` }
  ],
},

{
  slug: "lld-designing-an-online-stock-brokerage-system",
  title: `Designing an Online Stock Brokerage System`,
  image: "/uml/onlinestockbrokeragesystem-class-diagram.png",
  level: "Advanced",
  requirements: [`The online stock brokerage system should allow users to create and manage their trading accounts.`, `Users should be able to buy and sell stocks, as well as view their portfolio and transaction history.`, `The system should provide real-time stock quotes and market data to users.`, `The system should handle order placement, execution, and settlement processes.`, `The system should enforce various business rules and validations, such as checking account balances and stock availability.`, `The system should handle concurrent user requests and ensure data consistency and integrity.`, `The system should be scalable and able to handle a large number of users and transactions.`, `The system should be secure and protect sensitive user information.`],
  classes: [
    { name: `User`, role: `class represents a user of the stock brokerage system, with properties such as user ID, name, and email.` },
{ name: `Account`, role: `class represents a user's trading account, with properties like account ID, associated user, and balance. It provides methods for depositing and withdrawing funds.` },
{ name: `Stock`, role: `class represents a stock that can be traded, with properties such as symbol, name, and price. It provides a method for updating the stock price.` },
{ name: `Order`, role: `class is an abstract base class representing an order placed by a user. It contains common properties such as order ID, associated account, stock, quantity, price, and order status. The execute() method is declared as abstract, to be implemented by concrete order classes.` },
{ name: `BuyOrder`, role: `and **SellOrder** classes are concrete implementations of the Order class, representing buy and sell orders respectively. They provide the implementation for the execute() method specific to each order type.` },
{ name: `OrderStatus`, role: `enum represents the possible statuses of an order, such as PENDING, EXECUTED, or REJECTED.` },
{ name: `Portfolio`, role: `class represents a user's portfolio, which holds the stocks owned by the user. It provides methods for adding and removing stocks from the portfolio.` },
{ name: `StockBroker`, role: `class is the central component of the stock brokerage system. It follows the Singleton pattern to ensure a single instance of the stock broker. It manages user accounts, stocks, and order processing. It provides methods for creating accounts, adding stocks, placing orders, and processing orders.` },
{ name: `InsufficientFundsException`, role: `and **InsufficientStockException** classes are custom exceptions used to handle insufficient funds and insufficient stock scenarios respectively.` },
{ name: `StockBrokerageSystem`, role: `class serves as the entry point of the application and demonstrates the usage of the stock brokerage system.` }
  ],
},

{
  slug: "lld-designing-a-parking-lot-system",
  title: `Designing a Parking Lot System`,
  image: "/uml/parkinglot-class-diagram.png",
  level: "Beginner",
  requirements: [`The parking lot should have multiple levels, each level with a certain number of parking spots.`, `The parking lot should support different types of vehicles, such as cars, motorcycles, and trucks.`, `Each parking spot should be able to accommodate a specific type of vehicle.`, `The system should assign a parking spot to a vehicle upon entry and release it when the vehicle exits.`, `The system should track the availability of parking spots and provide real-time information to customers.`, `The system should handle multiple entry and exit points and support concurrent access.`],
  classes: [
    { name: `ParkingLot`, role: `class follows the Singleton pattern to ensure only one instance of the parking lot exists. It maintains a list of levels and provides methods to park and unpark vehicles.` },
{ name: `ParkingFloor`, role: `class represents a level in the parking lot and contains a list of parking spots. It handles parking and unparking of vehicles within the level.` },
{ name: `ParkingSpot`, role: `class represents an individual parking spot and tracks the availability and the parked vehicle.` },
{ name: `Vehicle`, role: `class is an abstract base class for different types of vehicles. It is extended by Car, Motorcycle, and Truck classes.` },
{ name: `VehicleSize`, role: `enum defines the different types of vehicles supported by the parking lot.` },
{ name: `Main`, role: `class demonstrates the usage of the parking lot system.` }
  ],
},

{
  slug: "lld-designing-a-pub-sub-system-in-java",
  title: `Designing a Pub-Sub System in Java`,
  image: "/uml/pubsubsystem-class-diagram.png",
  level: "Intermediate",
  requirements: [`The Pub-Sub system should allow publishers to publish messages to specific topics.`, `Subscribers should be able to subscribe to topics of interest and receive messages published to those topics.`, `The system should support multiple publishers and subscribers.`, `Messages should be delivered to all subscribers of a topic in real-time.`, `The system should handle concurrent access and ensure thread safety.`, `The Pub-Sub system should be scalable and efficient in terms of message delivery.`],
  classes: [
    { name: `Message`, role: `class represents a message that can be published and received by subscribers. It contains the message content.` },
{ name: `Topic`, role: `class represents a topic to which messages can be published. It maintains a set of subscribers and provides methods to add and remove subscribers, as well as publish messages to all subscribers.` },
{ name: `Subscriber`, role: `interface defines the contract for subscribers. It declares the onMessage method that is invoked when a subscriber receives a message.` },
{ name: `PrintSubscriber`, role: `class is a concrete implementation of the Subscriber interface. It receives messages and prints them to the console.` },
{ name: `Publisher`, role: `class represents a publisher that publishes messages to a specific topic.` },
{ name: `PubSubSystem`, role: `class is the main class that manages topics, subscribers, and message publishing. It uses a ConcurrentHashMap to store topics and an ExecutorService to handle concurrent message publishing.` },
{ name: `PubSubDemo`, role: `class demonstrates the usage of the Pub-Sub system by creating topics, subscribers, and publishers, and publishing messages.` }
  ],
},

{
  slug: "lld-designing-restaurant-management-system",
  title: `Designing Restaurant Management System`,
  image: "/uml/restaurantmanagementsystem-class-diagram.png",
  level: "Intermediate",
  requirements: [`The restaurant management system should allow customers to place orders, view the menu, and make reservations.`, `The system should manage the restaurant's inventory, including ingredients and menu items.`, `The system should handle order processing, including order preparation, billing, and payment.`, `The system should support multiple payment methods, such as cash, credit card, and mobile payments.`, `The system should manage staff information, including roles, schedules, and performance tracking.`, `The system should generate reports and analytics for management, such as sales reports and inventory analysis.`, `The system should handle concurrent access and ensure data consistency.`],
  classes: [
    { name: `MenuItem`, role: `class represents a menu item in the restaurant, with properties such as ID, name, description, price, and availability.` },
{ name: `Order`, role: `class represents an order placed by a customer, with properties such as ID, list of menu items, total amount, order status, and timestamp.` },
{ name: `OrderStatus`, role: `enum represents the different statuses an order can have, such as pending, preparing, ready, completed, or cancelled.` },
{ name: `Reservation`, role: `class represents a reservation made by a customer, with properties such as ID, customer name, contact number, party size, and reservation time.` },
{ name: `Payment`, role: `class represents a payment made for an order, with properties such as ID, amount, payment method, and payment status.` },
{ name: `PaymentMethod`, role: `enum represents the different payment methods supported by the restaurant, such as cash, credit card, or mobile payment.` },
{ name: `PaymentStatus`, role: `enum represents the status of a payment, which can be pending, completed, or failed.` },
{ name: `Restaurant`, role: `class is the main class that manages the restaurant operations. It follows the Singleton pattern to ensure only one instance of the restaurant exists.` },
{ name: `RestaurantManagementDemo`, role: `class demonstrates the usage of the restaurant management system by adding menu items, placing an order, making a reservation, processing a payment, updating order status, adding staff, and retrieving the menu.` }
  ],
},

{
  slug: "lld-designing-a-ride-sharing-service-like-uber",
  title: `Designing a Ride-Sharing Service Like Uber`,
  image: "/uml/ridesharingservice-class-diagram.png",
  level: "Advanced",
  requirements: [`The ride sharing service should allow passengers to request rides and drivers to accept and fulfill those ride requests.`, `Passengers should be able to specify their pickup location, destination, and desired ride type (e.g., regular, premium).`, `Drivers should be able to see available ride requests and choose to accept or decline them.`, `The system should match ride requests with available drivers based on proximity and other factors.`, `The system should calculate the fare for each ride based on distance, time, and ride type.`, `The system should handle payments and process transactions between passengers and drivers.`, `The system should provide real-time tracking of ongoing rides and notify passengers and drivers about ride status updates.`, `The system should handle concurrent requests and ensure data consistency.`],
  classes: [
    { name: `Passenger`, role: `class represents a passenger in the ride sharing service, with properties such as ID, name, contact information, and location.` },
{ name: `Driver`, role: `class represents a driver in the ride sharing service, with properties such as ID, name, contact information, license plate, location, and status (available or busy).` },
{ name: `Ride`, role: `class represents a ride requested by a passenger and accepted by a driver, with properties such as ID, passenger, driver, source location, destination location, status, and fare.` },
{ name: `Location`, role: `class represents a geographical location with latitude and longitude coordinates.` },
{ name: `Payment`, role: `class represents a payment made for a ride, with properties such as ID, ride, amount, and payment status.` },
{ name: `RideService`, role: `class is the main class that manages the ride sharing service. It follows the Singleton pattern to ensure only one instance of the service exists.` },
{ name: `RideSharingDemo`, role: `class demonstrates the usage of the ride sharing service by creating passengers and drivers, requesting rides, accepting rides, starting rides, completing rides, and canceling rides.` }
  ],
},

{
  slug: "lld-designing-snake-and-ladder-game",
  title: `Designing Snake and Ladder Game`,
  image: "/uml/snakeandladdergame-class-diagram.png",
  level: "Advanced",
  requirements: [`The game should be played on a board with numbered cells, typically with 100 cells.`, `The board should have a predefined set of snakes and ladders, connecting certain cells.`, `The game should support multiple players, each represented by a unique game piece.`, `Players should take turns rolling a dice to determine the number of cells to move forward.`, `If a player lands on a cell with the head of a snake, they should slide down to the cell with the tail of the snake.`, `If a player lands on a cell with the base of a ladder, they should climb up to the cell at the top of the ladder.`, `The game should continue until one of the players reaches the final cell on the board.`, `The game should handle multiple game sessions concurrently, allowing different groups of players to play independently.`],
  classes: [
    { name: `Board`, role: `class represents the game board with a fixed size (e.g., 100 cells). It contains the positions of snakes and ladders and provides methods to initialize them and retrieve the new position after encountering a snake or ladder.` },
{ name: `Player`, role: `class represents a player in the game, with properties such as name and current position on the board.` },
{ name: `Snake`, role: `class represents a snake on the board, with properties for the start and end positions.` },
{ name: `Ladder`, role: `class represents a ladder on the board, with properties for the start and end positions.` },
{ name: `Dice`, role: `class represents a dice used in the game, with a method to roll the dice and return a random value between 1 and 6.` },
{ name: `SnakeAndLadderGame`, role: `class represents a single game session. It initializes the game with a board, a list of players, and a dice. The play method handles the game loop, where players take turns rolling the dice and moving their positions on the board. It checks for snakes and ladders and updates the player's position accordingly. The game continues until a player reaches the final position on the board.` },
{ name: `GameManager`, role: `class is a singleton that manages multiple game sessions. It maintains a list of active games and provides a method to start a new game with a list of player names. Each game is started in a separate thread to allow concurrent game sessions.` },
{ name: `SnakeAndLadderDemo`, role: `class demonstrates the usage of the game by creating an instance of the GameManager and starting two separate game sessions with different sets of players.` }
  ],
},

{
  slug: "lld-designing-a-social-network-like-facebook",
  title: `Designing a Social Network Like Facebook`,
  image: "/uml/socialnetworkingservice-class-diagram.png",
  level: "Intermediate",
  requirements: [],
  classes: [
    { name: `User`, role: `class represents a user in the social networking system, containing properties such as ID, name, email, password, profile picture, bio, list of friends, and list of posts.` },
{ name: `Post`, role: `class represents a post created by a user, containing properties such as ID, user ID, content, image URLs, video URLs, timestamp, likes, and comments.` },
{ name: `Comment`, role: `class represents a comment made by a user on a post, containing properties such as ID, user ID, post ID, content, and timestamp.` },
{ name: `Notification`, role: `class represents a notification generated for a user, containing properties such as ID, user ID, notification type, content, and timestamp.` },
{ name: `NotificationType`, role: `enum defines the different types of notifications, such as friend request, friend request accepted, like, comment, and mention.` },
{ name: `SocialNetworkingService`, role: `class is the main class that manages the social networking system. It follows the Singleton pattern to ensure only one instance of the service exists.` },
{ name: `SocialNetworkingDemo`, role: `class demonstrates the usage of the social networking system by registering users, logging in, sending friend requests, creating posts, liking posts, commenting on posts, and retrieving newsfeed and notifications.` }
  ],
},

{
  slug: "lld-designing-splitwise",
  title: `Designing Splitwise`,
  image: "/uml/splitwise-class-diagram.png",
  level: "Advanced",
  requirements: [`The system should allow users to create accounts and manage their profile information.`, `Users should be able to create groups and add other users to the groups.`, `Users should be able to add expenses within a group, specifying the amount, description, and participants.`, `The system should automatically split the expenses among the participants based on their share.`, `Users should be able to view their individual balances with other users and settle up the balances.`, `The system should support different split methods, such as equal split, percentage split, and exact amounts.`, `Users should be able to view their transaction history and group expenses.`, `The system should handle concurrent transactions and ensure data consistency.`],
  classes: [
    { name: `User`, role: `class represents a user in the Splitwise system, with properties such as ID, name, email, and a map to store balances with other users.` },
{ name: `Group`, role: `class represents a group in Splitwise, containing a list of member users and a list of expenses.` },
{ name: `Expense`, role: `class represents an expense within a group, with properties such as ID, amount, description, the user who paid, and a list of splits.` },
{ name: `Split`, role: `class is an abstract class representing the split of an expense. It is extended by EqualSplit, PercentSplit, and ExactSplit classes to handle different split methods.` },
{ name: `Transaction`, role: `class represents a transaction between two users, with properties such as ID, sender, receiver, and amount.` },
{ name: `SplitwiseService`, role: `class is the main class that manages the Splitwise system. It follows the Singleton pattern to ensure only one instance of the service exists.` },
{ name: `SplitwiseDemo`, role: `class demonstrates the usage of the Splitwise system by creating users, a group, adding an expense, settling balances, and printing user balances.` }
  ],
},

{
  slug: "lld-designing-stack-overflow",
  title: `Designing Stack Overflow`,
  image: "/uml/stackoverflow-class-diagram.png",
  level: "Beginner",
  requirements: [`Users can post questions, answer questions, and comment on questions and answers.`, `Users can vote on questions and answers.`, `Questions should have tags associated with them.`, `Users can search for questions based on keywords, tags, or user profiles.`, `The system should assign reputation score to users based on their activity and the quality of their contributions.`, `The system should handle concurrent access and ensure data consistency.`],
  classes: [
    { name: `User`, role: `class represents a user of the Stack Overflow system, with properties such as id, username, email, and reputation.` },
{ name: `Question`, role: `class represents a question posted by a user, with properties such as id, title, content, author, answers, comments, tags, votes and creation date.` },
{ name: `Answer`, role: `class represents an answer to a question, with properties such as id, content, author, associated question, comments, votes and creation date.` },
{ name: `Comment`, role: `class represents a comment on a question or an answer, with properties such as id, content, author, and creation date.` },
{ name: `Tag`, role: `class represents a tag associated with a question, with properties such as id and name.` },
{ name: `Vote`, role: `class represents vote associated with a question/answer.` },
{ name: `StackOverflow`, role: `class is the main class that manages the Stack Overflow system. It provides methods for creating user, posting questions, answers, and comments, voting on questions and answers, searching for questions, and retrieving questions by tags and users.` },
{ name: `StackOverflowDemo`, role: `class demonstrates the usage of the Stack Overflow system by creating users, posting questions and answers, voting, searching for questions, and retrieving questions by tags and users.` }
  ],
},

{
  slug: "lld-designing-a-task-management-system",
  title: `Designing a Task Management System`,
  image: "/uml/taskmanagementsystem-class-diagram.png",
  level: "Beginner",
  requirements: [`The task management system should allow users to create, update, and delete tasks.`, `Each task should have a title, description, due date, priority, and status (e.g., pending, in progress, completed).`, `Users should be able to assign tasks to other users and set reminders for tasks.`, `The system should support searching and filtering tasks based on various criteria (e.g., priority, due date, assigned user).`, `Users should be able to mark tasks as completed and view their task history.`, `The system should handle concurrent access to tasks and ensure data consistency.`, `The system should be extensible to accommodate future enhancements and new features.`],
  classes: [
    { name: `User`, role: `class represents a user in the task management system, with properties such as id, name, and email.` },
{ name: `TaskStatus`, role: `enum defines the possible states of a task, such as pending, in progress, and completed.` },
{ name: `Task`, role: `class represents a task in the system, with properties like id, title, description, due date, priority, status, and assigned user.` },
{ name: `TaskManager`, role: `class is the core of the task management system and follows the Singleton pattern to ensure a single instance of the task manager.` },
{ name: `TaskManagementSystem`, role: `class serves as the entry point of the application and demonstrates the usage of the task management system.` }
  ],
},

{
  slug: "lld-designing-a-tic-tac-toe-game",
  title: `Designing a Tic Tac Toe Game`,
  image: "/uml/tictactoe-class-diagram.png",
  level: "Intermediate",
  requirements: [`The Tic-Tac-Toe game should be played on a 3x3 grid.`, `Two players take turns marking their symbols (X or O) on the grid.`, `The first player to get three of their symbols in a row (horizontally, vertically, or diagonally) wins the game.`, `If all the cells on the grid are filled and no player has won, the game ends in a draw.`, `The game should have a user interface to display the grid and allow players to make their moves.`, `The game should handle player turns and validate moves to ensure they are legal.`, `The game should detect and announce the winner or a draw at the end of the game.`],
  classes: [
    { name: `Player`, role: `class represents a player in the game, with a name and a symbol (X or O).` },
{ name: `Board`, role: `class represents the game board, which is a 3x3 grid. It provides methods to make moves, check for a winner, and check if the board is full.` },
{ name: `Game`, role: `class manages the game flow and player interactions. It handles player turns, validates moves, and determines the winner or a draw.` },
{ name: `TicTacToe`, role: `class is the entry point of the application and creates instances of the players and the game.` }
  ],
},

{
  slug: "lld-designing-a-traffic-signal-control-system",
  title: `Designing a Traffic Signal Control System`,
  image: "/uml/trafficcontrolsystem-class-diagram.png",
  level: "Beginner",
  requirements: [`The traffic signal system should control the flow of traffic at an intersection with multiple roads.`, `The system should support different types of signals, such as red, yellow, and green.`, `The duration of each signal should be configurable and adjustable based on traffic conditions.`, `The system should handle the transition between signals smoothly, ensuring safe and efficient traffic flow.`, `The system should be able to detect and handle emergency situations, such as an ambulance or fire truck approaching the intersection.`, `The system should be scalable and extensible to support additional features and functionality.`],
  classes: [
    { name: `Signal`, role: `enum represents the different states of a traffic light: red, yellow, and green.` },
{ name: `Road`, role: `class represents a road in the traffic signal system, with properties such as ID, name, and an associated traffic light.` },
{ name: `TrafficLight`, role: `class represents a traffic light, with properties such as ID, current signal, and durations for each signal state. It provides methods to change the signal and notify observers (e.g., roads) about signal changes.` },
{ name: `TrafficController`, role: `class serves as the central controller for the traffic signal system. It follows the Singleton pattern to ensure a single instance of the controller. It manages the roads and their associated traffic lights, starts the traffic control process, and handles emergency situations.` },
{ name: `TrafficSignalSystemDemo`, role: `class is the main entry point of the application. It demonstrates the usage of the traffic signal system by creating roads, traffic lights, assigning traffic lights to roads, and starting the traffic control process.` }
  ],
},

{
  slug: "lld-designing-a-vending-machine",
  title: `Designing a Vending Machine`,
  image: "/uml/vendingmachine-class-diagram.png",
  level: "Beginner",
  requirements: [`The vending machine should support multiple products with different prices and quantities.`, `The machine should accept coins and notes of different denominations.`, `The machine should dispense the selected product and return change if necessary.`, `The machine should keep track of the available products and their quantities.`, `The machine should handle multiple transactions concurrently and ensure data consistency.`, `The machine should provide an interface for restocking products and collecting money.`, `The machine should handle exceptional scenarios, such as insufficient funds or out-of-stock products.`],
  classes: [
    { name: `Product`, role: `class represents a product in the vending machine, with properties such as name and price.` },
{ name: `Coin`, role: `and **Note** enums represent the different denominations of coins and notes accepted by the vending machine.` },
{ name: `Inventory`, role: `class manages the available products and their quantities in the vending machine. It uses a concurrent hash map to ensure thread safety.` },
{ name: `VendingMachineState`, role: `interface defines the behavior of the vending machine in different states, such as idle, ready, and dispense.` },
{ name: `IdleState**, **ReadyState**, and **DispenseState`, role: `classes implement the VendingMachineState interface and define the specific behaviors for each state.` },
{ name: `VendingMachine`, role: `class is the main class that represents the vending machine. It follows the Singleton pattern to ensure only one instance of the vending machine exists.` },
{ name: `VendingMachineDemo`, role: `class demonstrates the usage of the vending machine by adding products to the inventory, selecting products, inserting coins and notes, dispensing products, and returning change.` }
  ],
},

{
  slug: "lld-design-a-file-directory",
  title: `Design a file directory`,
  image: "/uml/filedirectory-class-diagram.png",
  level: "Intermediate",
  requirements: [`See the class diagram for the object model.`],
  classes: [

  ],
},

{
  slug: "lld-design-an-online-learning-platform",
  title: `Design an online learning platform`,
  image: "/uml/onlinelearningplatform-class-diagram.png",
  level: "Intermediate",
  requirements: [`See the class diagram for the object model.`],
  classes: [

  ],
},

{
  slug: "lld-design-a-voting-system",
  title: `Design a voting system`,
  image: "/uml/votingsystem-class-diagram.png",
  level: "Intermediate",
  requirements: [`See the class diagram for the object model.`],
  classes: [

  ],
},
];

export const umlBySlug: Record<string, string> = {
  "lld-designing-an-airline-management-system": "/uml/airlinemanagementsystem-class-diagram.png",
  "lld-designing-an-atm-system": "/uml/atm-class-diagram.png",
  "lld-designing-a-car-rental-system": "/uml/carrentalsystem-class-diagram.png",
  "lld-designing-a-chess-game": "/uml/chessgame-class-diagram.png",
  "lld-designing-a-coffee-vending-machine": "/uml/coffeevendingmachine-class-diagram.png",
  "lld-designing-a-concert-ticket-booking-system": "/uml/concertticketbookingsystem-class-diagram.png",
  "lld-designing-a-university-course-registration-system": "/uml/courseregistrationsystem-class-diagram.png",
  "lld-designing-a-cricket-information-system-like-cricinfo": "/uml/cricinfo-class-diagram.png",
  "lld-designing-a-digital-wallet-service": "/uml/digitalwalletservice-class-diagram.png",
  "lld-designing-an-elevator-system": "/uml/elevatorsystem-class-diagram.png",
  "lld-designing-an-online-food-delivery-service-like-swiggy": "/uml/fooddeliveryservice-class-diagram.png",
  "lld-designing-a-hotel-management-system": "/uml/hotelmanagementsystem-class-diagram.png",
  "lld-designing-a-library-management-system": "/uml/librarymanagementsystem-class-diagram.png",
  "lld-designing-a-professional-networking-platform-like-linkedin": "/uml/linkedin-class-diagram.png",
  "lld-designing-a-logging-framework": "/uml/loggingframework-class-diagram.png",
  "lld-designing-a-lru-cache": "/uml/lrucache-class-diagram.png",
  "lld-designing-a-movie-ticket-booking-system-like-bookmyshow": "/uml/movieticketbookingsystem-class-diagram.png",
  "lld-designing-an-online-music-streaming-service-like-spotify": "/uml/musicstreamingservice-class-diagram.png",
  "lld-designing-an-online-auction-system": "/uml/onlineauctionsystem-class-diagram.png",
  "lld-designing-an-online-shopping-system-like-amazon": "/uml/onlineshoppingservice-class-diagram.png",
  "lld-designing-an-online-stock-brokerage-system": "/uml/onlinestockbrokeragesystem-class-diagram.png",
  "lld-designing-a-parking-lot-system": "/uml/parkinglot-class-diagram.png",
  "lld-designing-a-pub-sub-system-in-java": "/uml/pubsubsystem-class-diagram.png",
  "lld-designing-restaurant-management-system": "/uml/restaurantmanagementsystem-class-diagram.png",
  "lld-designing-a-ride-sharing-service-like-uber": "/uml/ridesharingservice-class-diagram.png",
  "lld-designing-snake-and-ladder-game": "/uml/snakeandladdergame-class-diagram.png",
  "lld-designing-a-social-network-like-facebook": "/uml/socialnetworkingservice-class-diagram.png",
  "lld-designing-splitwise": "/uml/splitwise-class-diagram.png",
  "lld-designing-stack-overflow": "/uml/stackoverflow-class-diagram.png",
  "lld-designing-a-task-management-system": "/uml/taskmanagementsystem-class-diagram.png",
  "lld-designing-a-tic-tac-toe-game": "/uml/tictactoe-class-diagram.png",
  "lld-designing-a-traffic-signal-control-system": "/uml/trafficcontrolsystem-class-diagram.png",
  "lld-designing-a-vending-machine": "/uml/vendingmachine-class-diagram.png",
  "lld-design-a-file-directory": "/uml/filedirectory-class-diagram.png",
  "lld-design-an-online-learning-platform": "/uml/onlinelearningplatform-class-diagram.png",
  "lld-design-a-voting-system": "/uml/votingsystem-class-diagram.png",
  "design-tic-tac-toe": "/uml/tictactoe-class-diagram.png",
  "design-snake-and-ladder": "/uml/snakeandladdergame-class-diagram.png",
  "design-a-vending-machine": "/uml/vendingmachine-class-diagram.png",
  "design-a-parking-garage": "/uml/parkinglot-class-diagram.png",
  "design-a-digital-wallet": "/uml/digitalwalletservice-class-diagram.png",
  "design-chess": "/uml/chessgame-class-diagram.png",
};
