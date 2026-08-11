/**
 * Música de fondo — informacion_base.md indica la canción ("Wonderwall")
 * pero todavía no hay un archivo de audio real. Mientras audioSrc sea null,
 * MusicPlayerToggle no renderiza nada. Cuando el usuario provea el archivo
 * (ej. en public/audio/), completar acá sin tocar el componente.
 */
export const music = {
  title: 'Wonderwall',
  audioSrc: null as string | null,
} as const
