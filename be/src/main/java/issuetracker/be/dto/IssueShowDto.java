package issuetracker.be.dto;

import issuetracker.be.domain.Issue;
import issuetracker.be.domain.Label;
import issuetracker.be.domain.User;
import issuetracker.be.utils.TimeLapseCalculator;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class IssueShowDto {

  private Long id;
  private String title;
  private String create_At;
  private User reporter;
  private Label label;
  private MilestoneWithIssueCountDto milestone;

  public IssueShowDto(Issue issue, Label label, MilestoneWithIssueCountDto milestone, User reporter) {
    this.id = issue.getId();
    this.title = issue.getTitle();
    this.create_At = TimeLapseCalculator.between(issue.getCreated_at(), LocalDateTime.now());
    this.label = label;
    this.reporter = reporter;
    this.milestone = milestone;
  }
}
