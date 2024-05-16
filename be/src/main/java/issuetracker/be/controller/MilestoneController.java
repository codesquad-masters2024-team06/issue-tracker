package issuetracker.be.controller;


import issuetracker.be.dto.MilestoneWithIssueCountResponse;
import issuetracker.be.service.MilestoneService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
public class MilestoneController {

  private MilestoneService milestoneService;

  @Autowired
  public MilestoneController(MilestoneService milestoneService) {
    this.milestoneService = milestoneService;
  }

  @GetMapping("/milestone")
  public ResponseEntity<List<MilestoneWithIssueCountResponse>> getAllMilestone() {
    List<MilestoneWithIssueCountResponse> result = milestoneService.getAllMilestone();
    return ResponseEntity.ok().body(result);
  }
}
