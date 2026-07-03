# Nguyen Tran Trung Nguyen Portfolio

Portfolio cho Nguyen Tran Trung Nguyen, một Mobile Engineer tại TP. Hồ Chí Minh. Website giới thiệu hồ sơ cá nhân, kỹ năng, kinh nghiệm, học vấn, thông tin liên hệ và các case study mobile như VietABank ezSHOP và MyVNG.

## Tổng quan

- Next.js 16 App Router với React 19 và TypeScript.
- Nội dung profile và dự án được quản lý bằng TypeScript, MDX và Zod validation.
- Giao diện có dark mode, hiệu ứng editorial motion, custom cursor, metadata SEO, sitemap, robots và Open Graph image.
- Kiểm thử bằng Vitest, Testing Library và Playwright.

## Chạy local

Yêu cầu:

- Node.js tương thích với Next.js 16.
- Có thể dùng `pnpm` CLI, Corepack hoặc chạy `pnpm` tạm thời qua `npx`.

### Cách 1: Chạy bằng npx

```bash
npx pnpm@10.34.4 install
cp .env.example .env.local
npx pnpm@10.34.4 dev
```

### Cách 2: Bật pnpm bằng Corepack

```bash
corepack enable
corepack prepare pnpm@10.34.4 --activate
```

Sau đó chạy:

```bash
pnpm install
cp .env.example .env.local
pnpm dev
```

### Cách 3: Cài pnpm bằng npm

Nếu môi trường không có Corepack, có thể cài `pnpm` bằng npm:

```bash
npm install -g pnpm@10.34.4
```

Sau đó chạy:

```bash
pnpm install
cp .env.example .env.local
pnpm dev
```

Mở `http://localhost:3000`.

## Cấu trúc chính

```text
src/app/page.tsx                   Trang chủ
src/app/showcase/page.tsx          Showcase dự án
src/content/profile.ts             Thông tin cá nhân, kinh nghiệm, học vấn, kỹ năng
src/content/projects.ts            Registry metadata cho các dự án được hiển thị
src/content/projects/*/content.mdx Nội dung case study
src/content/site-text.ts           Text tĩnh dùng trong giao diện
src/components/                    Header, footer, motion, theme, showcase components
public/                            CV, hình ảnh, video và asset tĩnh
```

Các route public chính:

- `/`: trang chủ với hero, giới thiệu, kỹ năng, kinh nghiệm, học vấn và liên hệ.
- `/showcase`: danh sách case study đã publish.

Các đường dẫn không hợp lệ sẽ trả về trang 404.

## Cập nhật nội dung

1. Sửa `src/content/profile.ts` để cập nhật tên, vai trò, bio, email, LinkedIn, CV, kinh nghiệm, học vấn hoặc kỹ năng.
2. Sửa `src/content/site-text.ts` khi cần đổi text giao diện.
3. Thêm hoặc cập nhật metadata dự án trong `src/content/projects.ts`.
4. Tạo file MDX cho mỗi dự án tại `src/content/projects/<slug>/content.mdx`.
5. Thêm hình ảnh vào `public/images/` và video demo vào `public/videos/` nếu dự án có asset công khai.
6. Thay file `public/nguyen-tran-trung-nguyen-cv.pdf` khi cần cập nhật CV, rồi kiểm tra lại `resumeUrl` trong `profile.ts`.

Lưu ý: thư mục `src/content/projects/technical-demo-sample/` đang là mẫu nội dung kỹ thuật. Project này chỉ xuất hiện trên website khi được thêm vào mảng `projects` trong `src/content/projects.ts`.

## Biến môi trường

Tạo `.env.local` từ `.env.example`:

```bash
NEXT_PUBLIC_SITE_URL=https://example.com
```

Đổi `NEXT_PUBLIC_SITE_URL` thành domain thật trước khi deploy để canonical URL, sitemap, Open Graph và JSON-LD dùng đúng địa chỉ production.

## Kiểm tra chất lượng

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm build
pnpm exec playwright install chromium
pnpm test:e2e
```

GitHub Actions chạy lint, typecheck, unit test và production build cho push hoặc pull request vào `main`.

## Deploy

Dự án phù hợp deploy trên Vercel với cấu hình Next.js mặc định. Không cần database hay server-side secret; chỉ cần thiết lập `NEXT_PUBLIC_SITE_URL` cho môi trường production.
