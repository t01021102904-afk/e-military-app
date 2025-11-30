# Google OAuth 로그인 문제 해결 가이드

## 🚨 "이 콘텐츠는 차단되어 있습니다" 오류 해결

이 오류는 Google Cloud Console의 OAuth 동의 화면 설정 문제입니다.

---

## ✅ **가장 쉬운 해결 방법 (권장)**

Supabase에서 제공하는 개발용 클라이언트를 사용하세요!

### 단계:

1. **Supabase 대시보드** 접속
   - https://supabase.com/dashboard

2. **프로젝트 선택**
   - `e-mailitar-volunteer` 프로젝트 클릭

3. **Authentication > Providers 메뉴로 이동**

4. **Google 프로바이더 찾기**
   - "Google" 항목 클릭

5. **개발용 클라이언트 활성화**
   - ✅ "Enable Sign in with Google" 체크
   - ✅ "Use a preconfigured development client" 선택
   - "Skip to next step" 클릭
   - "Save" 버튼 클릭

6. **완료!**
   - 즉시 Google 로그인이 작동합니다
   - Google Cloud Console 설정 필요 없음

---

## 🔧 **자체 OAuth 클라이언트 사용 (프로덕션용)**

나중에 프로덕션 배포 시 자체 OAuth 클라이언트가 필요합니다.

### Google Cloud Console 설정:

#### 1️⃣ OAuth 동의 화면 설정

https://console.cloud.google.com/apis/credentials/consent

**중요 설정:**
- **User Type**: "External" 선택
- **Publishing status**: "Testing" 상태로 유지 (개발 중)

#### 2️⃣ 테스트 사용자 추가

**매우 중요!** Testing 모드에서는 반드시 테스트 사용자를 추가해야 합니다.

1. OAuth 동의 화면 페이지에서 "ADD USERS" 버튼 클릭
2. 이메일 추가:
   \`\`\`
   t01021102904@gmail.com
   \`\`\`
3. "Save" 클릭

#### 3️⃣ OAuth 2.0 클라이언트 ID 생성

https://console.cloud.google.com/apis/credentials

1. "+ CREATE CREDENTIALS" 클릭
2. "OAuth client ID" 선택
3. Application type: "Web application"
4. Name: "E-Mailitary"

**Authorized redirect URIs:**
\`\`\`
https://yxlxytidyvrxifgqlwtx.supabase.co/auth/v1/callback
\`\`\`

**Authorized JavaScript origins (선택사항):**
\`\`\`
https://v0.app
https://yxlxytidyvrxifgqlwtx.supabase.co
\`\`\`

5. "CREATE" 클릭
6. **Client ID**와 **Client Secret** 복사

#### 4️⃣ Supabase에 추가

1. Supabase Dashboard > Authentication > Providers > Google
2. "Use your own OAuth credentials" 선택
3. Client ID와 Client Secret 붙여넣기
4. "Save" 클릭

---

## 🎯 **추천 워크플로우**

### 개발 단계 (지금):
✅ **Supabase preconfigured client 사용**
- 설정 불필요
- 즉시 테스트 가능
- 별도 승인 필요 없음

### 프로덕션 배포 시:
🚀 **자체 OAuth 클라이언트로 교체**
- 앱을 "Publishing" 상태로 변경
- 또는 계속 "Testing" 상태로 유지하고 사용자 추가

---

## 📝 현재 상황

당신의 이메일: `t01021102904@gmail.com`

**해야 할 일:**
1. Supabase에서 "preconfigured development client" 활성화 (가장 빠름)
2. 또는 Google Cloud Console에서 테스트 사용자로 본인 이메일 추가

---

## ❓ 자주 묻는 질문

**Q: Preconfigured client는 안전한가요?**
A: 개발/테스트 용도로는 완벽히 안전합니다. 프로덕션 배포 시에만 자체 클라이언트로 교체하세요.

**Q: 여러 명이 테스트하려면?**
A: Preconfigured client를 사용하면 누구나 로그인 가능합니다.

**Q: 프로덕션에서도 preconfigured client를 쓸 수 있나요?**
A: 가능하지만, 자체 브랜드와 OAuth 동의 화면을 위해 자체 클라이언트를 권장합니다.

---

**지금 바로 시도해보세요!** Supabase에서 preconfigured client를 활성화하고 5초 안에 Google 로그인을 테스트할 수 있습니다.
