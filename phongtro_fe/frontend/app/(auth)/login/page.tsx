"use client";

import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Building2, Mail, Lock, LogIn, Chrome } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen w-full bg-slate-50 dark:bg-slate-950 overflow-hidden">
      {/* Left Side: Visual Experience (60%) */}
      <div className="hidden lg:flex lg:w-[60%] relative overflow-hidden group">
        <div className="absolute inset-0 bg-primary/20 mix-blend-multiply z-10 transition-colors duration-500 group-hover:bg-primary/10" />
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-10000 group-hover:scale-110"
          style={{
            backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCUv-HUjQqN8r2DsFC8jEdDaRZEKmfNGFdUcoQBybhvUrhtqn4qw4tZMtVYNAcEHWYjl7Ypi998XdoVaVEfmsM5qhG67JQptMZVGa8cjbosCThHJKP0jZmlmWHVB0bnbBhyz9lRwUEj5RJpLUk6thZuE3sbBejXm4ij1diwyeBfF3rQJP26WNCl0apI6H-LitzI3T2wFYzEHiF8aPpiVUpJg9n3tdKoM5-yUIHrbEbJD6kTDCQ_DZF2qfhY6adFZj5SO5IzpKvyOQP2')"
          }}
        />

        {/* Branding Overlay */}
        <div className="relative z-20 flex flex-col justify-between h-full p-16 text-white w-full">
          <Link href="/" className="flex items-center gap-3 w-fit group/logo">
            <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-xl flex items-center justify-center border border-white/20 shadow-2xl transition-all group-hover/logo:bg-white/20">
              <Building2 className="w-7 h-7 text-white" />
            </div>
            <span className="text-3xl font-black tracking-tight drop-shadow-lg">  Phong Tro Quy Nhon</span>
          </Link>

          <div className="max-w-xl space-y-6">
            <h1 className="text-7xl font-black leading-tight drop-shadow-2xl">
              Nâng tầm trải nghiệm <span className="text-primary italic">quản lý.</span>
            </h1>
            <p className="text-2xl text-white/90 font-medium leading-relaxed drop-shadow-lg max-w-lg">
              Giải pháp quản lý nhà cho thuê cao cấp, tinh gọn và hiệu quả nhất tại Quy Nhơn.
            </p>
          </div>

          <div className="flex justify-between items-center text-sm font-bold tracking-[0.2em] uppercase opacity-70">
            <span>© 2024 QUY NHON RENTAL MANAGEMENT</span>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute bottom-[-10%] right-[-5%] w-[40%] aspect-square rounded-full bg-primary/20 blur-[120px] pointer-events-none" />
        <div className="absolute top-[-5%] left-[-5%] w-[30%] aspect-square rounded-full bg-white/10 blur-[100px] pointer-events-none" />
      </div>

      {/* Right Side: Login Form (40%) */}
      <div className="w-full lg:w-[40%] flex items-center justify-center p-8 md:p-12 xl:p-20 relative bg-white dark:bg-slate-950">
        <div className="w-full max-w-md space-y-10">
          <div className="space-y-3">
            <div className="lg:hidden flex items-center gap-2 mb-8">
              <Building2 className="w-8 h-8 text-primary" />
              <span className="text-xl font-bold">Quy Nhon Rentals</span>
            </div>
            <h2 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">Đăng nhập Chủ nhà</h2>
            <p className="text-slate-500 dark:text-slate-400 font-medium text-lg">Chào mừng bạn quay trở lại. Hãy nhập thông tin để truy cập hệ thống.</p>
          </div>

          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-2">
              <label
                className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1 uppercase tracking-wider flex items-center gap-2"
                htmlFor="email"
              >
                <Mail className="w-4 h-4 text-primary" />
                Địa chỉ Email
              </label>
              <Input
                className="h-14 px-5 rounded-2xl bg-slate-50 border-slate-200 dark:bg-slate-900 dark:border-slate-800 transition-all focus:ring-4 focus:ring-primary/10 text-lg"
                id="email"
                placeholder="name@example.com"
                type="email"
                required
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between px-1">
                <label
                  className="text-sm font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider flex items-center gap-2"
                  htmlFor="password"
                >
                  <Lock className="w-4 h-4 text-primary" />
                  Mật khẩu
                </label>
                <Link
                  className="text-sm font-bold text-primary hover:text-primary/80 transition-colors"
                  href="#"
                >
                  Quên mật khẩu?
                </Link>
              </div>
              <Input
                className="h-14 px-5 rounded-2xl bg-slate-50 border-slate-200 dark:bg-slate-900 dark:border-slate-800 transition-all focus:ring-4 focus:ring-primary/10 text-lg"
                id="password"
                placeholder="••••••••"
                type="password"
                required
              />
            </div>

            <Button
              className="w-full h-14 rounded-2xl bg-primary hover:bg-primary/90 text-white font-black text-lg gap-3 transition-all active:scale-[0.98] shadow-xl shadow-primary/20"
              type="submit"
            >
              <LogIn className="w-5 h-5" />
              ĐĂNG NHẬP NGAY
            </Button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-slate-200 dark:border-slate-800" />
            </div>
            <div className="relative flex justify-center text-sm font-black uppercase tracking-[0.2em]">
              <span className="bg-white dark:bg-slate-950 px-4 text-slate-400">Hoặc tiếp tục với</span>
            </div>
          </div>

          <Button
            className="w-full h-14 rounded-2xl bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-900 dark:text-white font-bold text-lg gap-3 transition-all shadow-sm"
            type="button"
            variant="outline"
          >
            <Chrome className="w-5 h-5 text-red-500" />
            Đăng nhập với Google
          </Button>

          <p className="text-center text-slate-500 dark:text-slate-400 font-medium">
            Chưa có tài khoản chủ nhà?{" "}
            <Link
              className="font-black text-primary hover:text-primary/80 transition-colors underline underline-offset-8"
              href="/register"
            >
              Đăng ký ngay
            </Link>
          </p>

          <div className="flex justify-center gap-8 text-xs font-bold text-slate-400 uppercase tracking-widest pt-4">
            <Link className="hover:text-primary transition-colors" href="#">Quyền riêng tư</Link>
            <Link className="hover:text-primary transition-colors" href="#">Điều khoản</Link>
            <Link className="hover:text-primary transition-colors" href="#">Hỗ trợ</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
