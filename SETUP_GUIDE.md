# E-Mailitary 설정 가이드

## 1. Supabase 설정

### Google OAuth 설정

1. Supabase 대시보드에서 프로젝트를 엽니다
2. **Authentication** → **Providers**로 이동
3. **Google** 프로바이더를 활성화합니다
4. Google Cloud Console에서 OAuth 2.0 클라이언트 ID를 생성합니다:
   - https://console.cloud.google.com/apis/credentials
   - **CREATE CREDENTIALS** → **OAuth client ID** 선택
   - Application type: **Web application**
   - Authorized redirect URIs에 추가: `https://YOUR_SUPABASE_PROJECT.supabase.co/auth/v1/callback`
5. 생성된 Client ID와 Client Secret을 Supabase에 입력합니다

### 데이터베이스 설정

1. Supabase SQL Editor를 열거나 v0의 스크립트 실행 기능을 사용합니다
2. 다음 순서대로 스크립트를 실행합니다:
   - `scripts/001_create_tables.sql` - 테이블 및 RLS 정책 생성
   - `scripts/002_create_triggers.sql` - 트리거 생성
   - `scripts/004_simplified_admin_setup.sql` - 첫 사용자를 자동으로 관리자로 설정

## 2. 첫 관리자 계정 생성

### 방법 1: 자동 설정 (권장)

1. Google 계정으로 로그인합니다
2. 홈페이지 상단에 주황색 배너가 나타납니다
3. **"관리자 되기"** 버튼을 클릭합니다
4. 페이지가 새로고침되고 관리자 권한이 부여됩니다

### 방법 2: SQL 스크립트 사용

1. Google로 로그인하여 계정을 생성합니다
2. Supabase SQL Editor에서 다음 쿼리를 실행합니다:

\`\`\`sql
-- 현재 로그인한 사용자의 ID 확인
SELECT id, email FROM auth.users ORDER BY created_at ASC;

-- 해당 ID를 admin_users에 추가
INSERT INTO admin_users (id, created_at)
VALUES ('YOUR_USER_ID_HERE', NOW());
\`\`\`

## 3. 사이트 통계 초기화

관리자로 로그인한 후:

1. **Settings** 페이지로 이동
2. **Site Settings** 섹션에서 초기값 설정:
   - Total Letters Delivered: 0 (또는 원하는 숫자)
   - Current Batch Count: 0
3. **Save Settings** 클릭

## 4. 환경 변수 확인

v0에서 자동으로 설정된 환경 변수들:

- `SUPABASE_URL` - Supabase 프로젝트 URL
- `SUPABASE_ANON_KEY` - 익명 키
- `NEXT_PUBLIC_SUPABASE_URL` - 클라이언트용 URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - 클라이언트용 익명 키
- `NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL` - 개발 환경 리디렉션 URL

## 5. 기능 테스트

### 일반 사용자 기능
- ✅ Google 로그인/회원가입
- ✅ 편지 작성 (500자 이상, 금칙어 필터링)
- ✅ 내가 쓴 편지 목록 보기

### 관리자 기능
- ✅ 모든 제출된 편지 보기
- ✅ 편지 승인/거부
- ✅ 사용자 관리
- ✅ 사이트 통계 수정
- ✅ 배치 배송 완료 처리 (1,000통 단위)
- ✅ 추가 관리자 지정

## 문제 해결

### 로그인이 안 될 때
1. Google OAuth가 Supabase에서 활성화되어 있는지 확인
2. 리디렉션 URL이 올바르게 설정되어 있는지 확인
3. 브라우저 콘솔에서 에러 메시지 확인

### 관리자 권한이 없을 때
1. 홈페이지의 주황색 배너를 통해 "관리자 되기" 클릭
2. 또는 SQL로 직접 admin_users 테이블에 추가

### 편지가 제출되지 않을 때
1. 500자 이상 작성했는지 확인
2. 금칙어가 포함되어 있는지 확인
3. 로그인 상태인지 확인

## 추가 기능 개발 시 참고

### 새로운 관리자 추가
1. Admin → Settings 페이지 이동
2. "Add New Admin" 섹션에서 사용자 ID 입력
3. 사용자 ID는 Admin → Users 탭에서 확인 가능

### 배치 배송 완료
1. 편지가 1,000통에 도달하면 Admin → Settings에서 "Mark Batch as Delivered" 클릭
2. 자동으로 Total Letters Delivered가 증가하고 Current Batch Count가 0으로 리셋

### 통계 수동 조정
Admin → Settings에서 언제든지 통계를 수동으로 조정 가능
