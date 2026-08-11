import { useRef, useState } from 'react'
import { music } from '../../content/music'
import { useI18n } from '../i18n'

export function MusicPlayerToggle() {
  const { t } = useI18n()
  const audioRef = useRef<HTMLAudioElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)

  if (!music.audioSrc) {
    return null
  }

  function toggle() {
    const audio = audioRef.current
    if (!audio) return

    if (isPlaying) {
      audio.pause()
    } else {
      void audio.play()
    }
    setIsPlaying(!isPlaying)
  }

  const label = isPlaying
    ? `${t.musicPlayerPausePrefix} "${music.title}"`
    : `${t.musicPlayerPlayPrefix} "${music.title}"`

  return (
    <>
      <audio ref={audioRef} src={music.audioSrc} loop />
      <button
        type="button"
        onClick={toggle}
        aria-label={label}
        aria-pressed={isPlaying}
        className="bg-guinda text-marfil fixed right-4 bottom-4 z-10 flex h-12 w-12 items-center justify-center rounded-full shadow-lg"
      >
        {isPlaying ? '❚❚' : '♪'}
      </button>
    </>
  )
}
