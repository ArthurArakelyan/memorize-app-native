export interface IProfileEditModalsProps {
  name: string;
  close: () => void;
}

export interface IProfileEditModalProps {
  close: () => void;
}

export interface IProfileEditModal {
  name: string;
  Component: FC<IProfileEditModalProps>;
}
