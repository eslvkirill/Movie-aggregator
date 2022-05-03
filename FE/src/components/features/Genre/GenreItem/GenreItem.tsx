import { CSSTransition } from 'react-transition-group';
import Button from 'components/shared/form-controls/Button/Button';
import Input from 'components/shared/form-controls/Input/Input';
import { Genre, GenresProperties } from '../genre.interface';
import './GenreItem.scss';

const GenreItem = (props: GenresProperties) => {
  const { dropdown, genres, updateGenre, saveAction, editAction, disabled, deleteGenre } = props;

  return (
    <CSSTransition 
      in={dropdown}
      appear
      exit
      unmountOnExit
      classNames="fade"
      timeout={{
        enter: 300,
        exit: 200,
      }}
    >
      <ul className="genre-item">
        {genres.map((genre: Genre, index: number) => {
          return (
            <li key={genre.id}>
              <Input
                id={genre.id}
                value={genre.name}
                onChange={(event) => updateGenre(event, genre.id)}
                disabled={!genre.open}
                // autocomplete="off"
              />
              <Button
                id={genre.id}
                onClick={() => genre.open ? saveAction(genre.id) : editAction(genre.id)}
                disabled={disabled}
              >
                {genre.open ? 'Сохранить' : 'Редактировать'}
              </Button>
              <button type="submit" onClick={() => deleteGenre(genre.id)}>
                &times;
              </button>
            </li>
          );
        })}
      </ul>
    </CSSTransition>
  )
};

export default GenreItem;