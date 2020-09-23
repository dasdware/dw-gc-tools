import { FunctionalComponent, h } from "preact";
import { buttonClasses } from "../styles";
import { FontAwesomeIcon, FontAwesomeIconIcon } from "./FontAwesomeIcon";

interface ButtonProps {
  icon?: FontAwesomeIconIcon;
  enabled?: boolean;
  onClick?: () => void;
}

export const Button: FunctionalComponent<ButtonProps> = (props) => {
  const doClick = (e: MouseEvent) => {
    if (props.onClick !== undefined) {
      props.onClick();
    }
  };

  const enabled = props.enabled !== undefined ? props.enabled : true;
  return (
    <div className={buttonClasses(enabled)} onClick={doClick}>
      <FontAwesomeIcon icon={props.icon} />
    </div>
  );
};
