package issuetracker.be.domain;

import java.util.Date;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;

@Getter
@Setter
public class Milestone {

  @Id
  private long id;
  private String name;
  private String description;
  private Date end_date;
  private boolean is_open;
}
