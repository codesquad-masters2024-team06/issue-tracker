package issuetracker.be.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class IssueGetResponseDto {

  private List<IssueShowDto> closeIssues;
  private List<IssueShowDto> openIssues;

  public IssueGetResponseDto(List<IssueShowDto> closeIssues, List<IssueShowDto> openIssues) {
    this.closeIssues = closeIssues;
    this.openIssues = openIssues;

  }
}
