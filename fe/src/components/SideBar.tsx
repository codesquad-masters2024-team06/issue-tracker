import { useReducer } from "react";
import { styled } from "styled-components";
import { label, milestone, userList, Label, Milestone } from "./sideBarData";

interface SideBarProps {
  handleInputLabel: (item: Label) => void;
  handleInputMilestone: (item: Milestone) => void;
  handleInputAssignee: (e: React.ChangeEvent<HTMLInputElement>) => void;
  assigneeList: string[];
  selectedLabel: Label | null;
  selectedMilestone: Milestone | null;
}

interface PopupState {
  assignee: boolean;
  label: boolean;
  milestone: boolean;
}

type ActionType =
  | { type: "openAssigneePopup" }
  | { type: "openLabelPopup" }
  | { type: "openMilestonePopup" }
  | { type: "closePopup" };

const initialpopupState = {
  assignee: false,
  label: false,
  milestone: false,
};

const popupReducer = (state: PopupState, action: ActionType) => {
  switch (action.type) {
    case "openAssigneePopup":
      return { ...state, assignee: true };
    case "openLabelPopup":
      return { ...state, label: true };
    case "openMilestonePopup":
      return { ...state, milestone: true };
    case "closePopup":
      return initialpopupState;
    default:
      return state;
  }
};

export default function SideBar({
  handleInputAssignee,
  handleInputLabel,
  handleInputMilestone,
  assigneeList,
  selectedLabel,
  selectedMilestone,
}: SideBarProps) {
  const [popupState, dispatch] = useReducer(popupReducer, initialpopupState);
  const { close_issue, open_issue } = selectedMilestone ?? {
    close_issue: 0,
    open_issue: 0,
  };
  const selectedMilestoneProgressNum = close_issue / (close_issue + open_issue);

  return (
    <SideBarWrapper>
      <FirstSideBarItem onClick={() => dispatch({ type: "openAssigneePopup" })}>
        <div>
          <span>담당자</span> <span>+</span>
        </div>

        {!!assigneeList.length && (
          <SelectedAssigneeWrapper>
            {assigneeList.map((assignee) => {
              const selectedUser = userList.find(
                (userObj) => userObj.user_id === assignee
              );
              return (
                <SelectedAssignee key={`selectedAssignee-${assignee}`}>
                  <AssigneeImg src={selectedUser?.image_path} />
                  <span>{selectedUser?.user_id}</span>
                </SelectedAssignee>
              );
            })}
          </SelectedAssigneeWrapper>
        )}
      </FirstSideBarItem>
      {popupState.assignee && (
        <DropdownPanel>
          <DropdownHeader>담당자 설정</DropdownHeader>
          {userList.map((item) => {
            const { user_id, image_path } = item;
            return (
              <DropdownOption key={`assignee-${user_id}`}>
                <OptionInfo>
                  <AssigneeImg src={image_path} />
                  <span>{user_id}</span>
                </OptionInfo>
                <input
                  type="checkbox"
                  id={user_id}
                  name="label"
                  value={user_id}
                  checked={assigneeList.includes(user_id)}
                  onChange={(e) => {
                    handleInputAssignee(e);
                    dispatch({ type: "closePopup" });
                  }}
                />
              </DropdownOption>
            );
          })}
        </DropdownPanel>
      )}

      <SideBarItem onClick={() => dispatch({ type: "openLabelPopup" })}>
        <div>
          <span>레이블</span> <span>+</span>
        </div>
        {selectedLabel && (
          <SelectedOptionWrapper>
            <LabelDiv
              key={`selectedLabel-${selectedLabel.name}`}
              $backgroundColor={selectedLabel.backgroundColor}
              $textColor={selectedLabel.textColor}
            >
              {selectedLabel.name}
            </LabelDiv>
          </SelectedOptionWrapper>
        )}
      </SideBarItem>
      {popupState.label && (
        <DropdownPanel>
          <DropdownHeader>레이블 설정</DropdownHeader>
          {label.map((item) => {
            const { name, backgroundColor } = item;
            return (
              <DropdownOption key={`label-${name}`}>
                <OptionInfo>
                  <LabelColorCircle color={backgroundColor} />
                  <span>{name}</span>
                </OptionInfo>
                <input
                  type="radio"
                  id={name}
                  name="label"
                  value={name}
                  onChange={() => {
                    handleInputLabel(item);
                    dispatch({ type: "closePopup" });
                  }}
                />
              </DropdownOption>
            );
          })}
        </DropdownPanel>
      )}

      <LastSideBarItem onClick={() => dispatch({ type: "openMilestonePopup" })}>
        <div>
          <span>마일스톤</span> <span>+</span>
        </div>
        {selectedMilestone && (
          <SelectedMilestoneWrapper>
            <ProgressBar>
              <FilledProgressBar $length={selectedMilestoneProgressNum} />
            </ProgressBar>
            <MilestoneTitle>{selectedMilestone.title}</MilestoneTitle>
          </SelectedMilestoneWrapper>
        )}
      </LastSideBarItem>
      {popupState.milestone && (
        <DropdownPanel>
          <DropdownHeader>마일스톤 설정</DropdownHeader>
          {milestone.map((item) => {
            const { id, title } = item;
            return (
              <DropdownOption key={`milestone-${id}`}>
                <OptionInfo>
                  <span>{title}</span>
                </OptionInfo>
                <input
                  type="radio"
                  id={title}
                  name="label"
                  value={id}
                  onChange={() => {
                    handleInputMilestone(item);
                    dispatch({ type: "closePopup" });
                  }}
                />
              </DropdownOption>
            );
          })}
        </DropdownPanel>
      )}

      {(popupState.label || popupState.milestone || popupState.assignee) && (
        <Overlay onClick={() => dispatch({ type: "closePopup" })} />
      )}
    </SideBarWrapper>
  );
}

