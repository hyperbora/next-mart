# 🛒 Next Mart

Next.js + Supabase 기반의 쇼핑몰 데모 프로젝트입니다.  
회원가입, 로그인, 장바구니, 상품 상세보기 기능을 제공합니다.

---

## 🛠 기술 스택

- **Frontend**: Next.js 15, TypeScript, Tailwind CSS
- **Backend**: Supabase (PostgreSQL, Auth)
- **State Management**: Zustand
- **UI/UX**: react-hot-toast, custom modal
- **Deployment**: Vercel

---

## ✨ 주요 기능

- 회원가입 / 로그인 (이메일, 전화번호)
- 로그인 세션 기반 메뉴 표시
- 상품 목록 / 상세 페이지
- 장바구니 담기 / 삭제
- 장바구니 데이터 DB 동기화
- 로딩 스피너 & 삭제 전 확인 모달

---

## 🚀 실행 방법

1. 저장소 클론

```bash
git clone https://github.com/yourname/next-mart.git
cd next-mart
```

2. 의존성 설치

```bash
npm install
```

3. 환경 변수 설정

```env
.env.local 파일 생성 후 아래 값 입력:

NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

4. 개발 서버 실행

```bash
npm run dev
```

## 📝 향후 개선 계획

- 관리자 페이지 추가
- 상품 검색 및 필터링
- 결제 연동
- 반응형 UX 개선

## 라이선스

MIT License
