//
type FilterBoxProps = {
  title: string;
  children: React.ReactNode;
};

export default function FilterBox({ title, children }: FilterBoxProps) {
  return (
    <div className='container filterContainer'>
      <h4 className='filterTitle'>{title}</h4>
      <p className='filterText'>{children}</p>
    </div>
  );
}
