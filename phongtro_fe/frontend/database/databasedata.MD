-- 1. Tạo Database
CREATE DATABASE IF NOT EXISTS quynhon_housing;
USE quynhon_housing;

-- 2. Bảng Danh mục (Categories)
CREATE TABLE categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL 
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 3. Bảng Người dùng/Chủ trọ (Users)
CREATE TABLE users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL, 
    full_name VARCHAR(100) NOT NULL,
    phone VARCHAR(15) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 4. Bảng Phòng trọ (Rooms)
CREATE TABLE rooms (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    description TEXT,
    price BIGINT NOT NULL,              -- Giá tiền (Dùng BIGINT cho tiền VNĐ không lẻ)
    area DOUBLE NOT NULL,               -- Diện tích (m2)
    ward VARCHAR(100) NOT NULL,         -- Phường
    street VARCHAR(100),                -- Đường
    address VARCHAR(255),               -- Địa chỉ cụ thể
    bedrooms INT DEFAULT 1,
    bathrooms INT DEFAULT 1,
    image_url TEXT,                     -- Link ảnh
    video_url TEXT,                     -- Link video
    total_rooms INT DEFAULT 1,          -- Tổng số phòng của dãy/bài đăng
    available_rooms INT DEFAULT 1,      -- Số phòng còn trống
    is_available BOOLEAN DEFAULT TRUE,
    user_id BIGINT,
    category_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 5. Chèn dữ liệu mẫu Categories
INSERT INTO categories (name, slug) VALUES 
('Phòng trọ sinh viên', 'phong-tro-sinh-vien'),
('Căn hộ chung cư', 'can-ho-chung-cu'),
('Nhà nguyên căn', 'nha-nguyen-can'),
('Biệt thự/Villa', 'biet-thu-villa');

-- 6. Chèn dữ liệu mẫu Users (Example owner)
INSERT INTO users (username, password, full_name, phone) VALUES 
('admin', '$2a$10$xyz...', 'Admin Quy Nhon', '0123456789');

-- 7. Chèn dữ liệu 8 phòng thực tế từ Giao diện frontend
INSERT INTO rooms (title, slug, price, ward, street, area, bedrooms, image_url, video_url, total_rooms, available_rooms, user_id, category_id) VALUES 
('Căn hộ Horizon View biển', 'can-ho-horizon-view-bien', 12500000, 'Phường Quy Nhơn Nam', 'Nguyễn Huệ', 65, 2, 'https://lh3.googleusercontent.com/aida-public/AB6AXuC2Qmb90E4ge4JGQVpjH2dr54sV73z0-KBSZmCkGKzgc6nc4WO4SiUvn9hBQYpn98oZx2RXWnHCkpJ1R3-tYbUdp0QYPhdbMLSOvVfIkFNsUhfN8A7ksyoZMVm0NErDCv6FJeTleTXP_1_FPYWcs2S0oKXuWgemM4XTUUCI4nHF8BdakJu6kni7jXAbo4cTESlwBIIOx5X-Lg6ywTMcVjOYG878HAoqAf7P7n-jv2-jEGO3iUX5ZiGVBC9vQKR8LUpMpt5pKlsHvIaS', 'https://www.w3schools.com/html/mov_bbb.mp4', 5, 2, 1, 2),
('Villa Coastal Breeze sang trọng', 'villa-coastal-breeze-sang-trong', 45000000, 'Phường Quy Nhơn Đông', 'Trần Hưng Đạo', 240, 4, 'https://lh3.googleusercontent.com/aida-public/AB6AXuC2Qmb90E4ge4JGQVpjH2dr54sV73z0-KBSZmCkGKzgc6nc4WO4SiUvn9hBQYpn98oZx2RXWnHCkpJ1R3-tYbUdp0QYPhdbMLSOvVfIkFNsUhfN8A7ksyoZMVm0NErDCv6FJeTleTXP_1_FPYWcs2S0oKXuWgemM4XTUUCI4nHF8BdakJu6kni7jXAbo4cTESlwBIIOx5X-Lg6ywTMcVjOYG878HAoqAf7P7n-jv2-jEGO3iUX5ZiGVBC9vQKR8LUpMpt5pKlsHvIaS', 'https://www.w3schools.com/html/mov_bbb.mp4', 1, 1, 1, 4),
('Studio phong cách tối giản', 'studio-phong-cach-toi-gian', 6800000, 'Phường Quy Nhơn Nam', 'Ngô Mây', 35, 1, 'https://lh3.googleusercontent.com/aida-public/AB6AXuC2Qmb90E4ge4JGQVpjH2dr54sV73z0-KBSZmCkGKzgc6nc4WO4SiUvn9hBQYpn98oZx2RXWnHCkpJ1R3-tYbUdp0QYPhdbMLSOvVfIkFNsUhfN8A7ksyoZMVm0NErDCv6FJeTleTXP_1_FPYWcs2S0oKXuWgemM4XTUUCI4nHF8BdakJu6kni7jXAbo4cTESlwBIIOx5X-Lg6ywTMcVjOYG878HAoqAf7P7n-jv2-jEGO3iUX5ZiGVBC9vQKR8LUpMpt5pKlsHvIaS', 'https://www.w3schools.com/html/mov_bbb.mp4', 10, 4, 1, 2),
('Nhà phố Heritage Ghềnh Ráng', 'nha-pho-heritage-ghenh-rang', 18200000, 'Phường Quy Nhơn Nam', 'Tây Sơn', 110, 3, 'https://lh3.googleusercontent.com/aida-public/AB6AXuC2Qmb90E4ge4JGQVpjH2dr54sV73z0-KBSZmCkGKzgc6nc4WO4SiUvn9hBQYpn98oZx2RXWnHCkpJ1R3-tYbUdp0QYPhdbMLSOvVfIkFNsUhfN8A7ksyoZMVm0NErDCv6FJeTleTXP_1_FPYWcs2S0oKXuWgemM4XTUUCI4nHF8BdakJu6kni7jXAbo4cTESlwBIIOx5X-Lg6ywTMcVjOYG878HAoqAf7P7n-jv2-jEGO3iUX5ZiGVBC9vQKR8LUpMpt5pKlsHvIaS', 'https://www.w3schools.com/html/mov_bbb.mp4', 2, 1, 1, 3),
('Skyline Compact Living', 'skyline-compact-living', 9000000, 'Phường Quy Nhơn Bắc', 'Lê Lợi', 48, 1, 'https://lh3.googleusercontent.com/aida-public/AB6AXuC2Qmb90E4ge4JGQVpjH2dr54sV73z0-KBSZmCkGKzgc6nc4WO4SiUvn9hBQYpn98oZx2RXWnHCkpJ1R3-tYbUdp0QYPhdbMLSOvVfIkFNsUhfN8A7ksyoZMVm0NErDCv6FJeTleTXP_1_FPYWcs2S0oKXuWgemM4XTUUCI4nHF8BdakJu6kni7jXAbo4cTESlwBIIOx5X-Lg6ywTMcVjOYG878HAoqAf7P7n-jv2-jEGO3iUX5ZiGVBC9vQKR8LUpMpt5pKlsHvIaS', 'https://www.w3schools.com/html/mov_bbb.mp4', 15, 6, 1, 2),
('Căn hộ Oceanfront đẳng cấp', 'can-ho-oceanfront-dang-cap', 85000000, 'Phường Quy Nhơn Đông', 'Nguyễn Thái Học', 450, 6, 'https://lh3.googleusercontent.com/aida-public/AB6AXuC2Qmb90E4ge4JGQVpjH2dr54sV73z0-KBSZmCkGKzgc6nc4WO4SiUvn9hBQYpn98oZx2RXWnHCkpJ1R3-tYbUdp0QYPhdbMLSOvVfIkFNsUhfN8A7ksyoZMVm0NErDCv6FJeTleTXP_1_FPYWcs2S0oKXuWgemM4XTUUCI4nHF8BdakJu6kni7jXAbo4cTESlwBIIOx5X-Lg6ywTMcVjOYG878HAoqAf7P7n-jv2-jEGO3iUX5ZiGVBC9vQKR8LUpMpt5pKlsHvIaS', 'https://www.w3schools.com/html/mov_bbb.mp4', 1, 0, 1, 2),
('Nhà phố Modern Family', 'nha-pho-modern-family', 22000000, 'Phường Quy Nhơn Đông', 'Trần Hưng Đạo', 155, 3, 'https://lh3.googleusercontent.com/aida-public/AB6AXuC2Qmb90E4ge4JGQVpjH2dr54sV73z0-KBSZmCkGKzgc6nc4WO4SiUvn9hBQYpn98oZx2RXWnHCkpJ1R3-tYbUdp0QYPhdbMLSOvVfIkFNsUhfN8A7ksyoZMVm0NErDCv6FJeTleTXP_1_FPYWcs2S0oKXuWgemM4XTUUCI4nHF8BdakJu6kni7jXAbo4cTESlwBIIOx5X-Lg6ywTMcVjOYG878HAoqAf7P7n-jv2-jEGO3iUX5ZiGVBC9vQKR8LUpMpt5pKlsHvIaS', 'https://www.w3schools.com/html/mov_bbb.mp4', 3, 1, 1, 3),
('Penthouse sân thượng view biển', 'penthouse-san-thuong-view-bien', 15750000, 'Phường Quy Nhơn Nam', 'Nguyễn Huệ', 82, 2, 'https://lh3.googleusercontent.com/aida-public/AB6AXuC2Qmb90E4ge4JGQVpjH2dr54sV73z0-KBSZmCkGKzgc6nc4WO4SiUvn9hBQYpn98oZx2RXWnHCkpJ1R3-tYbUdp0QYPhdbMLSOvVfIkFNsUhfN8A7ksyoZMVm0NErDCv6FJeTleTXP_1_FPYWcs2S0oKXuWgemM4XTUUCI4nHF8BdakJu6kni7jXAbo4cTESlwBIIOx5X-Lg6ywTMcVjOYG878HAoqAf7P7n-jv2-jEGO3iUX5ZiGVBC9vQKR8LUpMpt5pKlsHvIaS', 'https://www.w3schools.com/html/mov_bbb.mp4', 2, 2, 1, 2);