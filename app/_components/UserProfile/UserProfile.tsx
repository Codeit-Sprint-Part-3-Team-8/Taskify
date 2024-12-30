import * as Avatar from '@radix-ui/react-avatar';

interface UserProfileProps {
  profileImageUrl?: string | null;
  onlyImg?: boolean;
  nickname: string;
}

export default function UserProfile({
  profileImageUrl,
  onlyImg,
  nickname,
}: UserProfileProps) {
  return (
    <div className="flex items-center">
      <Avatar.Root className="inline-flex select-none items-center justify-center overflow-hidden rounded-full bg-gray-200 align-middle">
        <Avatar.Image
          className="h-[1.625rem] w-[1.625rem] object-cover tablet:h-[2.375rem] tablet:w-[2.375rem]"
          src={profileImageUrl || ''}
          alt={nickname}
        />
        <Avatar.Fallback className="flex h-[1.625rem] w-[1.625rem] items-center justify-center bg-gray-200 font-semibold text-gray-600 tablet:h-[2.375rem] tablet:w-[2.375rem]">
          {nickname[0]}
        </Avatar.Fallback>
      </Avatar.Root>
      {!onlyImg && <span className="ml-2 text-sm font-medium">{nickname}</span>}
    </div>
  );
}
