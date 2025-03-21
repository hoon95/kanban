# 📚 칸반형 To-Do List

업무 효율 증진을 위한 칸반형 To-Do List 애플리케이션입니다.

- 보드와 태스크를 생성, 수정, 삭제, 순서 변경할 수 있습니다.

## 👀 구현 의도

- 업무 효율의 증진을 위해 다양한 기능보다 본질적인 기능에 초점을 맞추어, <br />
  심플하고 직관적인 UI로 사용의 편리성을 높였습니다.
- 드래그 앤 드롭과 부드러운 애니메이션 효과로 사용자 경험을 향상시켰습니다.
- 코드의 모듈화와 관심사의 분리를 통해 유지보수성과 확장성을 극대화했습니다.

## ⚙️ 기술 스택

- **프로젝트** : Next.js, TypeScript
- **스타일링** : Tailwind CSS
- **상태 관리** : Zustand
- **기타 라이브러리** : dnd-kit, framer-motion

## ❓ 사용 이유

- dnd-kit : [npm trends - 드래그 라이브러리 비교](https://npmtrends.com/@dnd-kit/core-vs-react-beautiful-dnd-vs-react-dnd-vs-react-draggable)
- framer-motion : 보드와 할 일을 추가할 때 부드러운 모션을 제공하여 사용성을 높였습니다.
- Zustand : persist 미들웨어를 활용하여 store의 상태를 자동으로 localStorage와 동기화합니다. 상태 변화가 자동으로 컴포넌트에 반영되어 유용합니다.

## 📂 폴더 구조

프로젝트는 역할별로 아래와 같이 구성되어 있습니다.

```
kanban/
├─ app/
│  ├─ components/
│  │  ├─ Board.tsx             // 한 개의 보드를 보여줍니다 (보드 제목, 태스크 목록 등)
│  │  ├─ BoardList.tsx         // 전체 보드 목록을 보여주며, 보드 추가와 드래그 앤 드롭 기능을 포함합니다
│  │  ├─ Header.tsx            // 상단 헤더: 로고, 제목, 다크모드 토글 버튼 등이 있습니다
│  │  ├─ TaskCard.tsx          // 개별 태스크(할 일)를 보여줍니다
│  │  └─ ToggleSwitch.tsx      // 다크모드를 전환할 토글 스위치 컴포넌트
│  ├─ layout.tsx               // 전체 앱의 기본 레이아웃 (HTML 기본 구조, favicon, 다크모드 적용 등)
│  └─ page.tsx                 // 메인 페이지: Header와 BoardList가 포함되어 있습니다
├─ hooks/
│  ├─ useDragAndDropHandlers.ts  // 드래그 앤 드롭 관련 기능을 처리하는 커스텀 훅 (드래그 시작/종료, 위치 계산 등)
│  └─ useEditableTask.ts       // 태스크 편집, 삭제, 즐겨찾기 토글 등의 기능을 처리하는 커스텀 훅
├─ stores/
│  ├─ useBoardStore.ts        // 보드의 생성, 수정, 삭제 등 상태를 관리합니다
│  └─ useTaskStore.ts         // 각 보드별 태스크 목록과 업데이트 상태를 관리합니다
├─ types/
│  ├─ index.ts                // 컴포넌트의 props, 인터페이스 등 기타 타입 정의
│  └─ store.ts                // 보드, 태스크 등 스토어에서 사용하는 타입들을 정의합니다
├─ utils/
│  ├─ eventUtils.ts           // 공통 이벤트 함수 (예: 이벤트 전파 중단 함수)
│  ├─ iconUtils.ts            // 보드 타입에 따라 올바른 아이콘을 반환하는 함수
│  └─ getBoardBackground.ts   // 보드 타입에 따른 배경색을 반환하는 함수
├─ styles/
│  └─ globals.css             // 전역 스타일 및 Tailwind CSS 설정, 다크모드 관련 변수 등이 있습니다
└─ package.json               // 프로젝트 의존성 및 스크립트 관리
```

## 📥 설치 및 실행

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

## 💻 주요 기능

### 1. 보드 관리

- **_보드 생성_** : 보드 추가하기 버튼을 클릭하여 새로운 보드를 생성할 수 있습니다.
- **_보드 수정_** : 보드 상단의 제목 입력란을 통해 제목을 수정할 수 있습니다.
- **_보드 삭제_** : 특정 보드에서 삭제 버튼(x 아이콘)을 클릭하여 해당 보드를 삭제할 수 있습니다.
- **_드래그 앤 드롭_** : 보드를 드래그하여 다른 보드와 순서를 변경할 수 있습니다.

<p align="center">
  <img src="/public/img/Browser/1.png" alt="주요 기능1" width="45%" />
  <img src="/public/img/Browser/2.png" alt="주요 기능2" width="45%" />
</p>
<p align="center">
  <img src="/public/img/Browser/3.png" alt="주요 기능3" width="45%" />
</p>

### 2. 일정 관리

- **_일정 생성_** : 보드 내 할 일 추가 버튼을 클릭하여 일정을 추가할 수 있습니다.
- **_일정 수정_** : 일정 내에서 수정 버튼(연필 아이콘)을 클릭하여 텍스트를 수정할 수 있습니다. 취소 버튼(x 아이콘)을 클릭하여 수정사항을 취소할 수 있습니다.
- **_일정 삭제_** : 일정 내에서 삭제 버튼(휴지통 아이콘)을 클릭하여 일정을 삭제할 수 있습니다.
- **_즐겨찾기_** : 즐겨찾기 버튼(별 아이콘)을 클릭하여 보드 내 상단에 위치시킬 수 있습니다.
- **_드래그 앤 드롭_** : 일정을 드래그하여 같은 보드 내에서 순서를 변경하거나, 다른 보드로 이동할 수 있습니다.

<p align="center">
  <img src="/public/img/Browser/4.png" alt="주요 기능4" width="45%" />
  <img src="/public/img/Browser/5.png" alt="주요 기능5" width="45%" />
</p>

<p align="center">
  <img src="/public/img/Browser/6.png" alt="주요 기능6" width="45%" />
</p>
  
### 3. 다크 모드

- 페이지 우측 상단 토글 스위치를 통해 라이트 모드와 다크 모드를 전환할 수 있습니다.

<p align="center">
  <img src="/public/img/Browser/7.png" alt="주요 기능7" width="45%" />
</p>
