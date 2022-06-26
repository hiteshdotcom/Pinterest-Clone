export const styles = {
    pinterestLayout: {
      margin: "0",
      padding: "0",
      width: "98vw",
      position: "absolute",
      left: "50%",
      transform: "translateX(-50%)",
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, 250px)",
      gridAutoRows: "10px",
      justifyContent: "center",
    },
  };


export const pinstyles = {
    pin: {
      margin: "15px 10px",
      padding: 0,
      borderRadius: "16px",
      overflow: "hidden",
      position: "relative",
    },
    small: {
      gridRowEnd: "span 26",
    },
    medium: {
      gridRowEnd: "span 33",
    },
    large: {
      gridRowEnd: "span 45",
    },
  };