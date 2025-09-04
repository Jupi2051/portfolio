import { Variants, motion } from "framer-motion";

interface Props {
  name: string;
  content: string;
}

const WritingAnimation: Variants = {
  invisible: { opacity: 0 },
  viewed: { opacity: 1, transition: { duration: 0.2 } },
};

function BoardMessage(props: Props) {
  const contentLetters = props.content.split("");
  const nameLetters = props.name.split("");

  const StaggerIncrementValue =
    (props.content.length + props.name.length) * 0.01; // 1% increase per letter
  const ParentMessageAnimation: Variants = {
    viewed: {
      transition: {
        duration: 1,
        staggerChildren: Math.max(0.08 - StaggerIncrementValue * 0.08, 0.01),
      },
    },
  };
  return (
    <motion.div className="board-message-container">
      <motion.h1
        className="board-message-name"
        variants={ParentMessageAnimation}
        animate="invisible"
        initial="invisible"
        whileInView="viewed"
      >
        {nameLetters.map((letter, index) => {
          return (
            <motion.span variants={WritingAnimation} key={letter + "" + index}>
              {letter}
            </motion.span>
          );
        })}
      </motion.h1>
      <motion.span className="board-message-notation">:</motion.span>
      <motion.p
        className="board-message-content"
        variants={ParentMessageAnimation}
        animate="invisible"
        initial="invisible"
        whileInView="viewed"
      >
        {contentLetters.map((letter, index) => {
          return (
            <motion.span variants={WritingAnimation} key={letter + "" + index}>
              {letter}
            </motion.span>
          );
        })}
      </motion.p>
    </motion.div>
  );
}

export default BoardMessage;
