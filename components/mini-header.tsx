interface MiniHeaderProps {
  heading: string;
  text?: string;
  children?: React.ReactNode;
}

export function MiniHeader({
  heading,
  text,
  children,
}: MiniHeaderProps) {
  return (
    <div className="flex items-center justify-between px-2">
      <div className="grid gap-1">
        <h2 className="font-heading text-xl md:text-2xl">{heading}</h2> {/* Reduced size */}
        {text && <p className="text-sm text-muted-foreground">{text}</p>} {/* Reduced size */}
      </div>
      {children}
    </div>
  );
}
