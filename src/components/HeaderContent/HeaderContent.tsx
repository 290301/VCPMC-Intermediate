type HeaderContentProps = {
      title: string;
};
export const HeaderContent = ({ title }: HeaderContentProps) => {
      return (
            <h2 style={{ fontWeight: '700', fontSize: '28px', color: '#f5f5ff', margin: '2px 0px 2px 0px' }}>
                  {title}
            </h2>
      );
};
