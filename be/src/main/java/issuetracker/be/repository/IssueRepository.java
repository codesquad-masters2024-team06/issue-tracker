package issuetracker.be.repository;

import issuetracker.be.domain.Issue;
import java.util.List;
import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.repository.CrudRepository;

public interface IssueRepository extends CrudRepository<Issue, Long> {

  @Query("SELECT * FROM issue WHERE is_open = true")
  List<Issue> findByIsOpenIsTrue();

  @Query("SELECT * FROM issue WHERE is_open = false")
  List<Issue> findByIsOpenIsFalse();
}
