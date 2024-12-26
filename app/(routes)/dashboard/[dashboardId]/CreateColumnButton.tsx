export default function CreateColumnButton() {
  return (
    <div className="flex h-[70px] w-[384px] items-center gap-3 rounded-md border px-24">
      <p className="text-nowrap text-2lg font-bold">새로운 컬럼 추가하기</p>
      <p className="flex h-6 w-6 items-center justify-center rounded-md bg-violet-100 text-xl font-bold text-violet-600">
        +
      </p>
    </div>
  );
}
