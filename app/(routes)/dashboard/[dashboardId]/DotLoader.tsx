export default function DotLoader() {
  return (
    <div className="flex items-center gap-3">
      <span className="animate-dot-bounce h-4 w-4 rounded-full bg-purple-300 delay-[0ms] tablet:h-5 tablet:w-5 pc:h-6 pc:w-6"></span>
      <span className="animate-dot-bounce h-4 w-4 rounded-full bg-purple-400 delay-[300ms] tablet:h-5 tablet:w-5 pc:h-6 pc:w-6"></span>
      <span className="animate-dot-bounce h-4 w-4 rounded-full bg-purple-500 delay-[600ms] tablet:h-5 tablet:w-5 pc:h-6 pc:w-6"></span>
    </div>
  );
}
