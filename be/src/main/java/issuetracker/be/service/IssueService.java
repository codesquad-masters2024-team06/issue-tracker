package issuetracker.be.service;

import issuetracker.be.domain.Issue;
import issuetracker.be.domain.Label;
import issuetracker.be.domain.User;
import issuetracker.be.dto.IssueListResponse;
import issuetracker.be.dto.IssueSaveRequest;
import issuetracker.be.dto.IssueShowResponse;
import issuetracker.be.dto.MilestoneWithIssueCountResponse;
import issuetracker.be.repository.IssueRepository;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import issuetracker.be.repository.LabelRepository;
import issuetracker.be.repository.MilestoneRepository;
import issuetracker.be.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Slf4j
@Service
public class IssueService {

  private IssueRepository issueRepository;
  private MilestoneRepository milestoneRepository;
  private LabelRepository labelRepository;
  private UserRepository userRepository;

  @Autowired
  public IssueService(IssueRepository issueRepository, MilestoneRepository milestoneRepository,
      LabelRepository labelRepository, UserRepository userRepository) {
    this.issueRepository = issueRepository;
    this.milestoneRepository = milestoneRepository;
    this.labelRepository = labelRepository;
    this.userRepository = userRepository;
  }

  public void save(IssueSaveRequest issueSaveRequest) {
    Issue issue = issueSaveRequest.toEntity(LocalDateTime.now());
    Issue save = issueRepository.save(issue);
    log.debug("저장된 이슈 : {}", save);
  }

  public IssueListResponse getAllIssue() {
    List<IssueShowResponse> closeIssues = generateIssueShowDto(issueRepository.findByIsOpenIsFalse());
    List<IssueShowResponse> openIssues = generateIssueShowDto(issueRepository.findByIsOpenIsTrue());

    return new IssueListResponse(closeIssues, openIssues);
  }

  private List<IssueShowResponse> generateIssueShowDto(List<Issue> issues) {
    List<IssueShowResponse> result = new ArrayList<>();
    for (Issue i : issues) {
      Label label = labelRepository.findById(i.getLabel()).orElseThrow();
      MilestoneWithIssueCountResponse milestone = milestoneRepository.findWithIssueCountBy(
          i.getMilestone_id()).orElseThrow();
      User reporter = userRepository.findById(i.getReporter()).orElseThrow();

      IssueShowResponse issueShowResponse = new IssueShowResponse(i, label, milestone, reporter);
      result.add(issueShowResponse);
    }
    return result;
  }
}
