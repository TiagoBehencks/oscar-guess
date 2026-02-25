'use client'

import { CATEGORIES } from '@/constants/categories'
import { useOscarGame } from '@/hooks/useOscarGame'
import { AppHeader } from '@/components/shared/AppHeader'
import { ProgressBar } from '@/components/shared/ProgressBar'
import { GameView } from '@/components/game/GameView'
import { SummaryView } from '@/components/summary/SummaryView'

export default function Home() {
  const game = useOscarGame(CATEGORIES)

  return (
    <div className="min-h-screen flex flex-col bg-ink text-cream">
      <AppHeader
        totalSelected={game.totalSelected}
        totalCategories={CATEGORIES.length}
        isComplete={game.isComplete}
        onLogoClick={() => game.setView('game')}
      />
      <ProgressBar value={game.totalSelected / CATEGORIES.length} />

      {game.view === 'game' && (
        <GameView
          category={game.category}
          selectedNomineeId={game.selectedNomineeId}
          onSelect={game.select}
          categories={CATEGORIES}
          selections={game.selections}
          current={game.current}
          isFirst={game.isFirst}
          isLast={game.isLast}
          isComplete={game.isComplete}
          onPrev={game.goPrev}
          onNext={game.goNext}
          onGoToCategory={game.goToCategory}
          onViewSummary={() => game.setView('summary')}
        />
      )}

      {game.view === 'summary' && (
        <SummaryView
          categories={CATEGORIES}
          selections={game.selections}
          onBack={() => game.setView('game')}
        />
      )}
    </div>
  )
}
