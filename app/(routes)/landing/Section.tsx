export default function Section({
  children,
  fromColorClass,
  flexDirection,
  ref,
}: {
  children: React.ReactNode;
  fromColorClass: string;
  flexDirection?: string;
  ref: React.LegacyRef<HTMLDivElement>;
}) {
  return (
    <div
      ref={ref}
      className={`bg-gradient-to-b ${fromColorClass} flex ${flexDirection} h-screen snap-start items-center justify-center`}
    >
      {children}
    </div>
  );
}
