package issuetracker.be.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.relational.core.mapping.Table;

@Table("issue_assignee")
@Getter
@AllArgsConstructor
public class AssigneeRef {
  private String user_name;
}
