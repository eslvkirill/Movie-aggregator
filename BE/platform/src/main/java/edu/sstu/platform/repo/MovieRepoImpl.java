package edu.sstu.platform.repo;

import static edu.sstu.platform.model.Movie_.ID;

import edu.sstu.platform.dto.request.MoviePageableRequestDto;
import edu.sstu.platform.model.Movie;
import edu.sstu.platform.repo.builder.OrderBuilder;
import java.util.UUID;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.domain.Specification;

@SuppressWarnings("SpringJavaAutowiredMembersInspection")
public class MovieRepoImpl implements MovieRepoCustom {

  @PersistenceContext
  private EntityManager em;

  @Autowired
  private OrderBuilder orderBuilder;

  @Override
  public Page<UUID> findAllIds(Specification<Movie> specification, MoviePageableRequestDto pageableRequest) {
    var cb = em.getCriteriaBuilder();
    var totalQuery = cb.createQuery(Long.class);
    var totalQueryRoot = totalQuery.from(Movie.class);

    totalQuery
        .select(cb.countDistinct(totalQueryRoot.get(ID)))
        .where(specification.toPredicate(totalQueryRoot, totalQuery, cb));

    var total = em.createQuery(totalQuery).getSingleResult();
    var findAllQuery = cb.createQuery(UUID.class);
    var findAllQueryRoot = findAllQuery.from(Movie.class);

    findAllQuery
        .select(findAllQueryRoot.get(ID))
        .where(specification.toPredicate(findAllQueryRoot, findAllQuery, cb))
        .groupBy(findAllQueryRoot.get(ID));

    if (pageableRequest.getSort() != null) {
      var sort = pageableRequest.getSort();
      var orderExpression = orderBuilder
          .buildOrderExpression(sort.getExpression(), cb, findAllQueryRoot);

      findAllQuery.orderBy(orderBuilder.buildOrder(orderExpression, sort.getDirection(), cb));
    }

    var movieIds = em.createQuery(findAllQuery)
        .setFirstResult(pageableRequest.getOffset())
        .setMaxResults(pageableRequest.getSize())
        .getResultList();

    return new PageImpl<>(movieIds, PageRequest.of(pageableRequest.getPage(), pageableRequest.getSize()), total);
  }
}
