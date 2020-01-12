declare module "react-native-swipeable" {

    import { Component, ElementType } from 'react';

    interface ISwipeableProps {
        rightButtonWidth?: number;
        rightButtons?: Array<JSX.Element>;
        rightContent?: JSX.Element; 
        onRightActionRelease?: () => void;
        children?: any;
    }

    class Swipeable extends Component<ISwipeableProps> {}

    export default Swipeable;
}
