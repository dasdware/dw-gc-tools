import { h, createElement, FunctionalComponent } from 'preact'
import humps from 'humps'
import fontawesome from '@fortawesome/fontawesome'

// icons
// import faClipboardList from '@fortawesome/fontawesome-pro-solid/faClipboardList'
// import faPlus from '@fortawesome/fontawesome-pro-solid/faPlus'
// fontawesome.library.add(faClipboardList, faPlus)

export type FontAwesomeIconMask = object | any[] | string;

export type FontAwesomeIconFlip = 'horizontal' | 'vertical' | 'both';

export type FontAwesomeIconIcon = object | any[] | string;

export type FontAwesomeIconPull = 'right' | 'left';

export type FontAwesomeIconRotation = 90 | 180 | 270;

export type FontAwesomeIconSize =
    | 'lg'
    | 'xs'
    | 'sm'
    | '1x'
    | '2x'
    | '3x'
    | '4x'
    | '5x'
    | '6x'
    | '7x'
    | '8x'
    | '9x'
    | '10x';

export type FontAwesomeIconSymbol = boolean | string;

export type FontAwesomeIconTransform = string | object;

export interface FontAwesomeIconProps {
    border?: boolean;
    className?: string;
    mask?: FontAwesomeIconMask;
    fixedWidth?: boolean;
    flip?: FontAwesomeIconFlip;
    icon?: FontAwesomeIconIcon;
    listItem?: boolean;
    pull?: FontAwesomeIconPull;
    pulse?: boolean;
    name?: string;
    rotation?: FontAwesomeIconRotation;
    size?: FontAwesomeIconSize;
    spin?: boolean;
    symbol?: FontAwesomeIconSymbol;
    transform?: FontAwesomeIconTransform;
}

const FontAwesomeIcon: FunctionalComponent<FontAwesomeIconProps> = props => {
    console.log(props);

    const { icon: iconArgs, mask: maskArgs, symbol, className } = props
    const icon = normalizeIconArgs(iconArgs)
    const classes = objectWithKey('classes', [
        ...classList(props),
        ...(className || '').split(' ')
    ])
    const transform = objectWithKey(
        'transform',
        typeof props.transform === 'string'
            ? fontawesome.parse.transform(props.transform)
            : props.transform
    )
    const mask = objectWithKey('mask', normalizeIconArgs(maskArgs))
    const renderedIcon = fontawesome.icon(icon, {
        ...classes,
        ...transform,
        ...mask,
        symbol
    })

    const { abstract } = renderedIcon
    const convertCurry = convert.bind(null, createElement)
    const extraProps = {}

    Object.keys(props).forEach(key => {
        if (!FontAwesomeIcon.defaultProps.hasOwnProperty(key)) extraProps[key] = props[key]
    })

    const result = convertCurry(abstract[0], extraProps)
    console.log(result);
    return result;
}

const normalizeIconArgs = icon => {
    if (icon === null) {
        return null
    }

    if (typeof icon === 'object' && icon.prefix && icon.iconName) {
        return icon
    }

    if (Array.isArray(icon) && icon.length === 2) {
        return { prefix: icon[0], iconName: icon[1] }
    }

    if (typeof icon === 'string') {
        return { prefix: 'fas', iconName: icon }
    }
}

const objectWithKey = (key, value) => {
    return (Array.isArray(value) && value.length > 0) ||
        (!Array.isArray(value) && value)
        ? { [key]: value }
        : {}
}

const classList = props => {
    let classes = {
        'fa-spin': props.spin,
        'fa-pulse': props.pulse,
        'fa-fw': props.fixedWidth,
        'fa-border': props.border,
        'fa-li': props.listItem,
        'fa-flip-horizontal':
            props.flip === 'horizontal' || props.flip === 'both',
        'fa-flip-vertical': props.flip === 'vertical' || props.flip === 'both',
        [`fa-${props.size}`]: props.size !== null,
        [`fa-rotate-${props.rotation}`]: props.rotation !== null,
        [`fa-pull-${props.pull}`]: props.pull !== null
    }

    return Object.keys(classes)
        .map(key => (classes[key] ? key : null))
        .filter(key => key)
}

const convert = (createElement, element, extraProps = {}) => {
    const children = (element.children || []).map(
        convert.bind(null, createElement)
    )

    const mixins = Object.keys(element.attributes || {}).reduce(
        (acc, key) => {
            const val = element.attributes[key]

            switch (key) {
                case 'class':
                    acc.attrs['className'] = val
                    delete element.attributes['class']
                    break
                case 'style':
                    acc.attrs['style'] = styleToObject(val)
                    break
                default:
                    if (
                        key.indexOf('aria-') === 0 ||
                        key.indexOf('data-') === 0
                    ) {
                        acc.attrs[key.toLowerCase()] = val
                    } else {
                        acc.attrs[humps.camelize(key)] = val
                    }
            }

            return acc
        },
        { attrs: {} }
    )

    const { style: existingStyle = {}, ...remaining } = extraProps

    mixins.attrs['style'] = { ...mixins.attrs['style'], ...existingStyle }

    return createElement(
        element.tag,
        { ...mixins.attrs, ...remaining },
        ...children
    )
}

FontAwesomeIcon.defaultProps = {
    border: false,
    class: '',
    mask:<object>null,
    fixedWidth: false,
    flip: undefined,
    icon: undefined,
    listItem: false,
    pull: undefined,
    pulse: false,
    name: '',
    rotation: undefined,
    size: undefined,
    spin: false,
    symbol: false,
    transform: undefined
};

export default FontAwesomeIcon;
