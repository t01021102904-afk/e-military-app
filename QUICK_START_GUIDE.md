# E-Mailitary 빠른 시작 가이드 🚀

## 1단계: Google OAuth 설정 (필수)

현재 Google 로그인이 작동하지 않는 이유는 Supabase에서 Google OAuth 프로바이더가 활성화되지 않았기 때문입니다.

### Supabase에서 Google OAuth 활성화하기

1. **Supabase 대시보드 접속**
   - [https://supabase.com/dashboard](https://supabase.com/dashboard)로 이동
   - `e-mailitar-volunteer` 프로젝트 선택

2. **Authentication 설정으로 이동**
   - 왼쪽 사이드바에서 `Authentication` 클릭
   - `Providers` 탭 클릭

3. **Google 프로바이더 활성화**
   - `Google` 찾아서 클릭
   - `Enable Sign in with Google` 토글을 **ON**으로 설정

4. **간단한 설정 (개발용)**
   - "Use a preconfigured development client" 옵션을 선택
   - 이렇게 하면 즉시 Google 로그인을 테스트할 수 있습니다
   - `Save` 버튼 클릭

> **참고**: 프로덕션 배포를 위해서는 나중에 자체 Google OAuth 클라이언트를 설정해야 합니다. 자세한 내용은 `GOOGLE_OAUTH_SETUP.md`를 참조하세요.

---

## 2단계: Google로 로그인하기

1. v0 앱의 로그인 페이지로 이동
2. "Google로 로그인 하기" 버튼 클릭
3. Google 계정 선택 (t01021102904@gmail.com)
4. 권한 승인

로그인이 성공하면 홈페이지로 리디렉션됩니다!

---

## 3단계: 관리자 권한 부여

로그인 후, 자신을 관리자로 만들어야 합니다.

### 방법 1: 자동 배너 사용 (가장 쉬움)

1. 로그인 후 페이지 상단에 주황색 배너가 표시됩니다
2. "관리자로 설정하기" 버튼 클릭
3. 완료! 이제 `/admin` 페이지에 접근할 수 있습니다

### 방법 2: SQL 스크립트 실행

배너가 표시되지 않는 경우:

1. v0 Chat에서 Scripts 폴더의 `005_add_admin_by_email.sql` 파일을 찾습니다
2. 파일 옆의 실행 버튼을 클릭하여 스크립트를 실행합니다
3. 페이지를 새로고침하면 관리자 권한이 적용됩니다

---

## 4단계: 사이트 설정 초기화

관리자로 로그인한 후:

1. `/admin/settings` 페이지로 이동
2. "Site Settings" 섹션에서 초기 통계 설정:
   - **Total Letters Delivered**: 0 (또는 원하는 시작 숫자)
   - **Current Batch Count**: 0
   - **Batch Size**: 1000

3. "Save Settings" 버튼 클릭

---

## 🎉 완료!

이제 E-Mailitary 웹사이트를 사용할 수 있습니다:

- **홈페이지**: 미션과 영향력 확인
- **편지 작성**: `/write` 페이지에서 군인들에게 편지 작성
- **내 편지**: `/my-letters` 페이지에서 내가 작성한 편지 확인
- **관리자 대시보드**: `/admin` 페이지에서 편지 승인/거부, 사용자 관리
- **설정**: `/admin/settings` 페이지에서 사이트 설정 및 관리자 추가

---

## 문제 해결

### "Multiple GoTrueClient instances" 오류가 발생하는 경우
- 페이지를 새로고침하면 해결됩니다 (싱글톤 패턴으로 수정됨)

### Google 로그인 버튼을 눌러도 아무 일도 일어나지 않는 경우
- Supabase에서 Google 프로바이더가 활성화되었는지 확인
- 브라우저 콘솔에서 오류 메시지 확인

### 로그인 후 관리자 배너가 표시되지 않는 경우
- 이미 관리자일 수 있습니다 - `/admin` 페이지로 직접 이동해보세요
- 또는 `005_add_admin_by_email.sql` 스크립트를 실행하세요

---

## 다음 단계

프로덕션 배포를 위한 추가 설정:

1. **자체 Google OAuth 클라이언트 설정** - `GOOGLE_OAUTH_SETUP.md` 참조
2. **이용약관 및 개인정보 처리방침 추가**
3. **이메일 알림 시스템 구축** (Resend 또는 SendGrid)
4. **Rate Limiting 추가** (스팸 방지)
5. **CAPTCHA 추가** (봇 방지)

자세한 내용은 `SETUP_GUIDE.md`를 참조하세요.
