import { useEffect } from 'react';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { getUserDataCreator, setUserSearchCreator, updateUserRoleCreator } from 'redux/creators/userRoleCreator';
import { onChange, onChangeRole, reset } from 'redux/reducers/userRoleReducer';
import { USER_OPERATIONS, USER_ROLES } from 'shared/constants/common';
import Input from 'components/shared/form-controls/Input/Input';
import './UserRole.scss';

const UserRole = () => {
  const dispatch = useAppDispatch();
  const { users, value, userInfo, isLoading, error } = useAppSelector(state => state.userRoleReducer);
  const { user } = useAppSelector(state => state.authReducer);
  let clickedUserId: string;

  useEffect(() => {
    dispatch(reset());
  }, [])

  // TODO: Добавить Debounce
  const onChangeHandler = (event: any) => {
    dispatch(onChange(event.target.value))

    if (event.target.value.length > 1) {
      dispatch(setUserSearchCreator());
    } else if (!event.target.value) {
      dispatch(reset());
    }
  }

  const onClickHandler = (userId: string) => {
    dispatch(getUserDataCreator(userId));
  }

  const onChangeRoleHandler = (event: any, data: any) => {
    dispatch(onChangeRole({ checked: event.target.checked, role: data.body.role }))
    dispatch(updateUserRoleCreator(data));
  }

  const renderUsers = () =>
    !!users.length && users.map((user: any) => {
      clickedUserId = user.id;

      return (
        <div 
          key={user.id} 
          onClick={() => onClickHandler(user.id)}
          className="user" 
        >
          <div className="user__email">
            {user.email}
          </div>
        </div>
      );
    });

  const renderUserInfo = () => {
    const isUserFound = !!Object.keys(userInfo).length;

    const roles = Object.values(USER_ROLES).map(role => {
      const isChecked = isUserFound && userInfo.roles.includes(role);
      const checkUser = role === USER_ROLES.USER || (role === USER_ROLES.ADMIN && user.username === userInfo.username)

      const data = {
        userId: userInfo.id,
        body: {
          operation: isChecked ? USER_OPERATIONS.REVOKE : USER_OPERATIONS.GRANT,
          role
        }
      }

      return (
        <div key={role} className="role">
          <label htmlFor={role}>{role}</label>
          <input 
            type="checkbox" 
            id={role} 
            value={role} 
            style={{cursor: checkUser ? 'not-allowed' : 'pointer'}}
            disabled={checkUser}
            onChange={(event) => onChangeRoleHandler(event, data)}
            checked={isChecked} 
          />
        </div>
      );
    })

    return isUserFound && (
      <div 
        key={userInfo.id} 
        className="user-info" 
      >
        <div className="info-block">
          <div className="user__name">
            {userInfo.firstName} {userInfo.lastName}
          </div>
          <div className="user__username">
            Имя пользователя: {userInfo.username}
          </div>
          <div className="user__email">
            Email адрес: {userInfo.email}
          </div>
        </div>
        <div className="user__roles">
          {roles}
        </div>
      </div>
    );
  }

  return (
    <div className="search-wrapper">
      <div className="search-caption">Введите Email пользователя, роль которого хотите изменить:</div>
      <div className="search">
        <Input 
          type="search__input" 
          value={value}
          onKeyDown={(event) => event.key === 'Enter' && clickedUserId && onClickHandler(clickedUserId)}
          onChange={(event) => onChangeHandler(event)} 
        />
        <div className="search__btn" onClick={() => clickedUserId && onClickHandler(clickedUserId)}>
          <FontAwesomeIcon icon={faSearch} title="Поиск" />
        </div>
      </div>
      <div className="render-result">
        {renderUsers()}
      </div>
      <div className="render-info">
        {renderUserInfo()}
      </div>
    </div>
  );
}

export default UserRole;