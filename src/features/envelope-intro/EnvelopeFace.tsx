/**
 * El "dorso" del sobre cerrado: 4 solapas triangulares (arriba, derecha,
 * abajo, izquierda) que se encuentran en el centro — el patrón clásico de
 * un sobre visto desde atrás — con sombreado sutil por solapa (simula luz
 * viniendo de arriba) y líneas doradas marcando cada pliegue.
 */
export function EnvelopeFace() {
  const flapPaths = {
    top: 'polygon(0 0, 100% 0, 50% 50%)',
    right: 'polygon(100% 0, 100% 100%, 50% 50%)',
    bottom: 'polygon(100% 100%, 0 100%, 50% 50%)',
    left: 'polygon(0 100%, 0 0, 50% 50%)',
  }

  return (
    <div className="absolute inset-0">
      <div
        className="absolute inset-0 bg-[color-mix(in_srgb,var(--color-guinda)_82%,white)]"
        style={{ clipPath: flapPaths.top }}
      />
      <div
        className="bg-guinda absolute inset-0"
        style={{ clipPath: flapPaths.right }}
      />
      <div
        className="absolute inset-0 bg-[color-mix(in_srgb,var(--color-guinda)_78%,black)]"
        style={{ clipPath: flapPaths.bottom }}
      />
      <div
        className="bg-guinda-oscuro absolute inset-0"
        style={{ clipPath: flapPaths.left }}
      />

      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        {(
          [
            [0, 0],
            [100, 0],
            [100, 100],
            [0, 100],
          ] as const
        ).map(([x, y]) => (
          <line
            key={`${x}-${y}`}
            x1={x}
            y1={y}
            x2={50}
            y2={50}
            stroke="var(--color-oro)"
            strokeWidth={1.25}
            strokeOpacity={0.6}
            vectorEffect="non-scaling-stroke"
          />
        ))}
      </svg>
    </div>
  )
}
