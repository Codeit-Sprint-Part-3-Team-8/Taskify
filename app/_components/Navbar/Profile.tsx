import Image from 'next/image';

interface ProfileProps {
  profileImageUrl: string | undefined;
  nickname: string | undefined;
}

export default function Profile({ profileImageUrl, nickname }: ProfileProps) {
  return (
    <div className="flex items-center rounded-full p-1 tablet:gap-1 pc:gap-3">
      <Image
        width={32}
        height={32}
        src={profileImageUrl || '/images/contents/default-profile.svg'}
        alt={nickname || '사용자'}
        className="rounded-full"
      />
      <div className="hidden font-pretendard text-lg font-medium text-black-333236 tablet:block">
        {nickname || '사용자'}
      </div>
    </div>
  );
}
