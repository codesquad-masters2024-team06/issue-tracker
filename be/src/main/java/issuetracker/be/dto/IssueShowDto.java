package issuetracker.be.dto;

import issuetracker.be.domain.Issue;
import issuetracker.be.domain.Label;
import issuetracker.be.domain.User;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class IssueShowDto {

  private Long id;
  private String title;
  private LocalDateTime createAt;
  private User reporter;
  private Label label;
  private MilestoneWithIssueCountDto milestone;

  public IssueShowDto(Issue issue, Label label, MilestoneWithIssueCountDto milestone,
      User reporter) {
    this.id = issue.getId();
    this.title = issue.getTitle();
    this.createAt = issue.getCreatedAt();
    this.label = label;
    this.reporter = reporter;
    this.milestone = milestone;
  }
}
