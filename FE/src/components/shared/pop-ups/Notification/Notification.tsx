// import classes from "./Notification.module.scss";
import { Transition } from 'react-transition-group';
import './Notification.scss';

const Notification = (props: any) => {
  const { showBlock, rusTitle } = props;
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     toggle: true,
  //   };
  // }

  // render() {
  return (
    <>
      {/* <button onClick={() => this.setState({ toggle: !this.state.toggle })}>
          Toggle
        </button> */}

      <Transition
        in={showBlock}
        timeout={{ enter: 2500, exit: 1700 }}
        mountOnEnter
        unmountOnExit
      >
        {(state) => (
          <div className={`notification ${state}`}>
            <h1>Успешно</h1>
            <div>
              Фильм <span>&quot;{rusTitle}&quot;</span> добавлен
            </div>
          </div>
        )}
      </Transition>
    </>
  );
  // }
};

export default Notification;
