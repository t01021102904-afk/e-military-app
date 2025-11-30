# Google OAuth 설정 가이드

## 중요: 올바른 리디렉션 URI

당신의 Supabase 프로젝트에 맞는 정확한 리디렉션 URI:

\`\`\`
https://yxlxytidyvrxifgqlwtx.supabase.co/auth/v1/callback
\`\`\`

⚠️ **주의**: v0.app URL이 아닌 위의 Supabase URL을 사용해야 합니다!

---

## 단계별 설정 방법

### 1단계: Google Cloud Console에서 OAuth 클라이언트 생성

1. [Google Cloud Console](https://console.cloud.google.com/) 방문
2. 새 프로젝트 생성 또는 기존 프로젝트 선택
3. **APIs & Services** → **OAuth consent screen** 이동
4. User Type 선택:
   - **External** 선택 (누구나 로그인 가능)
   - **Create** 클릭
5. OAuth consent screen 정보 입력:
   - **App name**: E-Mailitary
   - **User support email**: t01021102904@gmail.com
   - **Developer contact email**: t01021102904@gmail.com
   - **Save and Continue** 클릭
6. Scopes는 기본값 그대로 두고 **Save and Continue**
7. Test users 추가 (선택사항):
   - **Add Users** 클릭
   - 이메일 추가: t01021102904@gmail.com
   - **Save and Continue**

### 2단계: OAuth 클라이언트 ID 생성

1. **APIs & Services** → **Credentials** 이동
2. **Create Credentials** → **OAuth client ID** 클릭
3. Application type: **Web application** 선택
4. Name: **E-Mailitary Web Client**
5. **Authorized JavaScript origins** 섹션:
   \`\`\`
   https://yxlxytidyvrxifgqlwtx.supabase.co
   \`\`\`
6. **Authorized redirect URIs** 섹션 - 다음 URL을 **정확히** 입력:
   \`\`\`
   https://yxlxytidyvrxifgqlwtx.supabase.co/auth/v1/callback
   \`\`\`
7. **Create** 클릭
8. **Client ID**와 **Client Secret**을 복사해두세요

### 3단계: Supabase에 Google OAuth 설정

1. [Supabase Dashboard](https://supabase.com/dashboard) 방문
2. `e-mailitar-volunteer` 프로젝트 선택
3. 좌측 메뉴에서 **Authentication** → **Providers** 이동
4. **Google** 프로바이더 찾기
5. **Enable** 토글 활성화
6. Google Cloud Console에서 복사한 정보 입력:
   - **Client ID**: 복사한 Client ID 붙여넣기
   - **Client Secret**: 복사한 Client Secret 붙여넣기
7. **Save** 클릭

### 4단계: 첫 번째 관리자 계정 생성

1. E-Mailitary 웹사이트에서 **Login** 클릭
2. **Google로 로그인하기** 버튼 클릭
3. Google 계정으로 로그인 (t01021102904@gmail.com 권장)
4. 로그인 후 페이지 상단에 주황색 배너가 표시됩니다:
   \`\`\`
   ⚠️ 아직 관리자가 없습니다. 첫 번째 관리자가 되시겠습니까?
   \`\`\`
5. **관리자로 설정하기** 버튼 클릭
6. 이제 관리자 계정이 생성되었습니다!
7. 헤더의 **Admin** 링크를 클릭하여 관리자 대시보드에 접근

---

## 문제 해결

### "Multiple GoTrueClient instances" 오류
✅ 이미 수정됨 - 싱글톤 패턴으로 해결

### Google 로그인 버튼이 작동하지 않음
- Supabase에서 Google 프로바이더가 활성화되어 있는지 확인
- Client ID와 Client Secret이 올바르게 입력되었는지 확인
- 브라우저 콘솔에서 에러 메시지 확인

### 리디렉션 URI 불일치 오류
- Google Cloud Console의 Authorized redirect URIs에 정확히 다음 URL이 있는지 확인:
  \`\`\`
  https://yxlxytidyvrxifgqlwtx.supabase.co/auth/v1/callback
  \`\`\`
- v0.app URL이 아닌 Supabase URL을 사용해야 합니다!

### 로그인 후 아무 일도 일어나지 않음
- 브라우저 쿠키가 활성화되어 있는지 확인
- 시크릿 모드가 아닌 일반 브라우저에서 시도
- 캐시와 쿠키를 삭제하고 다시 시도

---

## 다음 단계

관리자 계정 설정 후:
1. **Admin Dashboard** 방문
2. **Settings** 탭에서 사이트 설정 업데이트
3. 필요시 추가 관리자 계정 생성
4. 제출된 편지 검토 및 승인 시작

축하합니다! E-Mailitary가 준비되었습니다! 🎉
