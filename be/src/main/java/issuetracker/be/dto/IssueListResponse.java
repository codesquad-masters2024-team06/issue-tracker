package issuetracker.be.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class IssueListResponse {

  private List<IssueShowResponse> close_Issues;
  private List<IssueShowResponse> open_Issues;

  public IssueListResponse(List<IssueShowResponse> closeIssues, List<IssueShowResponse> openIssues) {
    this.close_Issues = closeIssues;
    this.open_Issues = openIssues;

  }
}
