package issuetracker.be.service;

import issuetracker.be.dto.MilestoneWithIssueCountResponse;
import issuetracker.be.repository.MilestoneRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class MilestoneService {

  MilestoneRepository milestoneRepository;

  @Autowired
  public MilestoneService(MilestoneRepository milestoneRepository) {
    this.milestoneRepository = milestoneRepository;
  }

  /**
   * 전체 마일스톤의 정보를 조회한다
   *
   * @return 마일스톤 조회 DTO List
   */
  public List<MilestoneWithIssueCountResponse> getAllMilestone() {
    return milestoneRepository.findAllWithIssueCount();
  }
}