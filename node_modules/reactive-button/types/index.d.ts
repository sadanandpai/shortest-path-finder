// Type definitions for Reactive Button
// Project https://github.com/arifszn/reactive-button
// Author: Ariful Alam <swazan.arif@gmail.com>

import React, { ReactNode } from 'react';

export type buttonState = 'idle' | 'loading' | 'success' | 'error';
export type color = 'primary' | 'secondary' | 'dark' | 'light' | 'green' | 'red' | 'yellow' | 'teal' | 'violet' | 'blue';
export type type = 'button' | 'submit' | 'reset';
export type size = 'tiny' | 'small' | 'normal' | 'large';

export interface ReactiveButtonProps {
    /**
     * Current button state.
     * 
     * Default: 'idle'
     */
    buttonState?: buttonState;

    /**
     * Callback function when clicking button.
     * 
     * Default: () => {}
     */
    onClick?: (event: React.MouseEvent) => void;

    /**
     * Button color.
     * 
     * Default: 'primary'
     */
    color?: color;

    /**
     * Button text when idle.
     * 
     * Default: 'Click Me'
     */
    idleText?: string | ReactNode;

    /**
     * Button text when loading.
     * 
     * Default: 'Loading'
     */
    loadingText?: string | ReactNode;

    /**
     * Button text when loading successful.
     * 
     * Default: 'Success'
     */
    successText?: string | ReactNode;

    /**
     * Button text when loading failed.
     * 
     * Default: 'Error'
     */
    errorText?: string | ReactNode;

    /**
     * Button type attribute.
     * 
     * Default: 'button'
     */
    type?: type;

    /**
     * Button classnames.
     * 
     * Default: ''
     */
    className?: string;

    /**
     * Custom style.
     * 
     * Default: {}
     */
    style?: React.CSSProperties;

    /**
     * Enable outline effect.
     * 
     * Default: false
     */
    outline?: boolean;

    /**
     * Enable shadow effect.
     * 
     * Default: false
     */
    shadow?: boolean;

    /**
     * Enable rounded button.
     * 
     * Default: false
     */
    rounded?: boolean;

    /**
     * Button size.
     * 
     * Default: 'normal'
     */
    size?: size;

    /**
     * Block button.
     * 
     * Default: false
     */
    block?: boolean;

    /**
     * Success/Error message duration in millisecond.
     * 
     * Default: 2000
     */
    messageDuration?: number;

    /**
     * Disable button.
     * 
     * Default: false
     */
    disabled?: boolean;

    /**
     * Button reference.
     * 
     * Default null
     */
    buttonRef: React.Ref | null;

    /**
     * Override button width.
     * 
     * Default null
     */
    width: string | null;

    /**
     * Override button height.
     * 
     * Default null
     */
    height: string | null;

    /**
     * Button hover and click animation.
     * 
     * Default true
     */
    animation: boolean;
}

declare class ReactiveButton extends React.Component<ReactiveButtonProps, any> {}

export default ReactiveButton;