export interface Output {
  id: string;
  title: string;
  icon: JSX.Element;
}

export interface OutputCardProps {
  icon: JSX.Element;
  title: string;
  isSelected: boolean;
  onClick: () => void;
}