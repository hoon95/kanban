# 칸반형 To-Do List 실무 과제

배포 : https://kdy-to-do-page.vercel.app/

업무 효율 증진을 위한 칸반형 To-Do List 애플리케이션입니다.

- 이 프로젝트는 글로벌널리지 실무 과제로 진행되었으며, 칸반 보드 형식으로 보드와 태스크를 생성, 수정, 삭제, 순서 변경할 수 있습니다.
- 드래그 앤 드롭 기능과 부드러운 애니메이션 효과를 통해 사용자 경험을 개선하였습니다.
- 코드의 모듈화와 관심사의 분리를 통해 유지보수성과 확장성을 높였습니다.

## 기술 스택

- 프로젝트 : Next.js, TypeScript
- 스타일링 : Tailwind CSS
- 상태 관리 : Zustand
- 기타 라이브러리 : dnd-kit, Framer Motion

## 폴더 구조

프로젝트는 역할별로 아래와 같이 구성되어 있습니다.

```
KDH_ToDoPage/
├─ app/
│ ├─ components/
│ │ ├─ Board.tsx        // 단일 보드 컴포넌트 (dnd-kit, Framer Motion 적용)
│ │ ├─ BoardList.tsx    // 보드 목록 및 보드 추가 기능
│ │ ├─ Header.tsx       // 상단 헤더 (로고, 제목 등)
│ │ └─ TaskCard.tsx     // 보드 내 개별 태스크 컴포넌트
│ ├─ layout.tsx         // 전역 레이아웃 (메타 태그, 글로벌 스타일 등)
│ └─ page.tsx           // 메인 페이지 (Header, BoardList 포함)
├─ hooks/
│ ├─ useEditableTask.ts         // 태스크 편집 관련 커스텀 훅
│ └─ useDragAndDropHandlers.ts  // 드래그 앤 드롭 관련 커스텀 훅
├─ stores/
│ ├─ useTaskStore.ts            // 태스크 관련 상태 관리 (Zustand)
│ └─ useBoardStore.ts           // 보드 관련 상태 관리 (Zustand)
├─ types/
│ ├─ store.ts                   // 스토어 관련 타입 정의
│ └─ index.ts                   // 기타 타입 정의
├─ utils/
│ ├─ getBoardBackground.ts      // 보드 타입에 따른 배경색 결정 함수
│ ├─ eventUtils.ts              // 공통 이벤트 핸들러 유틸 (stopPropagation)
│ └─ iconUtils.ts               // 보드 아이콘 선택 로직 분리 (getBoardIcon)
```

## 설치 및 실행

### 1. 패키지 설치

```bash
npm install
```

### 2. 개발 서버 실행

```bash
npm run dev
```

### 3. 프로덕션 빌드 및 실행

```bash
npm run build
npm run start
```

## 사용 방법