const SideBarWrapper = styled.div`
  width: 288px;
`;

const SelectedAssigneeWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const SelectedAssignee = styled.div`
  display: flex;
`;

const SelectedOptionWrapper = styled.div`
  width: 100%;
  display: flex;
`;

const SideBarItem = styled.div`
  padding: 32px;
  background-color: white;
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: center;
  border-bottom: 1px solid rgba(217, 219, 233, 1);
  border-left: 1px solid rgba(217, 219, 233, 1);
  border-right: 1px solid rgba(217, 219, 233, 1);
  cursor: pointer;

  > div:first-child {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }

  & span {
    color: rgba(78, 75, 102, 1);
    font-size: 16px;
    font-weight: 500;
  }
`;

const FirstSideBarItem = styled(SideBarItem)`
  border-top: 1px solid rgba(217, 219, 233, 1);
  border-top-left-radius: 10px;
  border-top-right-radius: 16px;
`;

const LastSideBarItem = styled(SideBarItem)`
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 16px;
`;

const LabelDiv = styled.div<{ $backgroundColor: string; $textColor: string }>`
  padding: 4px 8px;
  border-radius: 16px;
  background-color: ${(props) => props.$backgroundColor};
  color: ${(props) => props.$textColor};
`;

const DropdownPanel = styled.div`
  position: absolute;
  width: 240px;
  min-height: 67.5px;
  max-height: 211.5px;
  border-radius: 16px;
  border: 1px solid rgba(217, 219, 233, 1);
  overflow: hidden;
  z-index: 1100;
`;

const DropdownHeader = styled.div`
  padding: 8px 16px;
  background-color: rgba(247, 247, 252, 1);
  color: rgba(110, 113, 145, 1);
  font-weight: 500;
  font-size: 12px;
`;

const AssigneeImg = styled.img`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  margin-right: 8px;
`;

const LabelColorCircle = styled.div`
  width: 20px;
  height: 20px;
  background-color: ${(props) => props.color};
  border-radius: 50%;
  margin-right: 8px;
`;

const DropdownOption = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: white;
  padding: 8px 16px;
  border-bottom: 1px solid rgba(217, 219, 233, 1);

  &:last-child {
    border-bottom: none;
  }
`;

const OptionInfo = styled.div`
  display: flex;

  & span {
    font-weight: 500;
    font-size: 16px;
    color: rgba(78, 75, 102, 1);
  }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;
`;

const SelectedMilestoneWrapper = styled.div`
  width: 224px;
`;

const ProgressBar = styled.div`
  width: 100%;
  background-color: rgba(239, 240, 246, 1);
  border-radius: 10px;
  height: 8px;
  margin-bottom: 8px;
`;

const FilledProgressBar = styled.div<{ $length: number }>`
  width: ${(props) => 224 * props.$length}px;
  height: 100%;
  border-radius: 10px;
  background-color: rgba(0, 122, 255, 1);
`;

const MilestoneTitle = styled.div`
  font-weight: 500;
  font-size: 12px;
  color: rgba(20, 20, 43, 1);
  line-height: 16px;
`;