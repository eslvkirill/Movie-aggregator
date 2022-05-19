import MaterialUIBackdrop from '@material-ui/core/Backdrop';
import { makeStyles } from '@material-ui/core/styles';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { closeModal } from 'redux/reducers/backdropReducer';

const useStyles = makeStyles(() => ({
  backdrop: {
    background: 'linear-gradient(200deg, #280138e3, #382201fa)',
    display: 'flex',
    zIndex: 5,
  },
}));

const Backdrop = ({ children }: any) => {
  const dispatch = useAppDispatch();
  const { isModalOpen } = useAppSelector(state => state.backdropReducer);
  const classes = useStyles();

  return (
    <div className="backdrop-wrapper">
      <MaterialUIBackdrop
        open={isModalOpen}
        onClick={() => dispatch(closeModal())}
        className={`${classes.backdrop}`}
      >
        <div 
          className="backdrop-content"
          onClick={(event) => isModalOpen && event.stopPropagation()}
        >
          {children}
        </div>
      </MaterialUIBackdrop>
    </div>
  );
};

export default Backdrop;
