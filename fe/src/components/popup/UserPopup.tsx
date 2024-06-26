import { styled } from "styled-components";
import { User } from "../../Model/types";
import * as S from "./popupStyle";

interface UserPopupProps {
  userList: User[];
  assigneeList: string[];
  handleInputAssignee: (e: React.ChangeEvent<HTMLInputElement>) => void;
  closePopup: () => void;
}

export default function UserPopup({
  userList,
  assigneeList,
  handleInputAssignee,
  closePopup,
}: UserPopupProps) {
  return (
    <S.DropdownPanel>
      <S.DropdownHeader>담당자 설정</S.DropdownHeader>
      {userList.map((item) => {
        const { name, image_path } = item;
        return (
          <S.DropdownOption key={`assignee-${name}`}>
            <S.OptionInfo>
              <AssigneeImg src={image_path} />
              <span>{name}</span>
            </S.OptionInfo>
            <input
              type="checkbox"
              id={name}
              name="label"
              value={name}
              checked={assigneeList.includes(name)}
              onChange={(e) => {
                handleInputAssignee(e);
                closePopup();
              }}
            />
          </S.DropdownOption>
        );
      })}
    </S.DropdownPanel>
  );
}

const AssigneeImg = styled.img`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  margin-right: 8px;
`;
