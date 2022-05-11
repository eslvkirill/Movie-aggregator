import MaterialUIBackdrop from '@material-ui/core/Backdrop';
import { makeStyles } from '@material-ui/core/styles';
import './Backdrop.scss';

const useStyles = makeStyles(() => ({
  backdrop: {
    background: 'linear-gradient(200deg, #280138e3, #382201fa)',
    position: 'fixed',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    display: 'flex',
    justifyContent: 'flex-end',
    zIndex: 1000,
  },
}));

const Backdrop = ({ children }: any) => {
  const { isOpenModal } = children.props;
  const classes = useStyles();

  return (
    <div className="backdrop-wrapper">
      <MaterialUIBackdrop
        open={isOpenModal}
        className={`${classes.backdrop}`}
      >
        {children}
      </MaterialUIBackdrop>
    </div>
  );
};

export default Backdrop;
