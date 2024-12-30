import DotLoader from './DotLoader';

export default function KanbanLoading() {
  return (
    <div className="flex h-full flex-col items-center justify-center">
      <DotLoader />
      <p className="mt-4 text-md font-bold text-gray-500 tablet:text-lg pc:text-xl">
        대쉬보드를 불러오는 중입니다...
      </p>
    </div>
  );
}
