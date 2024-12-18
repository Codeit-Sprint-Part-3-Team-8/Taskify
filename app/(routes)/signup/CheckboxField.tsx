import Image from 'next/image';

interface CheckboxFieldProps {
  isChecked: boolean;
  onChange: () => void;
}

export default function CheckboxField({
  isChecked,
  onChange,
}: CheckboxFieldProps) {
  return (
    <fieldset className="flex items-center gap-2">
      <input
        className="hidden"
        type="checkbox"
        id="terms-of-use"
        checked={isChecked}
        onChange={onChange}
      />
      <label
        className="relative h-5 w-5 cursor-pointer select-none"
        htmlFor="terms-of-use"
      >
        <Image
          fill
          src={
            isChecked
              ? '/images/icon/icon-checkbox-active.png'
              : '/images/icon/icon-checkbox-default.png'
          }
          alt="이용약관"
        />
        <div className="absolute z-10 h-full w-full rounded bg-black-171717 opacity-0 hover:opacity-20 active:opacity-40" />
      </label>
      <label
        className="cursor-pointer select-none text-black-333236"
        htmlFor="terms-of-use"
      >
        이용약관에 동의합니다.
      </label>
    </fieldset>
  );
}
