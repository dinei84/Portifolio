interface TechBadgeProps {
  name: string;
}

export function TechBadge({ name }: TechBadgeProps) {
  return (
    <span className="bg-pixel-secondary text-white px-2 py-1 text-xs font-mono">
      {name}
    </span>
  );
}
