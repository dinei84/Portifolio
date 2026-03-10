interface SkillBarProps {
  name: string;
  level: number; // 0–100
}

export function SkillBar({ name, level }: SkillBarProps) {
  const clampedLevel = Math.min(100, Math.max(0, level));

  return (
    <div className="pixel-card text-center">
      <div className="font-pixel text-pixel-primary mb-2 text-sm">{name}</div>
      <div className="w-full bg-gray-200 h-4 mb-2">
        <div
          role="progressbar"
          aria-valuenow={clampedLevel}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`${name}: ${clampedLevel}%`}
          className="bg-pixel-primary h-4 transition-all duration-700"
          style={{ width: `${clampedLevel}%` }}
        />
      </div>
    </div>
  );
}
