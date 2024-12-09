CREATE TABLE
    User (
        user_id VARCHAR(36) PRIMARY KEY,
        email VARCHAR(100) NOT NULL,
        username VARCHAR(50) NOT NULL,
        password VARCHAR(100) NOT NULL
    );

CREATE TABLE
    Resume (
        resume_id INT AUTO_INCREMENT PRIMARY KEY,
        user_id VARCHAR(36),
        name VARCHAR(50) NOT NULL,
        birthdate DATE,
        education VARCHAR(100),
        residence VARCHAR(100),
        license VARCHAR(100),
        introduction TEXT,
        FOREIGN KEY (user_id) REFERENCES User (user_id)
    );

CREATE TABLE
    Landlord (
        landlord_id INT AUTO_INCREMENT PRIMARY KEY,
        email VARCHAR(100) NOT NULL,
        username VARCHAR(50) NOT NULL,
        password VARCHAR(100) NOT NULL,
        phone VARCHAR(15)
    );

CREATE TABLE
    JobInfo (
        jobInfo_id INT AUTO_INCREMENT PRIMARY KEY,
        landlord_id INT,
        address VARCHAR(150),
        room_type VARCHAR(50),
        dates VARCHAR(100),
        job_description TEXT,
        positions VARCHAR(50),
        people_needed INT,
        FOREIGN KEY (landlord_id) REFERENCES Landlord (landlord_id)
    );

CREATE TABLE
    Application (
        application_id INT AUTO_INCREMENT PRIMARY KEY,
        user_id VARCHAR(36),
        landlord_id INT,
        status VARCHAR(20),
        FOREIGN KEY (user_id) REFERENCES User (user_id),
        FOREIGN KEY (landlord_id) REFERENCES Landlord (landlord_id)
    );

CREATE TABLE
    Wishlist (
        wishlist_id INT AUTO_INCREMENT PRIMARY KEY,
        user_id VARCHAR(36),
        jobInfo_id INT,
        FOREIGN KEY (user_id) REFERENCES User (user_id),
        FOREIGN KEY (jobInfo_id) REFERENCES JobInfo (jobInfo_id)
    );

-- User 假資料
INSERT INTO
    User (user_id, email, username, password)
VALUES
    (
        '550e8400-e29b-41d4-a716-446655440000',
        'alice@example.com',
        'alice',
        'password123'
    ),
    (
        '550e8400-e29b-41d4-a716-446655440001',
        'bob@example.com',
        'bob',
        'securepass'
    ),
    (
        '550e8400-e29b-41d4-a716-446655440002',
        'charlie@example.com',
        'charlie',
        'mypassword'
    );

-- Resume 假資料
INSERT INTO
    Resume (
        resume_id,
        user_id,
        name,
        birthdate,
        education,
        residence,
        license,
        introduction
    )
VALUES
    (
        1,
        '550e8400-e29b-41d4-a716-446655440000',
        'Alice Chen',
        '1990-01-01',
        'B.Sc. Computer Science',
        'Taipei',
        'Driver License',
        'I am a software engineer.'
    ),
    (
        2,
        '550e8400-e29b-41d4-a716-446655440001',
        'Bob Lin',
        '1985-06-15',
        'MBA',
        'Kaohsiung',
        'CPA',
        'I specialize in finance and management.'
    ),
    (
        3,
        '550e8400-e29b-41d4-a716-446655440002',
        'Charlie Wang',
        '1992-11-20',
        'M.A. English',
        'Tainan',
        'TOEFL Instructor',
        'I am passionate about teaching.'
    );

-- Landlord 假資料
INSERT INTO
    Landlord (landlord_id, email, username, password, phone)
VALUES
    (
        1,
        'landlord1@example.com',
        'landlord1',
        'landlordpass1',
        '0912345678'
    ),
    (
        2,
        'landlord2@example.com',
        'landlord2',
        'landlordpass2',
        '0987654321'
    ),
    (
        3,
        'landlord3@example.com',
        'landlord3',
        'landlordpass3',
        '0922333444'
    );

-- JobInfo 假資料
INSERT INTO
    JobInfo (
        jobInfo_id,
        landlord_id,
        address,
        room_type,
        dates,
        job_description,
        positions,
        people_needed
    )
VALUES
    (
        1,
        1,
        'No. 1, Zhongshan Rd, Taipei',
        'Single Room',
        '2024-12-01 to 2024-12-10',
        'House cleaning and gardening',
        'Cleaner',
        2
    ),
    (
        2,
        2,
        'No. 88, Ren’ai Rd, Tainan',
        'Shared Room',
        '2024-12-05 to 2024-12-15',
        'Cooking and childcare',
        'Cook',
        1
    ),
    (
        3,
        3,
        'No. 101, Fuxing Rd, Taichung',
        'Apartment',
        '2024-12-10 to 2024-12-20',
        'Pet sitting and errands',
        'Pet Sitter',
        1
    );

-- Application 假資料
INSERT INTO
    Application (application_id, user_id, landlord_id, status)
VALUES
    (
        1,
        '550e8400-e29b-41d4-a716-446655440000',
        1,
        'Pending'
    ),
    (
        2,
        '550e8400-e29b-41d4-a716-446655440001',
        2,
        'Approved'
    ),
    (
        3,
        '550e8400-e29b-41d4-a716-446655440002',
        3,
        'Rejected'
    );

-- Wishlist 假資料
INSERT INTO
    Wishlist (wishlist_id, user_id, jobInfo_id)
VALUES
    (1, '550e8400-e29b-41d4-a716-446655440000', 2),
    (2, '550e8400-e29b-41d4-a716-446655440001', 1),
    (3, '550e8400-e29b-41d4-a716-446655440002', 3);