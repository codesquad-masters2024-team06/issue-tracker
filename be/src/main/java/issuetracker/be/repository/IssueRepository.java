package issuetracker.be.repository;

import issuetracker.be.domain.Issue;
import java.util.List;
import org.springframework.data.repository.CrudRepository;

public interface IssueRepository extends CrudRepository<Issue, Long> {

  List<Issue> findByIsOpenIsTrue();

  List<Issue> findByIsOpenIsFalse();
}
