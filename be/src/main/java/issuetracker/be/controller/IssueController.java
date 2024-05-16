package issuetracker.be.controller;

import issuetracker.be.dto.IssueGetResponseDto;
import issuetracker.be.dto.IssueSaveRequestDto;
import issuetracker.be.service.IssueService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class IssueController {

  private IssueService issueService;

  @Autowired
  public IssueController(IssueService issueService) {
    this.issueService = issueService;
  }

  @ResponseStatus(HttpStatus.CREATED)
  @PostMapping("/issue")
  public void saveIssue(@RequestBody IssueSaveRequestDto issueSaveRequestDto) {
    issueService.save(issueSaveRequestDto);
  }

  @ResponseStatus(HttpStatus.OK)
  @GetMapping("/issue")
  public IssueGetResponseDto findAllIssue() {
    IssueGetResponseDto result = issueService.getAllIssue();
    return result;
  }
}
