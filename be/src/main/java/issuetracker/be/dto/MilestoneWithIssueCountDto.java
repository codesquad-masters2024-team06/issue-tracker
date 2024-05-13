package issuetracker.be.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import java.util.Date;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;

@Getter
@Setter
public class MilestoneWithIssueCountDto {

  @Id
  private long id;
  private String name;
  private String description;
  private Date end_date;
  @JsonProperty("is_open")
  private boolean is_open;
  private int open_issue;
  private int close_issue;
}
