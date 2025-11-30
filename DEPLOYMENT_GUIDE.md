# E-Mailitary 배포 가이드

## Vercel 배포 단계

### 1. GitHub에 코드 푸시

\`\`\`bash
git init
git add .
git commit -m "Initial commit: E-Mailitary launch ready"
git branch -M main
git remote add origin <your-github-repo-url>
git push -u origin main
\`\`\`

### 2. Vercel에서 프로젝트 Import

1. [Vercel Dashboard](https://vercel.com) 로그인
2. "Add New Project" 클릭
3. GitHub repository 선택
4. Framework Preset: Next.js 자동 감지됨

### 3. 환경 변수 설정

Vercel 프로젝트 설정에서 다음 환경 변수 추가:

\`\`\`
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL=https://your-domain.vercel.app/auth/callback
\`\`\`

### 4. 배포

- "Deploy" 클릭
- 배포 완료까지 2-3분 대기
- 배포된 URL 확인

## 배포 후 테스트

### 1. 기본 기능 테스트
- [ ] 홈페이지 로드 확인
- [ ] 회원가입 테스트
- [ ] 로그인 테스트
- [ ] 편지 작성 테스트

### 2. 관리자 기능 테스트
- [ ] Admin 계정 로그인
- [ ] 편지 승인/거부
- [ ] 사용자 목록 조회
- [ ] 통계 확인

### 3. 법적 페이지 확인
- [ ] /privacy 페이지 로드
- [ ] /terms 페이지 로드
- [ ] Footer 링크 작동

## 문제 해결

### 인증 에러
- Supabase Dashboard에서 Redirect URLs 설정 확인
- `https://your-domain.vercel.app/**` 추가

### 데이터베이스 연결 에러
- 환경 변수 확인
- Supabase 프로젝트 활성 상태 확인

### RLS 정책 에러
- Supabase SQL Editor에서 RLS 정책 확인
- scripts 폴더의 SQL 파일 재실행

## 커스텀 도메인 설정 (선택사항)

1. Vercel 프로젝트 설정 > Domains
2. 커스텀 도메인 추가
3. DNS 레코드 설정
4. SSL 자동 발급 대기

## 모니터링

### Vercel Analytics
- 자동으로 활성화됨
- 페이지 뷰, 성능 지표 확인

### Supabase Dashboard
- Database > Logs에서 SQL 쿼리 모니터링
- Authentication > Users에서 사용자 증가 추적

## 백업 및 복구

### 데이터베이스 백업
1. Supabase Dashboard > Database > Backups
2. 자동 백업 활성화 확인
3. 수동 백업 실행 (필요시)

### 복구 절차
1. Supabase Dashboard에서 백업 선택
2. Restore 클릭
3. 데이터 확인

---

**배포 완료 후**: LAUNCH_CHECKLIST.md의 "출시 후 체크리스트" 진행
