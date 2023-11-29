import { CSSProperties } from "react";
import "../Styles/LoadingItem.css";

type LoadingItemProps = {
    style?: CSSProperties,
    className?: string
    width?: string,
    height?: string,
}

function LoadingItemContainer(props: LoadingItemProps)
{
    return <div className={`item-loading-bar ${props.className}`} style={{width: props.width, height: props.height, ...props.style}}></div>
}

export default LoadingItemContainer;