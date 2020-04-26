import { h, FunctionalComponent } from "preact"
import { FontAwesomeIconIcon, FontAwesomeIcon } from "./FontAwesomeIcon";

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

    const classes = ['button'];
    if (props.enabled === false) {
        classes.push('disabled');
    }

    return (
        <div class={classes.join(' ')} onClick={doClick}>
            <FontAwesomeIcon icon={props.icon} />
        </div>
    );
}