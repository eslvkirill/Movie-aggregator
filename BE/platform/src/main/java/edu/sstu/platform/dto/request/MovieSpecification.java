package edu.sstu.platform.dto.request;

import edu.sstu.platform.model.Movie;
import net.kaczmarzyk.spring.data.jpa.domain.GreaterThanOrEqual;
import net.kaczmarzyk.spring.data.jpa.domain.In;
import net.kaczmarzyk.spring.data.jpa.domain.LessThanOrEqual;
import net.kaczmarzyk.spring.data.jpa.web.annotation.And;
import net.kaczmarzyk.spring.data.jpa.web.annotation.Join;
import net.kaczmarzyk.spring.data.jpa.web.annotation.Spec;
import org.springframework.data.jpa.domain.Specification;

@Join(path = "genres", alias = "g", distinct = false)
@Join(path = "originCountries", alias = "c", distinct = false)
@Join(path = "actorRelations", alias = "aRel", distinct = false)
@Join(path = "aRel.person", alias = "a", distinct = false)
@Join(path = "directorRelations", alias = "dRel", distinct = false)
@Join(path = "dRel.person", alias = "d", distinct = false)
@And({
    @Spec(path = "g.id", params = "genres", paramSeparator = ',', spec = In.class),
    @Spec(path = "c", params = "countries", paramSeparator = ',', spec = In.class),
    @Spec(path = "d.id", params = "directors", paramSeparator = ',', spec = In.class),
    @Spec(path = "a.id", params = "actors", paramSeparator = ',', spec = In.class),
    @Spec(path = "year", params = "fromYear", spec = GreaterThanOrEqual.class),
    @Spec(path = "year", params = "toYear", spec = LessThanOrEqual.class),
})
public interface MovieSpecification extends Specification<Movie> {
}
