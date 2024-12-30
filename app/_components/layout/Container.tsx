interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

export default function Container({ children, className }: ContainerProps) {
  return (
    <div className="min-h-[100vh] min-w-[100vw] bg-gray-F5F5F5 pl-16 pt-[3.75rem] tablet:pl-40 tablet:pt-[4.375rem] pc:pl-72">
      <div className={className}>{children}</div>
    </div>
  );
}
