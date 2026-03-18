"use client";

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Heart,
  Search,
  PlusCircle,
  User,
  MapPin,
  Maximize2,
  Bed,
  Phone,
  Home as HomeIcon,
  Facebook,
  Instagram,
  Linkedin
} from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [ward, setWard] = useState("Tất cả");
  const [street, setStreet] = useState("Tất cả");
  const [bedrooms, setBedrooms] = useState("Tất cả");
  const [priceRange, setPriceRange] = useState("Tất cả");
  const [propertyType, setPropertyType] = useState("Tất cả");
  const [selectedProperty, setSelectedProperty] = useState<any>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const properties = [
    {
      id: 1,
      title: "Căn hộ Horizon View biển",
      slug: "can-ho-horizon-view-bien",
      price: 12500000,
      ward: "Phường Quy Nhơn Nam",
      street: "Nguyễn Huệ",
      area: 65,
      bedrooms: 2,
      type: "Căn hộ",
      total_rooms: 5,
      available_rooms: 2,
      image_url: "https://lh3.googleusercontent.com/aida-public/AB6AXuC2Qmb90E4ge4JGQVpjH2dr54sV73z0-KBSZmCkGKzgc6nc4WO4SiUvn9hBQYpn98oZx2RXWnHCkpJ1R3-tYbUdp0QYPhdbMLSOvVfIkFNsUhfN8A7ksyoZMVm0NErDCv6FJeTleTXP_1_FPYWcs2S0oKXuWgemM4XTUUCI4nHF8BdakJu6kni7jXAbo4cTESlwBIIOx5X-Lg6ywTMcVjOYG878HAoqAf7P7n-jv2-jEGO3iUX5ZiGVBC9vQKR8LUpMpt5pKlsHvIaS"
    },
    {
      id: 2,
      title: "Villa Coastal Breeze sang trọng",
      slug: "villa-coastal-breeze-sang-trong",
      price: 45000000,
      ward: "Phường Quy Nhơn Đông",
      street: "Trần Hưng Đạo",
      area: 240,
      bedrooms: 4,
      type: "Căn hộ",
      total_rooms: 1,
      available_rooms: 1,
      image_url: "https://lh3.googleusercontent.com/aida-public/AB6AXuC2Qmb90E4ge4JGQVpjH2dr54sV73z0-KBSZmCkGKzgc6nc4WO4SiUvn9hBQYpn98oZx2RXWnHCkpJ1R3-tYbUdp0QYPhdbMLSOvVfIkFNsUhfN8A7ksyoZMVm0NErDCv6FJeTleTXP_1_FPYWcs2S0oKXuWgemM4XTUUCI4nHF8BdakJu6kni7jXAbo4cTESlwBIIOx5X-Lg6ywTMcVjOYG878HAoqAf7P7n-jv2-jEGO3iUX5ZiGVBC9vQKR8LUpMpt5pKlsHvIaS"
    },
    {
      id: 3,
      title: "Studio phong cách tối giản",
      slug: "studio-phong-cach-toi-gian",
      price: 6800000,
      ward: "Phường Quy Nhơn Nam",
      street: "Ngô Mây",
      area: 35,
      bedrooms: 1,
      type: "Phòng trọ",
      total_rooms: 10,
      available_rooms: 4,
      image_url: "https://lh3.googleusercontent.com/aida-public/AB6AXuC2Qmb90E4ge4JGQVpjH2dr54sV73z0-KBSZmCkGKzgc6nc4WO4SiUvn9hBQYpn98oZx2RXWnHCkpJ1R3-tYbUdp0QYPhdbMLSOvVfIkFNsUhfN8A7ksyoZMVm0NErDCv6FJeTleTXP_1_FPYWcs2S0oKXuWgemM4XTUUCI4nHF8BdakJu6kni7jXAbo4cTESlwBIIOx5X-Lg6ywTMcVjOYG878HAoqAf7P7n-jv2-jEGO3iUX5ZiGVBC9vQKR8LUpMpt5pKlsHvIaS"
    },
    {
      id: 4,
      title: "Nhà phố Heritage Ghềnh Ráng",
      slug: "nha-pho-heritage-ghenh-rang",
      price: 18200000,
      ward: "Phường Quy Nhơn Nam",
      street: "Tây Sơn",
      area: 110,
      bedrooms: 3,
      type: "Nhà phố",
      image_url: "https://lh3.googleusercontent.com/aida-public/AB6AXuC2Qmb90E4ge4JGQVpjH2dr54sV73z0-KBSZmCkGKzgc6nc4WO4SiUvn9hBQYpn98oZx2RXWnHCkpJ1R3-tYbUdp0QYPhdbMLSOvVfIkFNsUhfN8A7ksyoZMVm0NErDCv6FJeTleTXP_1_FPYWcs2S0oKXuWgemM4XTUUCI4nHF8BdakJu6kni7jXAbo4cTESlwBIIOx5X-Lg6ywTMcVjOYG878HAoqAf7P7n-jv2-jEGO3iUX5ZiGVBC9vQKR8LUpMpt5pKlsHvIaS"
    },
    {
      id: 5,
      title: "Skyline Compact Living",
      slug: "skyline-compact-living",
      price: 9000000,
      ward: "Phường Quy Nhơn Bắc",
      street: "Lê Lợi",
      area: 48,
      bedrooms: 1,
      type: "Phòng trọ",
      image_url: "https://lh3.googleusercontent.com/aida-public/AB6AXuC2Qmb90E4ge4JGQVpjH2dr54sV73z0-KBSZmCkGKzgc6nc4WO4SiUvn9hBQYpn98oZx2RXWnHCkpJ1R3-tYbUdp0QYPhdbMLSOvVfIkFNsUhfN8A7ksyoZMVm0NErDCv6FJeTleTXP_1_FPYWcs2S0oKXuWgemM4XTUUCI4nHF8BdakJu6kni7jXAbo4cTESlwBIIOx5X-Lg6ywTMcVjOYG878HAoqAf7P7n-jv2-jEGO3iUX5ZiGVBC9vQKR8LUpMpt5pKlsHvIaS"
    },
    {
      id: 6,
      title: "Căn hộ Oceanfront đẳng cấp",
      slug: "can-ho-oceanfront-dang-cap",
      price: 85000000,
      ward: "Phường Quy Nhơn Đông",
      street: "Nguyễn Thái Học",
      area: 450,
      bedrooms: 6,
      type: "Chung cư",
      image_url: "https://lh3.googleusercontent.com/aida-public/AB6AXuC2Qmb90E4ge4JGQVpjH2dr54sV73z0-KBSZmCkGKzgc6nc4WO4SiUvn9hBQYpn98oZx2RXWnHCkpJ1R3-tYbUdp0QYPhdbMLSOvVfIkFNsUhfN8A7ksyoZMVm0NErDCv6FJeTleTXP_1_FPYWcs2S0oKXuWgemM4XTUUCI4nHF8BdakJu6kni7jXAbo4cTESlwBIIOx5X-Lg6ywTMcVjOYG878HAoqAf7P7n-jv2-jEGO3iUX5ZiGVBC9vQKR8LUpMpt5pKlsHvIaS"
    },
    {
      id: 7,
      title: "Nhà phố Modern Family",
      slug: "nha-pho-modern-family",
      price: 22000000,
      ward: "Phường Quy Nhơn Đông",
      street: "Trần Hưng Đạo",
      area: 155,
      bedrooms: 3,
      type: "Nhà phố",
      image_url: "https://lh3.googleusercontent.com/aida-public/AB6AXuC2Qmb90E4ge4JGQVpjH2dr54sV73z0-KBSZmCkGKzgc6nc4WO4SiUvn9hBQYpn98oZx2RXWnHCkpJ1R3-tYbUdp0QYPhdbMLSOvVfIkFNsUhfN8A7ksyoZMVm0NErDCv6FJeTleTXP_1_FPYWcs2S0oKXuWgemM4XTUUCI4nHF8BdakJu6kni7jXAbo4cTESlwBIIOx5X-Lg6ywTMcVjOYG878HAoqAf7P7n-jv2-jEGO3iUX5ZiGVBC9vQKR8LUpMpt5pKlsHvIaS"
    },
    {
      id: 8,
      title: "Penthouse sân thượng view biển",
      slug: "penthouse-san-thuong-view-bien",
      price: 15750000,
      ward: "Phường Quy Nhơn Nam",
      street: "Nguyễn Huệ",
      area: 82,
      bedrooms: 2,
      bathrooms: 1,
      type: "Chung cư",
      description: "Penthouse đẳng cấp với sân thượng riêng biệt, view toàn cảnh biển Quy Nhơn. Đầy đủ nội thất cao cấp, không gian thoáng đãng.",
      image_url: "https://lh3.googleusercontent.com/aida-public/AB6AXuC2Qmb90E4ge4JGQVpjH2dr54sV73z0-KBSZmCkGKzgc6nc4WO4SiUvn9hBQYpn98oZx2RXWnHCkpJ1R3-tYbUdp0QYPhdbMLSOvVfIkFNsUhfN8A7ksyoZMVm0NErDCv6FJeTleTXP_1_FPYWcs2S0oKXuWgemM4XTUUCI4nHF8BdakJu6kni7jXAbo4cTESlwBIIOx5X-Lg6ywTMcVjOYG878HAoqAf7P7n-jv2-jEGO3iUX5ZiGVBC9vQKR8LUpMpt5pKlsHvIaS",
      images: [
        "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80",
        "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80",
        "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&q=80",
        "https://images.unsplash.com/photo-1560448204-603b3fc33ddc?w=800&q=80"
      ],
      video_url: "https://vjs.zencdn.net/v/oceans.mp4"
    },
    {
      id: 9,
      title: "Phòng trọ cao cấp trung tâm Quy Nhơn - Full nội thất",
      price: 3500000,
      ward: "Ngô Mây",
      street: "Ngô Mây",
      image_url: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80",
      area: 25,
      bedrooms: 1,
      bathrooms: 1,
      type: "Phòng trọ",
      description: "Phòng mới xây cực kỳ sạch sẽ, có điều hòa, giường tủ, máy giặt riêng. An ninh tốt, giờ giấc tự do, ngay gần Đại học Quy Nhơn.",
      images: [
        "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80",
        "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80",
        "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&q=80",
        "https://images.unsplash.com/photo-1560448204-603b3fc33ddc?w=800&q=80"
      ],
      video_url: "https://vjs.zencdn.net/v/oceans.mp4"
    },
    {
      id: 10,
      title: "Căn hộ mini thoáng mát gác lửng - Gần biển",
      price: 2800000,
      ward: "Nguyễn Văn Cừ",
      street: "An Dương Vương",
      image_url: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80",
      area: 20,
      bedrooms: 1,
      bathrooms: 1,
      type: "Căn hộ",
      description: "Thiết kế hiện đại với gác lửng thông minh, ánh sáng tự nhiên đầy đủ. Chỉ cách bãi biển Quy Nhơn 2 phút đi bộ.",
      images: [
        "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80",
        "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80",
        "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&q=80",
        "https://images.unsplash.com/photo-1560448204-603b3fc33ddc?w=800&q=80"
      ],
      video_url: "https://vjs.zencdn.net/v/oceans.mp4"
    },
    {
      id: 11,
      title: "Phòng trọ giá rẻ cho sinh viên",
      price: 1500000,
      ward: "Ghềnh Ráng",
      street: "Hàn Mặc Tử",
      image_url: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&q=80",
      area: 15,
      bedrooms: 1,
      bathrooms: 1,
      type: "Phòng trọ",
      description: "Phòng yên tĩnh, chủ nhà thân thiện, phù hợp cho sinh viên muốn tiết kiệm chi phí. Gần khu du lịch Ghềnh Ráng.",
      images: [
        "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&q=80",
        "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80",
        "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80",
        "https://images.unsplash.com/photo-1560448204-603b3fc33ddc?w=800&q=80"
      ],
      video_url: "https://vjs.zencdn.net/v/oceans.mp4"
    },
    {
      id: 12,
      title: "Chỗ ở hiện đại đầy đủ tiện ích",
      price: 4200000,
      ward: "Lê Lợi",
      street: "Phan Bội Châu",
      image_url: "https://images.unsplash.com/photo-1560448204-603b3fc33ddc?w=800&q=80",
      area: 30,
      bedrooms: 1,
      bathrooms: 1,
      type: "Căn hộ",
      description: "Căn hộ cao cấp tại trung tâm thành phố, trang bị máy chiếu, bồn tắm nằm. Không gian sống đẳng cấp cho người đi làm.",
      images: [
        "https://images.unsplash.com/photo-1560448204-603b3fc33ddc?w=800&q=80",
        "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80",
        "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80"
      ],
      video_url: "https://vjs.zencdn.net/v/oceans.mp4"
    }
  ];

  // Bổ sung bathrooms, description, video_url và images cho các item khác nếu cần
  properties.forEach(p => {
    if (!p.bedrooms) p.bedrooms = 1;
    if (!p.bathrooms) p.bathrooms = 1;
    if (!p.type) p.type = "Phòng trọ";
    if (!p.total_rooms) p.total_rooms = 1;
    if (!p.available_rooms) p.available_rooms = p.total_rooms;
    if (!p.description) p.description = "Phòng trọ/Căn hộ sạch sẽ, thoáng mát, khu vực an ninh tốt. Gần trường học, chợ và các tiện ích công cộng. Thích hợp cho sinh viên hoặc gia đình nhỏ.";
    if (!p.video_url) p.video_url = "https://www.w3schools.com/html/mov_bbb.mp4";
    if (!p.images || p.images.length === 0) p.images = [p.image_url]; // Fallback về ảnh chính nếu không có gallery
  });

  const filteredProperties = useMemo(() => {
    return properties.filter(item => {
      // Filter by Search Query (Title, Ward or Street)
      const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.ward.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.street.toLowerCase().includes(searchQuery.toLowerCase());

      // Filter by Ward
      const matchesWard = ward === "Tất cả" || item.ward === ward;

      // Filter by Street
      const matchesStreet = street === "Tất cả" || item.street === street;

      // Filter by Bedrooms
      const matchesBedrooms = bedrooms === "Tất cả" || item.bedrooms.toString() === bedrooms;

      // Filter by Property Type
      const matchesType = propertyType === "Tất cả" || item.type === propertyType;

      // Filter by Price Range
      let matchesPrice = true;
      if (priceRange === "Dưới 1.000.000") {
        matchesPrice = item.price < 1000000;
      } else if (priceRange === "Từ 1.000.000 đến 3.000.000") {
        matchesPrice = item.price >= 1000000 && item.price <= 3000000;
      } else if (priceRange === "Từ 3.000.000 đến 5.000.000") {
        matchesPrice = item.price >= 3000000 && item.price <= 5000000;
      } else if (priceRange === "Từ 5.000.000 đến 10.000.000") {
        matchesPrice = item.price >= 5000000 && item.price <= 10000000;
      } else if (priceRange === "Trên 10.000.000") {
        matchesPrice = item.price > 10000000;
      }

      return matchesSearch && matchesWard && matchesStreet && matchesBedrooms && matchesType && matchesPrice;
    });
  }, [searchQuery, ward, street, bedrooms, propertyType, priceRange]);

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/10">
      {/* Sticky Header */}
      <header className="glass-header border-b border-border/40 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <MapPin className="text-primary w-6 h-6 group-hover:scale-110 transition-transform" />
              <h1 className="text-xl font-bold tracking-tight text-primary">PhongTroQuyNhon</h1>
            </Link>

            {/* Action Buttons */}
            <div className="flex items-center gap-3">
              <Link href="/register">
                <Button
                  variant="outline"
                  className="hidden md:flex items-center gap-2 border-primary/20 text-primary font-semibold hover:bg-primary/5 transition-all duration-300"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>Đăng phòng</span>
                </Button>
              </Link>
              <Link href="/login">
                <Button className="rounded-full bg-primary hover:bg-primary/90 text-white px-6 font-bold transition-all active:scale-95 shadow-lg shadow-primary/20">
                  Đăng nhập
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Filter Bar */}
      <section className="bg-white dark:bg-slate-900 border-b border-border/40  top-16 z-40 py-4 shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-3 items-center">
            {/* Search Input */}
            <div className="relative w-full lg:w-[400px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Tìm khu vực, tên phòng..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-11 bg-slate-50 border-border/60 focus-visible:ring-primary/20"
              />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-2 w-full lg:flex-1">
              <Select value={ward} onValueChange={(val) => setWard(val || "Tất cả")}>
                <SelectTrigger className="h-11 bg-slate-50 border-border/60">
                  <SelectValue placeholder="Khu vực" />
                </SelectTrigger>
                <SelectContent className="w-[200px]">
                  <SelectItem value="Tất cả">Tất cả</SelectItem>
                  <SelectItem value="Phường Quy Nhơn">Phường Quy Nhơn</SelectItem>
                  <SelectItem value="Phường Quy Nhơn Nam">Phường Quy Nhơn Nam</SelectItem>
                  <SelectItem value="Phường Quy Nhơn Bắc">Phường Quy Nhơn Bắc</SelectItem>
                  <SelectItem value="Phường Quy Nhơn Đông">Phường Quy Nhơn Đông</SelectItem>
                  <SelectItem value="Phường Quy Nhơn Tây">Phường Quy Nhơn Tây</SelectItem>
                  <SelectItem value="Xã Nhơn Châu">Xã Nhơn Châu</SelectItem>
                </SelectContent>
              </Select>

              <Select value={street} onValueChange={(val) => setStreet(val || "Tất cả")}>
                <SelectTrigger className="h-11 bg-slate-50 border-border/60">
                  <SelectValue placeholder="Đường" />
                </SelectTrigger>
                <SelectContent className="w-[200px]">
                  <SelectItem value="Tất cả">Đường</SelectItem>
                  <SelectItem value="Tây Sơn">Tây Sơn</SelectItem>
                  <SelectItem value="Nguyễn Huệ">Nguyễn Huệ</SelectItem>
                  <SelectItem value="Lê Lợi">Lê Lợi</SelectItem>
                  <SelectItem value="Ngô Mây">Ngô Mây</SelectItem>
                  <SelectItem value="Nguyễn Thái Học">Nguyễn Thái Học</SelectItem>
                  <SelectItem value="Trần Hưng Đạo">Trần Hưng Đạo</SelectItem>
                </SelectContent>
              </Select>

              <Select value={bedrooms} onValueChange={(val) => setBedrooms(val || "Tất cả")}>
                <SelectTrigger className="h-11 bg-slate-50 border-border/60">
                  <SelectValue placeholder="Số phòng ngủ" />
                </SelectTrigger>
                <SelectContent className="w-[200px]">
                  <SelectItem value="Tất cả">Số phòng ngủ</SelectItem>
                  <SelectItem value="1">1</SelectItem>
                  <SelectItem value="2">2</SelectItem>
                  <SelectItem value="3">3</SelectItem>
                  <SelectItem value="4">4</SelectItem>
                  <SelectItem value="6">6</SelectItem>
                </SelectContent>
              </Select>

              <Select value={priceRange} onValueChange={(val) => setPriceRange(val || "Tất cả")}>
                <SelectTrigger className="h-11 bg-slate-50 border-border/60">
                  <SelectValue placeholder="Mức giá" />
                </SelectTrigger>
                <SelectContent className="w-[200px]">
                  <SelectItem value="Tất cả">Mọi mức giá</SelectItem>
                  <SelectItem value="Dưới 1.000.000">Dưới 1.000.000</SelectItem>
                  <SelectItem value="Từ 1.000.000 đến 3.000.000">Từ 1.000.000 đến 3.000.000</SelectItem>
                  <SelectItem value="Từ 3.000.000 đến 5.000.000">Từ 3.000.000 đến 5.000.000</SelectItem>
                  <SelectItem value="Từ 5.000.000 đến 10.000.000">Từ 5.000.000 đến 10.000.000</SelectItem>
                  <SelectItem value="Trên 10.000.000">Trên 10.000.000</SelectItem>
                </SelectContent>
              </Select>

              <Select value={propertyType} onValueChange={(val) => setPropertyType(val || "Tất cả")}>
                <SelectTrigger className="h-11 bg-slate-50 border-border/60">
                  <SelectValue placeholder="Loại chỗ ở" />
                </SelectTrigger>
                <SelectContent className="w-[200px]">
                  <SelectItem value="Tất cả">Loại chỗ ở</SelectItem>
                  <SelectItem value="Phòng trọ">Phòng trọ</SelectItem>
                  <SelectItem value="Chung cư">Chung cư</SelectItem>
                  <SelectItem value="Căn hộ">Căn hộ</SelectItem>
                  <SelectItem value="Nhà phố">Nhà phố</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      {/* Content Area: Property Grid */}
      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {filteredProperties.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {filteredProperties.map((item) => (
              <Card
                key={item.id}
                className="group overflow-hidden border-none shadow-none bg-transparent cursor-pointer transition-all duration-300"
                onClick={() => setSelectedProperty(item)}
              >
                <CardContent className="p-0">
                  {/* Image Container */}
                  <div className="relative aspect-[1/1] overflow-hidden rounded-xl bg-slate-100">
                    <img
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      alt={item.title}
                      src={item.image_url}
                    />

                  </div>

                  {/* Content */}
                  <div className="pt-4 pb-2 space-y-1.5">
                    <div className="flex justify-between items-center">
                      <p className="text-lg font-bold text-primary">
                        {item.price.toLocaleString('vi-VN')} <span className="text-[10px] font-normal text-muted-foreground uppercase tracking-tight">VND/tháng</span>
                      </p>
                      <Badge variant="secondary" className="font-semibold text-[10px] uppercase tracking-wide bg-primary/5 text-primary border-none">
                        {item.ward}
                      </Badge>
                    </div>
                    <h3 className="font-medium text-slate-800 dark:text-slate-100 line-clamp-1 group-hover:text-primary transition-colors">
                      {item.title}
                    </h3>
                    <div className="flex items-center gap-4 text-muted-foreground text-xs font-medium">
                      <div className="flex items-center gap-1.5">
                        <Maximize2 className="w-3.5 h-3.5" />
                        <span>{item.area} m²</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Bed className="w-3.5 h-3.5" />
                        <span>{item.bedrooms} PN</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-primary/80">
                        <HomeIcon className="w-3.5 h-3.5" />
                        <span>{item.available_rooms}/{item.total_rooms} phòng</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="py-20 text-center">
            <h3 className="text-lg font-medium text-muted-foreground">Không tìm thấy phòng phù hợp với tiêu chí của bạn.</h3>
            <Button
              variant="link"
              onClick={() => {
                setSearchQuery("");
                setWard("Tất cả");
                setBedrooms("Tất cả");
                setPriceRange("Tất cả");
              }}
              className="mt-2 text-primary"
            >
              Xóa tất cả bộ lọc
            </Button>
          </div>
        )}

        {/* Minimalist Pagination */}
        <div className="mt-16 flex justify-center">
          <Pagination>
            <PaginationContent className="gap-2">
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  className="rounded-full hover:bg-primary/5 hover:text-primary transition-colors border-none"
                />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink
                  href="#"
                  isActive
                  className="rounded-full w-10 h-10 flex items-center justify-center bg-primary text-white hover:bg-primary/90 transition-all border-none"
                >
                  1
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink
                  href="#"
                  className="rounded-full w-10 h-10 flex items-center justify-center hover:bg-primary/5 hover:text-primary transition-colors border-none"
                >
                  2
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink
                  href="#"
                  className="rounded-full w-10 h-10 flex items-center justify-center hover:bg-primary/5 hover:text-primary transition-colors border-none"
                >
                  3
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationNext
                  href="#"
                  className="rounded-full hover:bg-primary/5 hover:text-primary transition-colors border-none"
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </main>

      {/* Ultra-minimalist Footer */}
      <footer className="border-t border-border/40 py-8 mt-12 mb-4">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-xs font-semibold text-deep-charcoal opacity-70 dark:text-slate-400">
            <div>© 2026 Phong Tro Quy Nhon. All rights reserved.</div>

            <div className="flex items-center gap-8">
              <div className="flex items-center gap-5">
                <a href="#" className="hover:text-primary transition-colors"><Facebook className="w-4 h-4" /></a>
                <a href="#" className="hover:text-primary transition-colors"><Instagram className="w-4 h-4" /></a>
                <a href="#" className="hover:text-primary transition-colors"><Linkedin className="w-4 h-4" /></a>
              </div>

            </div>
          </div>
        </div>
      </footer>

      {/* Property Detail Modal */}
      <Dialog
        open={!!selectedProperty}
        onOpenChange={() => {
          setSelectedProperty(null);
          setActiveImageIndex(0); // Reset index khi đóng modal
        }}
      >
        <DialogContent className="sm:max-w-[1000px] lg:max-w-[1100px] w-[95vw] max-h-[95vh] overflow-y-auto no-scrollbar p-0 border-none bg-white rounded-3xl shadow-2xl">
          {selectedProperty && (
            <div className="flex flex-col">
              {/* Top Row: Media Side-by-Side (Video & Selected Main Image) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-0 bg-slate-950 border-b border-slate-100 overflow-hidden rounded-t-3xl">
                {/* Video Column */}
                <div className="relative aspect-video bg-black flex items-center justify-center border-r border-white/5">
                  <video
                    src={selectedProperty.video_url}
                    controls
                    autoPlay
                    muted
                    loop
                    className="w-full h-full object-contain"
                  />
                  <Badge className="absolute top-4 left-4 bg-primary text-white font-bold px-3 py-1 text-[10px] uppercase tracking-wider shadow-lg border-none">
                    TRỰC TIẾP
                  </Badge>
                </div>

                {/* Main Interactive Image Column */}
                <div className="relative aspect-video bg-slate-800 flex items-center justify-center overflow-hidden">
                  <img
                    src={selectedProperty.images?.[activeImageIndex] || selectedProperty.image_url}
                    alt={selectedProperty.title}
                    className="w-full h-full object-cover transition-opacity duration-500"
                    key={activeImageIndex} // Key để kích hoạt animation khi đổi ảnh
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
                  <Badge className="absolute top-4 right-4 bg-white/20 backdrop-blur-md text-white border-none font-bold px-3 py-1 text-[10px] uppercase tracking-wider">
                    HÌNH ẢNH {(activeImageIndex + 1)}/{selectedProperty.images?.length || 1}
                  </Badge>
                </div>
              </div>

              {/* Thumbnails Row - Ngang dưới Video/Image */}
              {selectedProperty.images && selectedProperty.images.length > 0 && (
                <div className="bg-slate-900 overflow-hidden px-4 md:px-6 py-4 flex gap-3 overflow-x-auto scroll-smooth">
                  {selectedProperty.images.map((img: string, idx: number) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`relative h-16 md:h-20 aspect-[4/3] rounded-xl overflow-hidden shrink-0 transition-all duration-300 border-2 ${activeImageIndex === idx
                          ? "border-primary scale-105 shadow-xl shadow-primary/30 opacity-100"
                          : "border-transparent opacity-40 hover:opacity-100"
                        }`}
                    >
                      <img src={img} className="w-full h-full object-cover" />
                      {activeImageIndex === idx && (
                        <div className="absolute inset-x-0 bottom-0 h-1 bg-primary" />
                      )}
                    </button>
                  ))}
                </div>
              )}

              {/* Bottom Section: Information */}
              <div className="p-6 md:p-10 space-y-8">
                {/* Title & Price Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-100 pb-8">
                  <div className="space-y-4 max-w-2xl">
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="bg-primary/10 text-primary border-none font-bold px-3 py-1">
                        {selectedProperty.ward}
                      </Badge>
                      <Badge variant="outline" className="text-slate-400 border-slate-200 font-medium px-3 py-1">
                        {selectedProperty.street}
                      </Badge>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-black text-slate-900 leading-tight">
                      {selectedProperty.title}
                    </h2>
                    <div className="flex items-start gap-2 text-slate-500 font-medium text-base">
                      <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <span>{selectedProperty.street}, {selectedProperty.ward}, TP. Quy Nhơn, Bình Định</span>
                    </div>
                  </div>

                  <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 text-center md:text-right min-w-[240px]">
                    <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-1">Giá thuê hàng tháng</p>
                    <p className="text-3xl font-black text-primary">
                      {selectedProperty.price.toLocaleString('vi-VN')}
                      <span className="text-lg font-normal text-slate-500 ml-1">đ/tháng</span>
                    </p>
                  </div>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                  {/* Left Side: Specs & Description (2/3) */}
                  <div className="lg:col-span-2 space-y-10">
                    {/* Specs List */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-8 bg-slate-50/50 rounded-3xl border border-slate-100">
                      <div className="flex flex-col items-center gap-2 border-r border-slate-200">
                        <Maximize2 className="w-8 h-8 text-primary" />
                        <span className="text-xl font-black text-slate-900">{selectedProperty.area} m²</span>
                        <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Diện tích</span>
                      </div>
                      <div className="flex flex-col items-center gap-2 border-r border-slate-200">
                        <Bed className="w-8 h-8 text-primary" />
                        <span className="text-xl font-black text-slate-900">{selectedProperty.bedrooms} PN</span>
                        <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Phòng ngủ</span>
                      </div>
                      <div className="flex flex-col items-center gap-2 md:border-r md:border-slate-200">
                        <User className="w-8 h-8 text-primary" />
                        <span className="text-xl font-black text-slate-900">{selectedProperty.bathrooms} WC</span>
                        <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Phòng tắm</span>
                      </div>
                      <div className="flex flex-col items-center gap-2">
                        <HomeIcon className="w-8 h-8 text-orange-500" />
                        <span className="text-xl font-black text-slate-900">{selectedProperty.available_rooms}/{selectedProperty.total_rooms}</span>
                        <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Còn trống</span>
                      </div>
                    </div>

                    {/* Description Paragraph */}
                    <div className="space-y-4">
                      <h4 className="text-xl font-black text-slate-800 flex items-center gap-3">
                        <PlusCircle className="w-6 h-6 text-primary" />
                        Mô tả chi tiết phòng
                      </h4>
                      <p className="text-slate-600 leading-relaxed text-lg bg-slate-50/30 p-6 rounded-2xl border border-slate-100/50 italic">
                        "{selectedProperty.description}"
                      </p>
                    </div>
                  </div>

                  {/* Right Side: Quick Contact (1/3) */}
                  <div className="space-y-6">
                    <div className="p-8 bg-slate-900 rounded-3xl text-white shadow-2xl shadow-slate-900/20">
                      <h4 className="text-xl font-bold mb-6 text-primary">Liên hệ thuê phòng</h4>
                      <div className="space-y-6">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center font-bold text-xl">QT</div>
                          <div>
                            <p className="font-bold">Quang Trung</p>
                            <p className="text-xs text-slate-400">Chủ phòng/Quản lý</p>
                          </div>
                        </div>
                        <Button className="w-full h-16 gap-3 text-lg font-black bg-primary hover:bg-primary/90 transition-all active:scale-95 rounded-2xl">
                          <Phone className="w-6 h-6 animate-bounce" />
                          GỌI NGAY
                        </Button>
                        <p className="text-[10px] text-center text-slate-500 uppercase font-medium">Nhấn để xem số điện thoại và gọi</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
