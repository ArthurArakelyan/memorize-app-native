// components
import ProfileEditAvatar from "../pages/profileEdit/components/ProfileEditModals/components/ProfileEditAvatar";
import ProfileEditName from "../pages/profileEdit/components/ProfileEditModals/components/ProfileEditName";
import ProfileEditPassword from "../pages/profileEdit/components/ProfileEditModals/components/ProfileEditPassword";
import ProfileEditEmail from "../pages/profileEdit/components/ProfileEditModals/components/ProfileEditEmail";

// types
import {IProfileEditModal} from "../pages/profileEdit/components/ProfileEditModals/types";

const profileEditModals: IProfileEditModal[] = [
  {
    name: 'avatar',
    Component: ProfileEditAvatar,
  },
  {
    name: 'name',
    Component: ProfileEditName,
  },
  {
    name: 'password',
    Component: ProfileEditPassword,
  },
  {
    name: 'email',
    Component: ProfileEditEmail,
  },
];

export default profileEditModals;
