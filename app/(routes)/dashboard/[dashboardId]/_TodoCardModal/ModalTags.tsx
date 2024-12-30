interface ModalTags {
  columnTitle: string;
  tags: string[] | undefined;
}

export default function ModalTags({ columnTitle, tags }: ModalTags) {
  return (
    <div className="mb-4 flex flex-wrap items-center gap-2">
      <div className="flex h-[26px] max-w-40 items-center gap-1 rounded-full bg-violet-8 pr-2">
        <span className="ml-[6px] text-3xl text-violet-5534DA">•</span>
        <span className="mt-1 truncate whitespace-nowrap text-xs text-violet-5534DA">
          {columnTitle}
        </span>
      </div>
      {tags &&
        tags.map((tag) => (
          <span
            key={tag}
            className="h-[26px] max-w-20 truncate whitespace-nowrap rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-600"
          >
            {tag}
          </span>
        ))}
    </div>
  );
}
