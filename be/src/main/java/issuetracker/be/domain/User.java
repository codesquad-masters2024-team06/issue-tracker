package issuetracker.be.domain;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Table;

@Getter
@Setter
@ToString
public class User {

  @Id
  private String name;
  private String image_path;
}


