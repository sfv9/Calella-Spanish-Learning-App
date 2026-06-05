# Spanish Adventure Map

A local React + TypeScript + Tailwind app for beginner kids to practice practical Spanish in short daily game sessions.

## Run locally

```bash
npm install --cache ./work/.npm-cache
npm run dev
```

The local app runs at `http://127.0.0.1:4173/`.

## Build

```bash
npm run build
```

## Project structure

```text
src/
  components/
    AdventureMap.tsx
    ConversationGame.tsx
    DailyTimer.tsx
    FlashcardGame.tsx
    LearningWorldCard.tsx
    ListeningGame.tsx
    MatchingGame.tsx
    MultipleChoiceGame.tsx
    ParentDashboard.tsx
    PointsDisplay.tsx
    ProfileSelector.tsx
    ProgressDashboard.tsx
    RestaurantRoleplayGame.tsx
  data/
    lessonContent.ts
    worlds.ts
  hooks/
    useLocalStorage.ts
  lib/
    game.ts
    storage.ts
  App.tsx
  index.css
  main.tsx
```

## What is included

- Two child profiles with separate saved progress
- 15-minute guided adventure flow
- Points, streaks, badges, levels, and unlockable worlds
- Flashcards, multiple choice, listening, matching, conversation, and restaurant role-play
- Parent dashboard with weekly minutes, mastery, and review words
- Local persistence through `localStorage`
- Seed content with 75+ beginner Spanish words and phrases
