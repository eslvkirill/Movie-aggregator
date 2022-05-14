import { Link } from 'react-router-dom';
import { getPersonCreator } from 'redux/creators/personCreator';
import { useAppDispatch } from '../../hooks/redux';

// TODO: <a><a></a></a> Могут быть вложенные ссылки (стартовая страница + переход на рижиссёера на обороте карточки)
// TODO: personId - костыль. если не обновлять страницу - режиссер не меняется вместо актера, если на режиссера нажать на странице актера. С personId - все ок, но кнопка назад в браузере не работает, так как перезагрузки нет, а роут меняется
const renderPersons = (persons: [{ id: string, name: string }], personId?: string) =>  {
  const dispatch = useAppDispatch();

  return persons.map((person: any) => (
    <span key={person.name} className="directors">
      <Link to={`/person/${person.id}`} onClick={() => (personId && personId !== person.id) && dispatch(getPersonCreator(person.id))}>
        {person.name}
      </Link>
      {!(persons[persons.length - 1] === person) && (<span>,&nbsp;</span>)}
    </span>
  ));
};

export { renderPersons }