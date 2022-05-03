import './ContentLayout.scss';

const ContentLayout = ({ children }: any) => (
  <div className="Layout">
    <div className="Content">{children}</div>
  </div>
);

export default ContentLayout;
