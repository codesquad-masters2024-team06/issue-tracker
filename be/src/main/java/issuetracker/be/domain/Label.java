package issuetracker.be.domain;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Column;

@Getter
@Setter
public class Label {

  @Id
  private String name;
  private String background_color;
  private String text_color;
  private String description;
}
