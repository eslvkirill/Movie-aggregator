package edu.sstu.platform.repo;

import static edu.sstu.platform.model.Movie_.ENG_TITLE;
import static edu.sstu.platform.model.Movie_.RUS_TITLE;
import static edu.sstu.platform.model.User_.EMAIL;
import static edu.sstu.platform.repo.SearchRepo.SearchCriteria.MOVIE;

import edu.sstu.platform.model.Movie;
import edu.sstu.platform.model.User;
import edu.sstu.platform.model.projection.MovieSearchResultMapping;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.function.Function;
import java.util.stream.Collectors;
import javax.persistence.EntityManagerFactory;
import lombok.SneakyThrows;
import org.hibernate.search.engine.search.common.BooleanOperator;
import org.hibernate.search.engine.search.sort.dsl.SearchSortFactory;
import org.hibernate.search.mapper.orm.Search;
import org.hibernate.search.mapper.orm.session.SearchSession;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Repository;

@Repository
public class SearchRepo {

  private static final int HITS_COUNT = 3;

  private final SearchSession searchSession;
  private final MovieRepo movieRepo;

  public SearchRepo(EntityManagerFactory entityManagerFactory, MovieRepo movieRepo) {
    this.searchSession = Search.session(entityManagerFactory.createEntityManager());
    this.movieRepo = movieRepo;
  }

  @SneakyThrows
  @EventListener(ContextRefreshedEvent.class)
  public void buildIndexes() {
    searchSession.massIndexer().startAndWait();
  }

  public Map<SearchCriteria, List<?>> search(String query) {
    return Map.of(MOVIE, searchMovies(query));
  }

  private List<MovieSearchResultMapping> searchMovies(String query) {
    var movieIds =  searchSession.search(Movie.class)
        .select(f -> f.id(UUID.class))
        .where(f -> f.simpleQueryString()
            .fields(ENG_TITLE, RUS_TITLE)
            .matching(query)
            .defaultOperator(BooleanOperator.AND))
        .sort(SearchSortFactory::score)
        .fetchHits(HITS_COUNT);

    var searchResultById = movieRepo.findSearchResultMappingsByIdIn(movieIds)
        .stream()
        .collect(Collectors.toMap(MovieSearchResultMapping::getId, Function.identity()));

    return movieIds.stream()
        .map(searchResultById::get)
        .collect(Collectors.toList());
  }

  public List<User> searchUsers(String query) {
    return searchSession.search(User.class)
        .where(f -> f.simpleQueryString()
            .field(EMAIL)
            .matching(query))
        .sort(SearchSortFactory::score)
        .fetchAllHits();
  }

  public enum SearchCriteria {

    MOVIE
  }
}
