package issuetracker.be.dto;

import java.util.Date;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MilestoneWithIssueCountResponse {

  private long id;
  private String name;
  private String description;
  private Date end_date;
  private Boolean is_open;
  private int open_issue;
  private int close_issue;
}
