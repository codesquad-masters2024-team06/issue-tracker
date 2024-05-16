package issuetracker.be.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class IssueGetResponseDto {

  private List<IssueShowDto> close_Issues;
  private List<IssueShowDto> open_Issues;

  public IssueGetResponseDto(List<IssueShowDto> closeIssues, List<IssueShowDto> openIssues) {
    this.close_Issues = closeIssues;
    this.open_Issues = openIssues;

  }
}
