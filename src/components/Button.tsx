import { h, FunctionalComponent } from "preact"
import { FontAwesomeIconIcon, FontAwesomeIcon } from "./FontAwesomeIcon";
import { buttonClasses } from "../styles";

interface ButtonProps {
    icon?: FontAwesomeIconIcon,
    enabled?: boolean,
    onClick?: () => void
}

export const Button: FunctionalComponent<ButtonProps> = (props) => {
    const doClick = (e: MouseEvent) => {
        if (props.onClick !== undefined) {
            props.onClick();
        }
    };

    const enabled = (props.enabled !== undefined) ? props.enabled : true;
    return (
        <div className={buttonClasses(enabled)} onClick={doClick}>
            <FontAwesomeIcon icon={props.icon} />
        </div>
    );
}