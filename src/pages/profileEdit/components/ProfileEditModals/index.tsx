import React, {FC, memo} from "react";

// components
import {Modal, ModalHeader} from "../../../../components/shared";

// constants
import profileEditModals from "../../../../constants/profileEditModals";

// types
import {IProfileEditModalsProps} from "./types";

const ProfileEditModals: FC<IProfileEditModalsProps> = ({ name, close }) => {
  const modal = profileEditModals.find((modal) => modal.name === name);

  if (!modal) {
    return null;
  }

  return (
    <Modal close={close}>
      <>
        <ModalHeader title={modal.name} onClose={close} />
        <modal.Component close={close} />
      </>
    </Modal>
  );
};

export default memo(ProfileEditModals);
