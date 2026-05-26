# Mirae SMT — OEM/ODM 제조사 웹사이트

OEM/ODM 종합 제조 회사를 위한 다국어(한/영) 기업 웹사이트입니다.
Next.js 14 App Router + TypeScript + Tailwind CSS + next-intl 기반으로 구축되었습니다.

## 주요 특징

- 다국어 라우팅 (`/ko`, `/en`) — `next-intl`
- 6개 페이지 (홈 / 회사소개 / 제조역량 / 설비 / 품질 / 문의)
- 반응형 디자인, 다크 톤 액센트의 모던한 UI
- 문의 폼 + API 라우트 (Resend/SMTP 연결만 추가하면 운영 가능)
- SEO 기본기 (메타데이터, OpenGraph, sitemap, robots)
- 사이트 데이터 중앙화 (`config/site.ts`, `messages/*.json`)

## 빠른 시작

```bash
npm install
npm run dev
```

브라우저에서 다음 URL로 접속합니다.

- 한국어: <http://localhost:3000/ko>
- 영어: <http://localhost:3000/en>
- 루트 `/`로 접속하면 기본 언어(`ko`)로 자동 리다이렉트됩니다.

## 빌드 / 배포

```bash
npm run build
npm start
```

Vercel에 GitHub 저장소를 연결하면 별도 설정 없이 바로 배포됩니다.

## 폴더 구조

```text
mirae-smt/
├── app/
│   ├── layout.tsx                  # 루트 레이아웃 (단순 래퍼)
│   ├── globals.css                 # 글로벌 스타일 + Tailwind
│   ├── sitemap.ts / robots.ts      # SEO
│   ├── api/contact/route.ts        # 문의 폼 API
│   └── [locale]/
│       ├── layout.tsx              # 언어별 레이아웃 (next-intl Provider)
│       ├── not-found.tsx
│       ├── page.tsx                # / (홈)
│       ├── about/page.tsx
│       ├── capabilities/page.tsx
│       ├── facilities/page.tsx
│       ├── quality/page.tsx
│       └── contact/page.tsx
├── components/
│   ├── layout/                     # Header, Footer, Logo, LanguageSwitcher
│   ├── sections/                   # Hero, Stats, Strengths, CTA 등 재사용 섹션
│   └── ContactForm.tsx
├── config/
│   └── site.ts                     # ★ 회사 정보 (연락처, 인증, 강점)
├── messages/
│   ├── ko.json                     # ★ 한국어 텍스트
│   └── en.json                     # ★ 영어 텍스트
├── i18n.ts                         # next-intl 설정
├── middleware.ts                   # 언어 라우팅
├── tailwind.config.ts
└── next.config.mjs
```

## 콘텐츠 수정 가이드

실제 회사 정보로 교체할 때는 아래 두 곳만 수정하면 사이트 전체에 반영됩니다.

### 1. 회사 기본 정보 — `config/site.ts`

회사명, 주소, 전화/이메일, 설립연도, 직원 수, 공장 면적, 월 생산능력, 인증서 목록 등을 관리합니다.

### 2. 페이지 텍스트 — `messages/ko.json`, `messages/en.json`

각 페이지의 제목, 설명, 카드 내용, 연혁, 설비 목록 등 모든 텍스트가 들어있습니다.
키 구조가 한/영 동일하므로 한쪽을 수정하면 반드시 다른 쪽도 함께 수정하세요.

## 문의 폼 운영 환경 연결

`app/api/contact/route.ts` 파일에서 실제 이메일/Slack 전송 로직을 연결합니다.

### Resend 사용 예시

```bash
npm install resend
```

```ts
import { Resend } from 'resend';
const resend = new Resend(process.env.RESEND_API_KEY);

await resend.emails.send({
  from: 'noreply@your-domain.com',
  to: 'sales@your-domain.com',
  subject: `[문의] ${subject}`,
  html: `...`,
});
```

`.env.local` 파일을 만들어 `RESEND_API_KEY=...`를 추가합니다.

## 디자인 토큰

`tailwind.config.ts`의 `colors.brand`, `colors.ink` 팔레트를 수정하면 사이트 전체 색상이 한 번에 바뀝니다.

- `brand-*` : 메인 액센트 컬러 (현재 파랑 계열)
- `ink-*` : 텍스트 / 배경 그레이스케일

## TODO (후속 작업 제안)

- [ ] 실제 회사 정보로 `config/site.ts` 업데이트
- [ ] 메인 비주얼 이미지 / 공장 사진 / 설비 사진 교체 (`public/images/`)
- [ ] 회사 로고 이미지 파일 추가 후 `components/layout/Logo.tsx` 교체
- [ ] 문의 폼에 Resend 또는 SMTP 연결
- [ ] Google Maps / Naver Maps 임베드 (Contact 페이지)
- [ ] 인증서 PDF/이미지 추가 (Quality 페이지)
- [ ] Google Analytics, Naver Search Advisor 연동
