# 로그인 가이드

## 이메일/비밀번호로 로그인하기

Google OAuth 문제가 해결될 때까지 **이메일과 비밀번호**로 로그인할 수 있습니다.

### 1단계: 회원가입

1. `/auth/sign-up` 페이지로 이동
2. 이메일 주소 입력 (예: t01021102904@gmail.com)
3. 비밀번호 입력 (최소 6자)
4. 비밀번호 확인
5. "회원가입" 버튼 클릭
6. 이메일 인증 링크 확인 (Supabase에서 발송)

### 2단계: 이메일 인증

Supabase에서 이메일 인증이 활성화되어 있으면:
- 받은 편지함에서 인증 이메일 확인
- 링크를 클릭하여 이메일 인증 완료

**개발 모드에서는 이메일 인증을 건너뛸 수 있습니다:**

Supabase 대시보드 → Authentication → Email Templates → "Confirm signup"에서 Auto-confirm 활성화

### 3단계: 로그인

1. `/auth/login` 페이지로 이동
2. 가입한 이메일과 비밀번호 입력
3. "로그인" 버튼 클릭

### 4단계: 관리자 권한 설정

로그인 후 홈페이지 상단에 **주황색 배너**가 표시됩니다:
- "관리자로 설정하기" 버튼을 클릭하면 즉시 관리자 권한을 받습니다
- 또는 SQL 스크립트를 실행할 수도 있습니다

**SQL로 직접 관리자 설정:**

\`\`\`sql
-- Supabase SQL Editor에서 실행
INSERT INTO admin_users (user_id)
SELECT id FROM users WHERE email = 't01021102904@gmail.com'
ON CONFLICT (user_id) DO NOTHING;
\`\`\`

## Google OAuth (선택사항)

나중에 Google OAuth를 설정하려면:

1. **Supabase 대시보드**
   - Authentication → Providers → Google
   - "Use a preconfigured development client" 선택
   - Save

2. **프로덕션용 설정**
   - Google Cloud Console에서 OAuth 2.0 클라이언트 ID 생성
   - Supabase에 Client ID와 Client Secret 입력
   - Authorized redirect URI: `https://[YOUR-PROJECT-REF].supabase.co/auth/v1/callback`

## 문제 해결

### 이메일 인증 이메일이 오지 않을 때

**임시 해결책:** Supabase에서 이메일 확인 우회

\`\`\`sql
-- 사용자의 이메일을 수동으로 확인 처리
UPDATE auth.users 
SET email_confirmed_at = NOW() 
WHERE email = 't01021102904@gmail.com';
\`\`\`

### 로그인이 안 될 때

1. 비밀번호를 정확히 입력했는지 확인
2. 이메일 주소가 정확한지 확인
3. 이메일 인증을 완료했는지 확인
4. 브라우저 콘솔에서 오류 메시지 확인

## 빠른 테스트

**지금 바로 시작하기:**

1. 이메일: `t01021102904@gmail.com`
2. 비밀번호: 원하는 비밀번호 입력 (최소 6자)
3. 회원가입 → 로그인
4. 홈페이지에서 "관리자로 설정하기" 클릭

이제 모든 관리자 기능을 사용할 수 있습니다!
