type HeaderContentProps = {
      title: string;
};
export const HeaderContent = ({ title }: HeaderContentProps) => {
      return <h2 style={{ fontWeight: '700', fontSize: '36px', color: '#f5f5ff', margin: '10px 0px' }}>{title}</h2>;
};
