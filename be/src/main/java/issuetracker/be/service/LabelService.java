package issuetracker.be.service;

import issuetracker.be.domain.Label;
import issuetracker.be.repository.LabelRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LabelService {

  private LabelRepository labelRepository;

  @Autowired
  public LabelService(LabelRepository labelRepository) {
    this.labelRepository = labelRepository;
  }

  public Iterable<Label> getAllLabel() {
    return labelRepository.findAll();
  }
}
