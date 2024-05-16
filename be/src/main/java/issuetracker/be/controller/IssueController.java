package issuetracker.be.controller;

import issuetracker.be.dto.IssueSaveRequestDto;
import issuetracker.be.service.IssueService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class IssueController {

  private IssueService issueService;

  @Autowired
  public IssueController(IssueService issueService) {
    this.issueService = issueService;
  }

  @PostMapping("/issue")
  public ResponseEntity<?> saveIssue(@RequestBody IssueSaveRequestDto issueSaveRequestDto) {
    issueService.save(issueSaveRequestDto);
  }

  @ResponseStatus(HttpStatus.OK)
  @GetMapping("/issue")
  public IssueGetResponseDto findAllIssue() {
    IssueGetResponseDto result = issueService.getAllIssue();
    return result;
  }
}
