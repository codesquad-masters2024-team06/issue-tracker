import { issueDetails } from "./issueDetailsMockData";
import { styled } from "styled-components";
import { useCurrentUser } from "../contexts/CurrentUserProvider";
import * as CommonS from "../styles/common";
import editIcon from "../assets/edit.svg";
import archiveIcon from "../assets/archive.svg";
import alertIcon from "../assets/alertCircle.svg";
import trashIcon from "../assets/trash.svg";
import { useParams } from "react-router-dom";
import useApi from "../hooks/api/useApi";
import { IssueDetails } from "../Model/types";

import PageHeader from "../components/PageHeader";
import WrittenComment from "../components/WrittenComment";
import CommentWriteArea from "../components/CommentWriteArea";
import SideBar from "../components/SideBar";

export default function IssueDetailsPage() {
  const { currentUser } = useCurrentUser();
  const { issueId } = useParams<{ issueId: string }>();
  const {
    data: issueDetails,
    refetch: refetchIssueDetails,
    putData: updateIssueDetails,
  } = useApi<IssueDetails>(`/issue/${issueId}`);
  if (!issueDetails) return null;
  const {
    title,
    id,
    is_open,
    created_At,
    reporter,
    comment,
    label,
    assignee,
    milestone,
  } = issueDetails;

  const openOrCloseIssue = async () => {
    const putPath = is_open ? "/issue/close" : "/issue/open";
    await updateIssueDetails(`${putPath}`, { id: [id] });
    refetchIssueDetails();
  };

  return (
    <>
      <PageHeader loggedInUserImageSrc={currentUser?.image_path} />
      <CommonS.Wrapper>
        <PostInfo>
          <IssueTitleBox>
            <IssueTitle>
              {title}
              <span>#{id}</span>
            </IssueTitle>
            <IssueButtonsBox>
              <TitleEditBtn>
                <img src={editIcon} alt="edit icon" />
                제목 편집
              </TitleEditBtn>
              <OpenIssueBtn onClick={() => openOrCloseIssue()}>
                <img src={archiveIcon} alt="archive icon" />
                {is_open ? "이슈 닫기" : "이슈 열기"}
              </OpenIssueBtn>
            </IssueButtonsBox>
          </IssueTitleBox>
          <StatesInfoBox>
            <InfoTag>
              <CommonS.Center>
                <img src={alertIcon} alt="alert icon" />
                <span>{is_open ? "열린 이슈" : "닫힌 이슈"}</span>
              </CommonS.Center>
            </InfoTag>
            <OpenInfo>
              이 이슈가 {created_At}에 {reporter.name}에 의해 열렸습니다 ∙
              코멘트 {comment.length}개
            </OpenInfo>
          </StatesInfoBox>
        </PostInfo>
        <CommentAndSideBarContainer>
          <CommentContainer>
            {comment.map((commentObj) => {
              const { id } = commentObj;
              return (
                <WrittenComment
                  key={`comment-${id}`}
                  commentObj={commentObj}
                  issueReporter={reporter.name}
                />
              );
            })}
            <CommentWriteArea
              setComment={console.log}
              comment={""}
              height="160px"
            />
            <CommentDoneButtonContainer>
              <CommentDoneButton>+ 코멘트 작성</CommentDoneButton>
            </CommentDoneButtonContainer>
          </CommentContainer>
          <CommonS.ColumnFlex>
            <SideBar
              handleInputAssignee={console.log}
              handleInputMilestone={console.log}
              handleInputLabel={console.log}
              assigneeList={
                assignee ? assignee.map((userObj) => userObj.name) : []
              }
              selectedLabel={
                label ? label.map((labelObj) => labelObj.id.toString()) : []
              }
              selectedMilestone={milestone ? milestone.id.toString() : ""}
            />
            <DeleteButton>
              <img src={trashIcon} alt="trash icon" />
              이슈 삭제
            </DeleteButton>
          </CommonS.ColumnFlex>
        </CommentAndSideBarContainer>
      </CommonS.Wrapper>
    </>
  );
}

const IssueTitleBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 48px;
`;

const IssueTitle = styled.h1`
  font-weight: 700;
  font-size: 32px;
  line-height: 48px;

  & span {
    margin: 0 8px;
    color: rgba(110, 113, 145, 1);
    font-weight: 700;
  }
`;

const IssueButtonsBox = styled.div`
  display: flex;
  gap: 8px;
`;

const TitleEditBtn = styled.button`
  color: rgba(0, 122, 255, 1);
  border: 1px solid rgba(0, 122, 255, 1);
  padding: 0 16px;
  width: 128px;
  height: 40px;
  background-color: transparent;
  border-radius: 10px;
  & img {
    margin-right: 5px;
  }
`;

const OpenIssueBtn = styled(TitleEditBtn)`
  cursor: pointer;
  & img {
    filter: invert(30%) sepia(99%) saturate(2526%) hue-rotate(199deg)
      brightness(101%) contrast(105%);
  }
`;

const PostInfo = styled(CommonS.ColumnFlex)`
  gap: 16px;
  padding-bottom: 24px;
  border-bottom: 1px solid rgba(217, 219, 233, 1);
  margin-bottom: 24px;
`;

const StatesInfoBox = styled.div`
  display: flex;
  align-items: center;
`;

const InfoTag = styled(CommonS.Center)`
  width: 101px;
  height: 32px;
  padding: 0 16px;
  font-size: 12px;
  color: rgba(254, 254, 254, 1);
  background-color: rgba(0, 122, 255, 1);
  border-radius: 30px;

  & img {
    filter: invert(93%) sepia(100%) saturate(0%) hue-rotate(264deg)
      brightness(115%) contrast(99%);
    margin-right: 8px;
  }
`;

const OpenInfo = styled.p`
  color: rgba(110, 113, 145, 1);
  font-size: 16px;
  line-height: 24px;
  margin: 0 8px;
`;

const CommentAndSideBarContainer = styled(CommonS.SpaceBetween)``;

const CommentContainer = styled.div`
  width: 960px;
`;

const CommentDoneButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: 24px;
`;

const CommentDoneButton = styled.button`
  background-color: rgba(0, 122, 255, 1);
  color: white;
  width: 128px;
  height: 40px;
  padding: 0 16px;
  border: none;
  border-radius: 12px;
`;

const DeleteButton = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  color: rgba(255, 59, 48, 1);
  font-size: 12px;
  padding: 0 16px;
  margin-top: 24px;
`;
