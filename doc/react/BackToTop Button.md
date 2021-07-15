项目中需要用到一个backtotop按钮，利用useEffect+material-ui实现：

```javascript
import React, { useEffect, useState } from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { Fab, Zoom } from "@material-ui/core";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    position: "fixed",
    bottom: theme.spacing(4),
    right: theme.spacing(4),
  },
}));
interface Props {
  showBelow: number;
}
const Scroll = ({ showBelow }: Props) => {
  const classes = useStyles();
  const [show, setShow] = useState(showBelow === 0);
  const handleScroll = () => {
    if (window.pageYOffset > showBelow) {
      if (!show) setShow(true);
    } else {
      if (show) setShow(false);
    }
  };
  useEffect(() => {
    if (showBelow) {
      window.addEventListener(`scroll`, handleScroll);
      return () => window.removeEventListener(`scroll`, handleScroll);
    }
  });
  const handleClick = () => {
    window[`scrollTo`]({ top: 0, behavior: `smooth` });
  };
  return (
    <Zoom in={show}>
      <div onClick={handleClick} role="presentation" className={classes.root}>
        <Fab color="secondary" size="small">
          <KeyboardArrowUpIcon />
        </Fab>
      </div>
    </Zoom>
  );
};
export default Scroll;

```

[在线代码演示](https://codesandbox.io/s/crimson-waterfall-5dlkh)

