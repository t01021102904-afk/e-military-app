# E-Mailitary

미군 장병들에게 따뜻한 편지를 전달하는 비영리 자원봉사 플랫폼

## 프로젝트 소개

E-Mailitary는 미군 장병들에게 온라인으로 작성된 편지를 인쇄하여 전달하는 비영리 프로젝트입니다. 
누구나 온라인으로 편지를 작성하면, 자원봉사자가 검토 후 인쇄하여 1,000통 단위로 부대로 전달합니다.

## 주요 기능

### 일반 사용자
- **Google OAuth 로그인** - 간편하고 안전한 로그인
- **편지 작성** - 500자 이상의 따뜻한 메시지 작성
- **금칙어 필터링** - 정치, 종교(일부 허용), 군사정보 등 자동 필터링
- **내 편지 관리** - 작성한 편지 목록 및 상태 확인

### 관리자 기능
- **편지 관리** - 제출된 모든 편지 검토 및 승인/거부
- **사용자 관리** - 전체 회원 목록 및 활동 내역 확인
- **통계 관리** - 전달된 편지 수, 현재 배치 진행 상황 관리
- **배치 배송** - 1,000통 단위 배송 완료 처리
- **관리자 추가** - 새로운 관리자 지정

## 기술 스택

- **Frontend**: Next.js 16, React 19, TypeScript
- **Styling**: Tailwind CSS v4, shadcn/ui
- **Backend**: Next.js Server Actions
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth with Google OAuth
- **Deployment**: Vercel

## 시작하기

### 🚀 빠른 Google OAuth 설정

**가장 쉬운 방법 (권장):**

1. [Supabase 대시보드](https://supabase.com/dashboard) 접속
2. `e-mailitar-volunteer` 프로젝트 선택
3. **Authentication > Providers > Google** 메뉴
4. ✅ "Enable Sign in with Google" 체크
5. ✅ **"Use a preconfigured development client"** 선택
6. "Save" 클릭

**완료!** Google Cloud Console 설정 없이 즉시 로그인 가능합니다.

### 📝 관리자 계정 만들기

Google로 로그인 후:

**방법 1: 자동 (추천)**
- 로그인하면 페이지 상단에 주황색 배너 표시
- "관리자로 설정하기" 버튼 클릭

**방법 2: 이메일로 직접 추가**
- `scripts/005_add_admin_by_email.sql` 실행
- 이메일 주소를 본인 이메일로 수정

### ❌ 로그인 문제 해결

**"이 콘텐츠는 차단되어 있습니다" 오류 발생 시:**
- 위의 "preconfigured development client" 방법 사용
- 또는 `OAUTH_문제해결.md` 파일 참고
- Google Cloud Console의 테스트 사용자 추가 필요 (자체 OAuth 클라이언트 사용 시)

### 📚 상세 가이드

- [OAUTH_문제해결.md](./OAUTH_문제해결.md) - Google OAuth 로그인 문제 완전 해결 가이드
- [QUICK_START_GUIDE.md](./QUICK_START_GUIDE.md) - 5분 안에 시작하기
- [GOOGLE_OAUTH_SETUP.md](./GOOGLE_OAUTH_SETUP.md) - 상세 OAuth 설정 (프로덕션용)
- [SETUP_GUIDE.md](./SETUP_GUIDE.md) - 전체 프로젝트 설정 가이드

## 프로젝트 구조

\`\`\`
├── app/
│   ├── auth/          # 인증 관련 페이지
│   ├── admin/         # 관리자 대시보드
│   ├── write/         # 편지 작성
│   └── my-letters/    # 내 편지 목록
├── components/
│   ├── admin/         # 관리자 컴포넌트
│   ├── home/          # 홈페이지 섹션
│   └── ui/            # shadcn/ui 컴포넌트
├── lib/
│   ├── supabase/      # Supabase 클라이언트
│   └── content-filter.ts  # 금칙어 필터
└── scripts/           # 데이터베이스 마이그레이션
\`\`\`

## 보안 및 개인정보

- Row Level Security (RLS) 정책으로 데이터 보호
- 사용자는 자신의 편지만 조회 가능
- 관리자 권한은 admin_users 테이블로 관리
- 금칙어 필터링으로 부적절한 콘텐츠 방지

## 라이선스

이 프로젝트는 비영리 자원봉사 목적으로 제작되었습니다.

## 문의

프로젝트에 대한 문의나 제안사항이 있으시면 이슈를 등록해주세요.
