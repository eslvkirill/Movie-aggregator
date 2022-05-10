package edu.sstu.platform.config;

import edu.sstu.platform.config.type.FixedListArrayType;
import java.sql.Types;
import java.util.UUID;
import org.hibernate.dialect.PostgreSQL95Dialect;

public class CustomPostgreSQL95Dialect extends PostgreSQL95Dialect {

  public CustomPostgreSQL95Dialect() {
    registerHibernateType(Types.OTHER, UUID.class.getName());
    registerHibernateType(Types.ARRAY, FixedListArrayType.class.getName());
  }
}
