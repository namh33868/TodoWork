<div align="center">

# FullStack Web – Task Manager

<!-- Thay thế bằng logo của bạn nếu có -->
<!-- <img src="docs/logo.png" alt="Project Logo" width="120" /> -->

[![Build Status](https://img.shields.io/github/actions/workflow/status/namh33868/TodoWork/ci.yml?branch=main)](https://github.com/namh33868/TodoWork/actions)
[![Coverage](https://img.shields.io/badge/coverage-pending-lightgrey)](./README.md)
[![Version](https://img.shields.io/github/v/release/namh33868/TodoWork?include_prereleases&label=version)](https://github.com/namh33868/TodoWork/releases)
[![License](https://img.shields.io/github/license/namh33868/TodoWork)](LICENSE)

</div>

---

## 1. Tổng quan dự án

FullStack Web – Task Manager (Todo Work) là ứng dụng quản lý công việc (to‑do/tasks) fullstack, xây dựng với kiến trúc tách biệt frontend–backend nhưng có thể chạy như một dịch vụ duy nhất trên Render.

**Mục tiêu**
- Quản lý danh sách công việc cá nhân/nhóm với giao diện hiện đại, dễ sử dụng.
- Cung cấp API RESTful đơn giản, dễ mở rộng để tích hợp với hệ thống khác.
- Triển khai dễ dàng trên các nền tảng cloud phổ biến (Render, Vercel, VPS…).

**Tính năng chính**
- Tạo, cập nhật, xóa task (CRUD).
- Lọc task theo trạng thái: `active` / `completed`.
- Lọc theo thời gian tạo (today / thisWeek / thisMonth / all).
- Thống kê nhanh số lượng task đang hoạt động và đã hoàn thành.
- Phân trang danh sách task ở frontend.
- Giao diện responsive sử dụng Tailwind CSS & shadcn/ui components.

**Giá trị mang lại**
- Mẫu dự án fullstack hoàn chỉnh để học tập hoặc làm nền tảng cho các hệ thống quản lý công việc phức tạp hơn.
- Cấu trúc mã rõ ràng, dễ mở rộng (thêm user, phân quyền, tag, deadline, v.v.).
- Phù hợp làm template cho các bài tập, demo phỏng vấn hoặc nội bộ team.

---

## 2. Demo

- Bản demo đã deploy:  
  👉 https://todowork-0iw4.onrender.com/

Đợi 1 lúc để server tự build và start (free tier render cứ sau 15p không có trafic sẽ tự động ngắt @@)

---

## 3. Công nghệ sử dụng

### 2.1. Tổng quan stack

| Nhóm                 | Công nghệ / Công cụ             | Phiên bản (theo package.json) | Ghi chú                                  |
|----------------------|----------------------------------|-------------------------------|------------------------------------------|
| Ngôn ngữ             | JavaScript (ESNext)             | –                             | Dùng cho cả frontend & backend          |
| Runtime              | Node.js                         | ≥ 20 (khuyến nghị)            | Phù hợp với Vite & React 19             |
| Frontend bundler     | Vite                            | ^7.3.1                        | Dev server & build production           |
| Frontend framework   | React                           | ^19.2.0                       | SPA với React Router                    |
| Routing frontend     | react-router                    | ^7.13.0                       | Điều hướng trang                         |
| UI & styling         | Tailwind CSS                    | ^4.1.18                       | Utility-first CSS                        |
| UI components        | shadcn/ui, radix-ui, cmdk       | ^3.8.5, ^1.4.3, ^1.1.1        | Component library & command palette      |
| Icons                | lucide-react                    | ^0.564.0                      | Bộ icon SVG                             |
| HTTP client          | axios                           | ^1.13.5                       | Gọi API tới backend                     |
| Thông báo            | sonner                          | ^2.0.7                        | Toast notification                      |
| Backend framework    | express                         | ^4.18.2                       | Xây dựng REST API                       |
| CSDL                 | MongoDB (Atlas)                 | –                             | Cloud database                          |
| ORM/ODM              | mongoose                        | ^9.2.1                        | Model hóa dữ liệu MongoDB               |
| Cấu hình môi trường  | dotenv                          | ^17.3.1                       | Quản lý biến môi trường                 |
| CORS                 | cors                            | ^2.8.6                        | Cho phép cross-origin trong dev         |
| Dev backend          | nodemon                         | ^3.1.11                       | Tự restart server khi code thay đổi     |
| Message queue        | –                                | –                             | Chưa sử dụng                            |
| Caching system       | –                                | –                             | Chưa sử dụng                            |
| Hosting (gợi ý)      | Render Web Service              | –                             | Chạy fullstack trên 1 service           |

> Lưu ý: phiên bản có thể thay đổi theo thời gian. Xem thêm tại:
> - [`backend/package.json`](./backend/package.json)
> - [`frontend/package.json`](./frontend/package.json)

---

## 4. Clone mã nguồn

```bash
git clone https://github.com/namh33868/TodoWork.git
cd FullStack-Web
```

> Đường dẫn thư mục thực tế có thể khác (ví dụ `TodoWork/`), tùy theo repo của bạn.

## 5. Cấu trúc thư mục

```bash
FullStack-Web/
├─ backend/
│  ├─ src/
│  │  ├─ config/
│  │  │  └─ db.js              # Kết nối MongoDB
│  │  ├─ controllers/
│  │  │  └─ tasksControllers.js # Logic xử lý API Task
│  │  ├─ model/
│  │  │  └─ Task.js            # Định nghĩa schema Task (Mongoose)
│  │  ├─ routes/
│  │  │  └─ tasksRouters.js    # Định tuyến /api/tasks
│  │  └─ server.js             # Khởi tạo Express app & serve frontend build
│  ├─ package.json
│  └─ test.http                 # File test API nhanh (REST client)
├─ frontend/
│  ├─ public/
│  ├─ src/
│  │  ├─ assets/
│  │  ├─ components/
│  │  │  ├─ ui/                 # Các component UI tái sử dụng (shadcn/ui)
│  │  │  ├─ AddTask.jsx         # Form thêm công việc
│  │  │  ├─ TaskList.jsx        # Danh sách công việc
│  │  │  ├─ TaskCard.jsx        # Thẻ hiển thị từng công việc
│  │  │  ├─ TaskListPagination.jsx # Phân trang
│  │  │  ├─ StatsAndFilter.jsx  # Thống kê & bộ lọc
│  │  │  └─ ...
│  │  ├─ lib/
│  │  │  ├─ axios.js            # Cấu hình axios BASE_URL
│  │  │  ├─ data.js
│  │  │  └─ utils.js
│  │  ├─ pages/
│  │  │  ├─ HomePage.jsx        # Trang chính ứng dụng
│  │  │  └─ NotFound.jsx
│  │  ├─ App.jsx
│  │  └─ main.jsx
│  ├─ package.json
│  └─ vite.config.js
├─ package.json                  # Script build & start toàn dự án
└─ .gitignore
```

**Giải thích nhanh**
- `backend/src/server.js`: entry point backend, cấu hình middleware, route `/api/tasks`, serve frontend build trong production.
- `backend/src/controllers/tasksControllers.js`: xử lý nghiệp vụ CRUD, filter theo thời gian, thống kê.
- `backend/src/model/Task.js`: định nghĩa schema task với `title`, `status`, `completedAt`, `createdAt`, `updatedAt`.
- `frontend/src/pages/HomePage.jsx`: trang chính, orchestrate filter, pagination, CRUD và các component con.
- `frontend/src/components/**/*`: các component hiển thị UI, chia nhỏ theo chức năng (task list, card, filter, pagination, header/footer…).

---

## 6. Cài đặt và cấu hình

### 6.1. Prerequisites

- Đã cài **Node.js** (khuyến nghị ≥ 18, tốt nhất 20 LTS).
- Đã cài **npm** (đi kèm Node.js).
- Đã cài **Git**.
- Có tài khoản **MongoDB Atlas** (hoặc kết nối tới một instance MongoDB khác).

### 6.2. File `.env.example`

File cấu hình môi trường mẫu nằm tại:

```text
backend/.env.example
```

Chứa các biến:

| Biến                     | Mặc định     | Ý nghĩa                                                        |
|--------------------------|-------------|----------------------------------------------------------------|
| `NODE_ENV`              | development | Chế độ chạy (`development` / `production`)                    |
| `PORT`                  | 5001        | Cổng backend (local)                                          |
| `MONGODB_CONNECTIONSTRING` | (trống)  | Connection string MongoDB Atlas hoặc MongoDB khác             |

Các bước:

1. Sao chép file mẫu:

   - Windows:

   ```bash
   copy backend\.env.example backend\.env
   ```

   - macOS/Linux:

   ```bash
   cp backend/.env.example backend/.env
   ```

2. Mở `backend/.env` và cập nhật:
   - `MONGODB_CONNECTIONSTRING` theo connection string thật của bạn.
   - `PORT` nếu muốn thay đổi.

### 6.3. Kết nối database

1. Truy cập MongoDB Atlas, tạo:
   - Project và cluster.
   - Database user có quyền đọc/ghi.
2. Lấy connection string dạng:

   ```text
   mongodb+srv://<username>:<password>@<cluster>/<database>?retryWrites=true&w=majority
   ```

3. Dán vào `MONGODB_CONNECTIONSTRING` trong `backend/.env`.
4. Lưu file và chạy lệnh khởi tạo database ở mục dưới để kiểm tra kết nối.

### 6.6. Troubleshooting khi setup

- Lỗi: `MONGODB_CONNECTIONSTRING environment variable is not set`  
  - Nguyên nhân: Chưa tạo file `.env` hoặc chưa khai báo biến `MONGODB_CONNECTIONSTRING`.  
  - Cách xử lý: Tạo `backend/.env` từ `.env.example` và điền đầy đủ giá trị.

- Lỗi: `MongoDB connection failed` hoặc timeout khi start server  
  - Nguyên nhân:
    - Connection string sai username/password/database.
    - IP máy bạn chưa được allow trong Network Access của MongoDB Atlas.
  - Cách xử lý:
    - Kiểm tra lại connection string.
    - Thêm IP của bạn hoặc `0.0.0.0/0` vào MongoDB Atlas (chỉ dùng cho môi trường dev/demo).

- Lỗi: `EADDRINUSE: address already in use` khi start backend  
  - Nguyên nhân: Cổng `PORT` (ví dụ 5001) đang được process khác sử dụng.  
  - Cách xử lý:
    - Đổi `PORT` trong `.env` sang giá trị khác (ví dụ 3000).
    - Hoặc tắt process đang dùng port đó.

---

## 7. Hướng dẫn chạy dự án

### 7.1. Chạy môi trường development

Chạy backend:

```bash
npm run start
```

Trong đó:
- `npm run start` sẽ chạy backend, đồng thời serve build frontend từ thư mục `frontend/dist`.

---

## 8. License & thông tin liên hệ

### 8.1. License

- Dự án sử dụng license **ISC** (xem tại `LICENSE` nếu có).  
  Bạn có thể thay đổi loại license phù hợp với nhu cầu (MIT, Apache-2.0, v.v.).

### 8.2. Tác giả & liên hệ

- Tác giả chính: Hoài Nam (hnam33868@gmail.com)
- Repository: <https://github.com/namh33868/TodoWork>
- Issues & bug report: <https://github.com/namh33868/TodoWork/issues>

Nếu bạn sử dụng dự án này hoặc fork để phát triển thêm, hãy cân nhắc:
- Star repo để ủng hộ.
- Mở PR để đóng góp tính năng/cải thiện tài liệu.

