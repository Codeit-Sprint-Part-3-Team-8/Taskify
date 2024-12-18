export default function Modal({
  text,
  onClick,
}: {
  text: string;
  onClick: () => void;
}) {
  return (
    <div className="fixed z-20 flex h-full w-full items-center justify-center bg-black-171717/80">
      <div className="flex h-48 min-w-80 flex-col items-center justify-center gap-8 rounded-2xl bg-white px-16 py-10">
        <div className="text-xl font-medium text-black-333236">{text}</div>
        <button
          className="w-full rounded-lg bg-violet-5534DA py-3 font-semibold text-white hover:bg-violet-700 active:bg-violet-800"
          onClick={onClick}
        >
          확인
        </button>
      </div>
    </div>
  );
}
