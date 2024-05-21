import { styled } from "styled-components";
import { Issue } from "../Model/types";
import LabelComponent from "./Label";
import alertIcon from "../assets/alertCircle.svg";
import milestoneIcon from "../assets/milestone.svg";
import * as CommonS from "../styles/common";

interface TableItemsProps {
  items: Issue[];
}

export default function TableItems({ items }: TableItemsProps) {
  return (
    <>
      {items.map((item: Issue) => {
        const { id, title, label, create_At, reporter, milestone } = item;
        return (
          <IssueTable key={`issue-${id}`}>
            <IssueCheckBox type="checkbox" name={id.toString()} />
            <TableContent>
              <IssueInfo>
                <IssueInfoTop>
                  <img src={alertIcon} alt="blue alert icon" />
                  <IssueTitle>{title}</IssueTitle>
                  {label && <LabelComponent labelInfo={label} />}
                </IssueInfoTop>
                <IssueInfoBottom>
                  <span>#{id}</span>
                  <span>
                    이 이슈가 {create_At}, {reporter.name}님에 의해
                    작성되었습니다.
                  </span>
                  {milestone && (
                    <span>
                      <img src={milestoneIcon} alt="milestone icon" />
                      {milestone?.name}
                    </span>
                  )}
                </IssueInfoBottom>
              </IssueInfo>
              <IssueReporterImg src={reporter.image_path} alt="reporter img" />
            </TableContent>
          </IssueTable>
        );
      })}
    </>
  );
}

const IssueTable = styled.div`
  display: flex;
  align-items: flex-start;
  width: 100%;
  height: 96px;
  background-color: rgba(254, 254, 254, 1);
  padding: 16px 32px;
  border-left: 1px solid rgba(217, 219, 233, 1);
  border-right: 1px solid rgba(217, 219, 233, 1);
  border-bottom: 1px solid rgba(217, 219, 233, 1);

  &:last-child {
    border-bottom-left-radius: 16px;
    border-bottom-right-radius: 16px;
  }
`;

const IssueInfo = styled(CommonS.ColumnFlex)`
  justify-content: space-between;
`;

const IssueInfoTop = styled.div`
  display: flex;

  img {
    filter: invert(36%) sepia(41%) saturate(7096%) hue-rotate(201deg)
      brightness(103%) contrast(104%);
    margin-right: 8px;
  }
`;

const IssueTitle = styled.div`
  font-size: 20px;
  color: rgba(20, 20, 43, 1);
  font-weight: 500;
  margin-right: 8px;
`;

const IssueInfoBottom = styled.div`
  display: flex;

  > span {
    font-size: 16px;
    font-weight: 500;
    color: rgba(110, 113, 145, 1);
    margin-right: 16px;
  }

  & img {
    margin-right: 8px;
  }
`;

const IssueReporterImg = styled.img`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  margin: 22px;
`;

const IssueCheckBox = styled.input`
  border: 1px solid rgba(217, 219, 233, 1);
  margin-top: 7px;
`;

const TableContent = styled(CommonS.SpaceBetween)`
  margin-left: 32px;
  width: 1200px;
  height: 64px;
`;