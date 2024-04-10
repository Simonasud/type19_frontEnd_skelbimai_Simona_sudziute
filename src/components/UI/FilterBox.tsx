//
type FilterBoxProps = {
  title: string;
  children: React.ReactNode;
  className?: string;
};

export default function FilterBox({
  title,
  children,
  className,
}: FilterBoxProps) {
  return (
    <div className='container filterContainer'>
      <h4
        className={`filterTitleFirst ${
          className ? className : 'filterTitleSecond'
        }`}
      >
        {title}
      </h4>
      <p className='filterText'>{children}</p>
    </div>
  );
}
