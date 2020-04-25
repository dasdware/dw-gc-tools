import { h, FunctionalComponent } from "preact"
import { FontAwesomeIconIcon, FontAwesomeIcon } from "./FontAwesomeIcon";

interface ButtonProps {
    icon?: FontAwesomeIconIcon,
    onClick?: () => void
}

export const Button: FunctionalComponent<ButtonProps> = (props) => {
    const doClick = (e: MouseEvent) => {
        if (props.onClick !== undefined) {
            props.onClick();
        }
    };

    return (
        <div class="button" onClick={doClick}>
            <FontAwesomeIcon icon={props.icon} />
        </div>
    );
}