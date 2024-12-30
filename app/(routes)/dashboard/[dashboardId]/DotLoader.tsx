export default function DotLoader() {
  return (
    <div className="flex items-center gap-3">
      <span className="h-4 w-4 animate-dot-bounce rounded-full bg-purple-300 delay-0 tablet:h-5 tablet:w-5 pc:h-6 pc:w-6"></span>
      <span className="h-4 w-4 animate-dot-bounce rounded-full bg-purple-400 delay-150 tablet:h-5 tablet:w-5 pc:h-6 pc:w-6"></span>
      <span className="h-4 w-4 animate-dot-bounce rounded-full bg-purple-500 delay-300 tablet:h-5 tablet:w-5 pc:h-6 pc:w-6"></span>
    </div>
  );
}
