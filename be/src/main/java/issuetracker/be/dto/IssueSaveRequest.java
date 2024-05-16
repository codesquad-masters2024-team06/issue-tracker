package issuetracker.be.dto;

import issuetracker.be.domain.Issue;
import java.time.LocalDateTime;
import java.util.List;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class IssueSaveRequest {

  private String reporter;
  private List<String> assignee;
  private String label;
  private Long milestone_id;
  private String title;
  private String comment;

  public Issue toEntity(LocalDateTime now) {
    if (assignee == null) {
      return new Issue(title, reporter, milestone_id, now, label);
    }
    return new Issue(title, reporter, milestone_id, now, label, assignee);
  }
}
