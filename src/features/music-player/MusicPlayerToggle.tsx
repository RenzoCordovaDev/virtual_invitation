import { useRef, useState } from 'react'
import { music } from '../../content/music'

export function MusicPlayerToggle() {
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

  return (
    <>
      <audio ref={audioRef} src={music.audioSrc} loop />
      <button
        type="button"
        onClick={toggle}
        aria-label={isPlaying ? `Pausar "${music.title}"` : `Reproducir "${music.title}"`}
        aria-pressed={isPlaying}
        className="bg-guinda text-marfil fixed right-4 bottom-4 z-10 flex h-12 w-12 items-center justify-center rounded-full shadow-lg"
      >
        {isPlaying ? '❚❚' : '♪'}
      </button>
    </>
  )
}
