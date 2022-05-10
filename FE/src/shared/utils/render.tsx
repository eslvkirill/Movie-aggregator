import { Link } from 'react-router-dom';

// TODO: <a><a></a></a> Могут быть вложенные ссылки (стартовая страница + переход на рижиссёера на обороте карточки)
const renderPersons = (persons: [{ id: string, name: string }]) => 
  persons.map((person: any) => (
    <span key={person.name} className="directors">
      <Link to={`/person/${person.id}`}>
        {person.name}
      </Link>
      {!(persons[persons.length - 1] === person) && (<span>,&nbsp;</span>)}
    </span>
  ));


export { renderPersons }