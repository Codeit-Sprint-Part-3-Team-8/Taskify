import Image from 'next/image';

interface ProfileProps {
  profileImageUrl: string | undefined;
  nickname: string | undefined;
}

export default function Profile({ profileImageUrl, nickname }: ProfileProps) {
  return (
    <div className="flex items-center rounded-full p-1 tablet:gap-1 pc:gap-3">
      <div className="relative h-8 w-8 overflow-hidden rounded-full">
        <Image
          fill
          src={profileImageUrl || '/images/contents/default-profile.svg'}
          alt={nickname || '사용자'}
          className="object-cover"
        />
      </div>
      <div className="hidden font-pretendard text-lg font-medium text-black-333236 tablet:block">
        {nickname || '사용자'}
      </div>
    </div>
  );
}
